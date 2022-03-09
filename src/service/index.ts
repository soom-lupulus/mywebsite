/**封装请求 */
import { extend } from 'umi-request';
import { message } from 'antd';
import { history } from 'umi';

const request = extend({
  prefix: '/api',
  timeout: 1000,
});

// request拦截器, 改变url 或 options.
request.interceptors.request.use((url, options) => {
  const token = localStorage.getItem('token') || ''
  return {
    // url: `${url}&interceptors=yes`,
    options: { ...options, interceptors: true, headers: {Authorization: `Bearer ${token}`} },
  };
});

// 提前对响应做异常处理
request.interceptors.response.use(response => {

  type codeProps = {
    401:number,
    404: number,
    500: number,
    502: number,
    503: number,
    504: number,
  }
  const codeMaps = {
    401: '身份验证失败，请重新登录',
    404: '无法找到资源',
    500: '服务器内部错误',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
  };
  if(response.status === 401){
    setTimeout(() => {
      history.replace('/')
    }, 1000);
  }
  const err = codeMaps[(response.status) as keyof codeProps]
  if(err) message.error(err);
  // 存取token
  const token = response.headers.get('mytoken')
  if(token){
    localStorage.setItem('token', token)
  }
  return response;
});

// 克隆响应对象做解析处理
// request.interceptors.response.use(async response => {
//   const data = await response.clone().json();
//   console.log(response);

//   if (data && data.NOT_LOGIN) {
//     location.href = 'http://www.baidu.com';
//   }
//   return response;
// });

export default request
