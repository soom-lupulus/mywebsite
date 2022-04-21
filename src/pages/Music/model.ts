import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';
import { getAlbumList } from './service';

export interface IndexModelState {
  albumList: [];
}

export interface IndexModelType {
  namespace: 'musicDvaState';
  state: IndexModelState;
  effects: {
    grabAlbumList: Effect;
  };
  reducers: {
    // saveAlbumList: Reducer<IndexModelState>;
    // 启用 immer 之后
    saveAlbumList: ImmerReducer<IndexModelState>;
  };
  subscriptions: { setup: Subscription };
}

const IndexModel: IndexModelType = {
  namespace: 'musicDvaState',
  state: {
    albumList: [],
  },

  effects: {
    *grabAlbumList({ payload }, { call, put }) {
      const data = yield call(getAlbumList);
      yield put({
        type: 'saveAlbumList',
        payload: data,
      });
    },
  },
  reducers: {
    // saveAlbumList(state, action) {
    //   return {
    //     ...state,
    //     albumList: action.payload.data
    //   };
    // },
    // 启用 immer 之后
    saveAlbumList(state, action) {
      state.albumList = action.payload.data;
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/album') {
          dispatch({
            type: 'grabAlbumList',
          });
        }
      });
    },
  },
};

export default IndexModel;
