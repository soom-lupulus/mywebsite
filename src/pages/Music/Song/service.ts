import request from '@/service/index';

/**
 * @param albumId 专辑id
 * @description 获取歌曲列表
 * @returns
 */
export const getSongListById = async (albumId: number) => {
  return request.get(`/music/list/${albumId}`);
};

/**
 * @param uuid 歌曲uuid
 * @description 获取歌曲歌词
 * @returns
 */
export const getSongLyrics = async (uuid: number) => {
  return request.get(`/music/lyrics/${uuid}`);
};
