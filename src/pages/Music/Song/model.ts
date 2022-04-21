import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';
import { getSongListById, getSongLyrics } from './service';
import type { MusicType } from '@/typings/music';

export interface SongModelState {
  songList: MusicType.SongProps[];
}

export interface SongModelType {
  namespace: 'songDvaState';
  state: SongModelState;
  reducers: {
    saveSongList: ImmerReducer;
  };
  effects: {
    grabSongList: Effect;
  };
  subscriptions: {
    setup: Subscription;
  };
}

const SongModel: SongModelType = {
  namespace: 'songDvaState',
  state: {
    songList: [],
  },
  reducers: {
    saveSongList(state: SongModelState, { payload }) {
      state.songList = payload;
    },
  },
  effects: {
    *grabSongList(action, { call, put }) {
      const { payload: albumId } = action;
      const res = yield call(getSongListById, albumId);
      yield put({
        type: 'saveSongList',
        payload: res?.data || [],
      });
    },
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        const reg = /^\/album\/\d+$/;
        if (reg.test(pathname)) {
          const albumIdMatchArray = pathname.match(/\d+/);
          dispatch({
            type: 'grabSongList',
            payload: albumIdMatchArray ? albumIdMatchArray[0] : 0,
          });
        }
      });
    },
  },
};

export default SongModel;
