import axios, { AxiosInstance } from "axios";
import { stringify } from "qs";
import queryString from "query-string";

import {
  requestInterceptor,
  responseInterceptor,
  errorInterceptor,
  cancelToken,
} from "./interceptor";

export const baseURL =
  "http://192.168.51.187:8805/manage/" || process.env.REACT_APP_BASE_URL;

const instance: AxiosInstance = axios.create({
  // baseURL: process.env.REACT_APP_BUILD_ENV === 'development' ? '/manage/' : baseURL,
  baseURL,
  timeout: 60000,
  // paramsSerializer: (params) => stringify(params, { arrayFormat: 'comma', skipNulls: true })
});

// @ts-ignore
instance.interceptors.request.use(requestInterceptor);
// @ts-ignore
instance.interceptors.response.use(responseInterceptor, errorInterceptor);

export const post = (url: string, params = {}, options: any = {}) => {
  const bodyParams = Object.assign({}, params);
  if (
    options &&
    options.headers &&
    options.headers["Content-Type"] === "multipart/form-data"
  ) {
    return instance.post(url, bodyParams, options);
  }
  if (
    options &&
    options.headers &&
    options.headers["Content-Type"] === "application/x-www-form-urlencoded"
  ) {
    return instance.post(url, queryString.stringify(bodyParams));
  }
  return instance.post(url, { params: bodyParams }, options);
};

export { cancelToken, instance as fetchApi };
