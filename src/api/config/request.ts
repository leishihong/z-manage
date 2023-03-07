import axios, { AxiosInstance } from 'axios';
import queryString from 'query-string';

import {
	requestInterceptor,
	responseInterceptor,
	errorInterceptor,
	cancelToken
} from './interceptor';

const { VITE_APP_ENV, VITE_APP_API_PREFIX, VITE_APP_BASE_URL } = import.meta
	.env;

export const baseURL =
	VITE_APP_ENV === 'dev'
		? VITE_APP_API_PREFIX
		: `${VITE_APP_BASE_URL}${VITE_APP_API_PREFIX}`;

console.log(baseURL, import.meta.env, 'baseURL');

const instance: AxiosInstance = axios.create({
	baseURL: VITE_APP_BASE_URL,
	timeout: 60 * 1000, //设置超时
	headers: {
		'Content-Type': 'application/json;charset=UTF-8;',
		'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8'
	}
});

// @ts-ignore
instance.interceptors.request.use(requestInterceptor, (error) =>
	Promise.reject(error)
);
// @ts-ignore
instance.interceptors.response.use(responseInterceptor, errorInterceptor);

export const post = (url: string, params = {}, options: any = {}) => {
	const bodyParams = Object.assign({}, params);
	if (
		options &&
		options.headers &&
		options.headers['Content-Type'] === 'multipart/form-data'
	) {
		return instance.post(url, bodyParams, options);
	}
	if (
		options &&
		options.headers &&
		options.headers['Content-Type'] === 'application/x-www-form-urlencoded'
	) {
		return instance.post(url, queryString.stringify(bodyParams));
	}
	return instance.post(url, bodyParams, options);
};

export { cancelToken, instance as fetchApi };
