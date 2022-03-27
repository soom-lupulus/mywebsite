/*
 * @Author: yuyunhao
 * @Date: 2021-12-27 12:41:56
 * @LastEditTime: 2021-12-27 12:57:05
 * @LastEditors: yuyunhao
 * @Description:
 * @FilePath: \website\.umirc.ts
 * 代码都是复制过来的，怎么会出错
 */
import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index', title: '勒勒苠' },
    { path: '/message', component: '@/pages/Message' },
    {
      path: '/album',
      component: '@/pages/Music',
      title: '荔枝音乐',
      access: 'canListen',
    },
    {
      path: '/album/:uuid',
      component: '@/pages/Music/Song',
      title: '荔枝音乐',
    },
    { component: '@/pages/404' },
  ],
  fastRefresh: {},
  proxy: {
    '/api': {
      target: 'http://localhost:8887',
      changeOrigin: true,
    },
  },
  mfsu: {},
});
