import request from '@/service/index';
import type { UserType } from '@/typings/user';

/**
 * @param albumId 专辑id
 * @description 获取歌曲列表
 * @returns
 */
export const Login = async (userInfo: UserType.userProps) => {
  return request.post('/user/login', {
    data: userInfo,
  });
};

/**
 * @param uuid 歌曲uuid
 * @description 获取歌曲歌词
 * @returns
 */
export const getSongLyrics = async (uuid: number) => {
  return request.get(`/music/lyrics/${uuid}`);
};
