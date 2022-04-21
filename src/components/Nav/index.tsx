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
import { history, connect } from 'umi';
import cx from './index.less';
import { ReactComponent as WechatIcon } from '@/assets/svg/wechat-fill.svg';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
  DialogActions,
  LinearProgress,
} from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import request from '@/service/index';
import { message } from 'antd';
import type { UserType } from '@/typings/user';
import { object, string, number, date, InferType } from 'yup';
import { UserModelState, UserModelType } from '@/models/user';

interface IFormInput {
  userName: String;
  combination: String;
}

const userSchema = object({
  userName: string().required(),
  combination: string().required(),
});

const Nav: React.FC<{ userDvaState: UserModelState; dispatch: any }> = ({
  userDvaState,
  dispatch,
}) => {
  console.log(userDvaState);
  const { userInfo } = userDvaState;

  // 身份验证
  const [token, setToken] = useState('');
  // 是否更新token
  const [tokenNeedUpdate, setTokenNeedUpdate] = useState(true);
  // 用户信息
  // const [userInfo, setUserInfo] = useState<UserType.userProps>();
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
            <li>
              欢迎你，{' '}
              {userInfo.userName
                ? userInfo.userName
                : JSON.parse(sessionStorage.getItem('userInfo')!)['userName']}
            </li>
          ) : (
            <li className={cx.user}>
              <span onClick={() => setOpen(true)}>登录</span>
              <span>注册</span>
            </li>
          )}
        </ul>
      </div>
      <Dialog open={open} onClose={handleClose} className={cx.dialog1}>
        <DialogTitle>LogIn</DialogTitle>
        <Formik
          initialValues={{
            userName: '',
            combination: '',
          }}
          validationSchema={userSchema}
          onSubmit={async (values, { setSubmitting }) => {
            dispatch({
              type: 'userDvaState/grabUserInfo',
              payload: values,
            }).then(
              (res: UserModelState) => {
                console.log(res);

                setSubmitting(false);
                message.success('登陆成功');
                setOpen(false);
                setTokenNeedUpdate(true);
                // 存入sessionStorage持久化用户信息
                sessionStorage.setItem('userInfo', JSON.stringify(res));
              },
              (err: any) => {
                message.error(err);
              },
            );
          }}
        >
          {({ submitForm, isSubmitting }) => (
            <Form className={cx.form}>
              <Field
                component={TextField}
                name="userName"
                type="text"
                label="用户名"
              />
              <br />
              <Field
                component={TextField}
                type="password"
                label="密码"
                name="combination"
              />
              {isSubmitting && <LinearProgress />}
              <br />
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  onClick={submitForm}
                >
                  登录
                </Button>
                <Button onClick={handleClose}>取消</Button>
              </div>
            </Form>
          )}
        </Formik>
      </Dialog>
    </>
  );
};

const mapStateToProps = ({
  userDvaState,
}: {
  userDvaState: UserModelState;
}) => {
  return {
    userDvaState,
  };
};

export default connect(mapStateToProps)(Nav);
