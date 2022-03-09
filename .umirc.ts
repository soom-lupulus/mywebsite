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
    { path: '/', component: '@/pages/index' },
    { path: '/message', component: '@/pages/Message' },
    { path: '/album', component: '@/pages/Music' },
    { path: '/album/:uuid', component: '@/pages/Music/Song' },
  ],
  fastRefresh: {},
  proxy: {
    '/api': {
      target: 'http://localhost:8887',
      changeOrigin: true,
    },
  },
});
