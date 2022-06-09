import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';
import { Login } from '@/service/global';
import type { UserType } from '@/typings/user';

export interface UserModelState {
  userInfo: UserType.userProps;
}

export interface UserModelType {
  namespace: 'userDvaState';
  state: {
    userInfo: UserModelState | {};
  };
  reducers: {
    saveUserInfo: ImmerReducer;
  };
  effects: {
    grabUserInfo: Effect;
  };
  subscriptions: {
    setup: Subscription;
  };
}

const UserModel: UserModelType = {
  namespace: 'userDvaState',
  state: {
    userInfo: {},
  },
  reducers: {
    saveUserInfo(state: UserModelState, { payload }) {
      state.userInfo = payload;
    },
  },
  effects: {
    *grabUserInfo(action, { call, put }) {
      const { payload: loginInfo } = action;
      const res = yield call(Login, loginInfo);
      yield put({
        type: 'saveUserInfo',
        payload: res?.data || {},
      });
      return res;
    },
  },
  subscriptions: {
    setup({ history, dispatch }) {},
  },
};

export default UserModel;
