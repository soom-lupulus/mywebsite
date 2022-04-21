/*
 * @Author: yuyunhao
 * @Date: 2021-12-27 12:50:56
 * @LastEditTime: 2022-01-04 08:34:25
 * @LastEditors: yuyunhao
 * @Description:
 * @FilePath: \website\src\components\Nav\index.tsx
 * 代码都是复制过来的，怎么会出错
 */
import { useCallback, useState, useEffect, useMemo } from 'react';
import { history } from 'umi';
import cx from './index.less';
import { ReactComponent as WechatIcon } from '@/assets/svg/wechat-fill.svg';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  Button,
  DialogActions,
} from '@mui/material';
import request from '@/service/index';
import { message } from 'antd';
import type { UserModel } from '@/typings/user';

interface IFormInput {
  userName: String;
  combination: String;
}

const Nav = () => {
  // 身份验证
  const [token, setToken] = useState('');
  // 是否更新token
  const [tokenNeedUpdate, setTokenNeedUpdate] = useState(true);
  // 用户信息
  const [userInfo, setUserInfo] = useState<UserModel.userProps>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  // modal显示
  const [open, setOpen] = useState(false);

  const goWhere = useCallback((address: string): void => {
    history.push(address);
  }, []);
  const goLogin = useCallback(() => {
    setOpen(true);
  }, []);
  // 关闭登录框
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);
  // 提交表单
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    request
      .post('/user/login', {
        data,
      })
      .then((res) => {
        if (res.code !== 200) {
          message.error(res.message);
        } else {
          localStorage.setItem('info', JSON.stringify(res.data));
          message.success(res.message);
          setOpen(false);
          setTokenNeedUpdate(true);
        }
      });
  };

  const userName = useMemo(() => {
    const obj = JSON.parse(localStorage.getItem('info')!);
    return obj?.userName;
  }, [token]);

  useEffect(() => {
    if (tokenNeedUpdate) {
      const mytoken = localStorage.getItem('token');
      if (mytoken) {
        setToken(mytoken);
      }
      setTokenNeedUpdate(false);
    }
  }, [tokenNeedUpdate]);
  return (
    <>
      <div className={cx.wrapper}>
        <div className={cx.left}>
          <span
            onClick={() =>
              (location.href = 'https://www.cnblogs.com/yuyunhao/')
            }
          >
            愫暮的博客
          </span>
        </div>
        <ul className={cx.right}>
          <li>个人文章</li>
          <li>前端资源</li>
          <li>留言板</li>
          <li>诗词</li>
          <li onClick={() => goWhere('/album')}>音乐</li>
          <li>工具</li>
          {token ? (
            <li>欢迎你， {userName}</li>
          ) : (
            <li className={cx.user}>
              <span onClick={() => setOpen(true)}>登录</span>
              <span>注册</span>
            </li>
          )}
        </ul>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>LogIn</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <TextField
              autoFocus
              required
              margin="dense"
              id="username"
              label="Username"
              type="text"
              fullWidth
              variant="standard"
              {...register('userName', { required: true })}
            />
            {errors.userName && <p>userName is required.</p>}
          </DialogContent>
          <DialogContent>
            <TextField
              autoFocus
              required
              margin="dense"
              id="combination"
              label="Password"
              type="password"
              fullWidth
              variant="standard"
              {...register('combination', { required: true })}
            />
            {errors.combination && <p>combination is required.</p>}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>取消</Button>
            <Button type="submit">登录</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default Nav;
