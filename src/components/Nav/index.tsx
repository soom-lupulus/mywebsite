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
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
  DialogActions,
  LinearProgress,
  Menu,
  MenuItem,
} from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import { message } from 'antd';
import type { UserType } from '@/typings/user';
import { object, string, number, date, InferType } from 'yup';
import { UserModelState, UserModelType } from '@/models/user';
import { globalType } from '@/typings/global';
import { useSnackbar, SnackbarProvider } from 'notistack';

interface IFormInput {
  userName: String;
  combination: String;
}

const userSchema = object({
  userName: string().required(),
  combination: string().required(),
});

const Nav: React.FC<any> = ({ userDvaState, dispatch }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { userInfo } = userDvaState;

  // 身份验证
  const [token, setToken] = useState('');
  // 是否更新token
  const [tokenNeedUpdate, setTokenNeedUpdate] = useState(true);
  // modal显示
  const [open, setOpen] = useState(false);

  const goWhere = useCallback((address: string): void => {
    history.push(address);
  }, []);

  // 关闭登录框
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  const handleMenuClick = (event: MouseEvent) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = useCallback(() => {
    setAnchorEl(null);
    localStorage.removeItem('token');
    setTokenNeedUpdate(true);
    enqueueSnackbar('退出登录成功', {
      variant: 'success',
    });
  }, []);

  const hasLoginedtext = useMemo(() => {
    return userInfo.userName
      ? userInfo.userName
      : JSON.parse(localStorage.getItem('info')!).userName;
  }, [userInfo]);

  useEffect(() => {
    if (tokenNeedUpdate) {
      const mytoken = localStorage.getItem('token');
      if (mytoken) {
        setToken(mytoken);
      } else {
        setToken('');
        localStorage.removeItem('userInfo');
      }
      setTokenNeedUpdate(false);
    }
  }, [tokenNeedUpdate]);
  return (
    <SnackbarProvider maxSnack={3}>
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
          <li onClick={() => goWhere('/message')}>留言板</li>
          <li>诗词</li>
          <li onClick={() => goWhere('/album')}>音乐</li>
          <li>工具</li>
          {token ? (
            <li onClick={handleMenuClick}>欢迎你，{hasLoginedtext}</li>
          ) : (
            <li className={cx.user}>
              <span onClick={() => setOpen(true)}>登录</span>
              <span>注册</span>
            </li>
          )}
        </ul>
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleMenuClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
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
              (res: globalType.httpResponseType) => {
                if (res.code !== 200) {
                  setSubmitting(false);
                  return message.error(res.message);
                }
                setSubmitting(false);
                enqueueSnackbar(res.message, { variant: 'success' });
                setOpen(false);
                setTokenNeedUpdate(true);
                // 持久化用户信息
                localStorage.setItem('userInfo', JSON.stringify(res.data));
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
    </SnackbarProvider>
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
