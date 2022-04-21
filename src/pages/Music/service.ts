import request from '@/service/index';

/**
 * @description 获取专辑列表
 * @returns
 */
export const getAlbumList = async () => {
  return request.get('/album/list');
};
