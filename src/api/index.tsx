import axios, { AxiosRequestConfig } from 'axios';

const instance = axios.create({
  timeout: 1000,
});

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 获取token
    const authorization = localStorage.getItem("Authorization");
    // 添加token至请求头中
    if (authorization && config) {
      config.headers.Authorization = authorization;
    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    const { code, msg, data } = response.data;
    console.log("拦截到的信息：", code, data, msg);
    // 对响应数据做点什么
    return data;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

// eslint-disable-next-line import/prefer-default-export
export const http = {
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return instance.get(url, config);
  },
  post<T = any>(
    url: string,
    data?: object,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return instance.post(url, data, config);
  },

  // get<T=any>(url: string, config?: AxiosRequestConfig) : Promise<T> {
  //     return service.get(url, config)
  // },
  //
  // post<T=any>(url: string, data?: object, config?: AxiosRequestConfig) :Promise<T> {
  //     return service.post(url, data, config)
  // },
};
