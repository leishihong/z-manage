import axios, {
	AxiosError,
	AxiosRequestConfig,
	AxiosResponse,
	CancelTokenStatic
} from 'axios';
import { notification } from 'antd';
import { store } from 'store/index';
import { clearLoginInfo } from 'store/loginSlice';
import { updateRouterPrompt } from 'store/globalSlice';
import { HttpResponse } from '../type';

import { AxiosCanceler } from './axiosCanceler';

// 帮助取消pending中的接口
let cancelToken: any = null;
const axiosCanceler = new AxiosCanceler();

export const requestInterceptor = (config: AxiosRequestConfig) => {
	config.cancelToken = new axios.CancelToken((c) => (cancelToken = c));
	axiosCanceler.addPending(config);
	const { loginState } = store.getState();
	console.log(`output->loginState`, loginState);
	const JwtToken: any = loginState.token ? { token: loginState.token } : {};
	config.headers = {
		timestamp: new Date().getTime(),
		...config.headers,
		platform: 'PC',
		domain: 'admin_platform',
		...JwtToken
	};
	return config;
};

export const responseInterceptor = async (
	response: AxiosResponse<HttpResponse>
) => {
	const { data, config } = response;
	console.log(data);
	// * 在请求结束后，移除本次请求
	axiosCanceler.removePending(config);
	if (response.status === 200) {
		if ([200].includes(data.status)) {
			return data;
		} else if ([500, 501, 502, 503].includes(data.status)) {
			console.log('网络异常，请稍后再试！', response);
			notification.error({
				message: '系统提示',
				description: '网络异常，请稍后再试！'
			});
		} else {
			notification.error({
				message: '系统提示',
				description: data.message || '网络异常，请稍后再试！'
			});
			if ([1130001].includes(data.status)) {
				await store.dispatch(updateRouterPrompt({ routerPrompt: true }));
				store.dispatch(clearLoginInfo());
				// window.location.href =
				//   process.env.REACT_APP_BUILD_ENV === 'development'
				//     ? '/login'
				//     : process.env.REACT_APP_URL + process.env.PUBLIC_URL + '/login';
			}
		}
		return Promise.reject(Object.assign(response, { response }));
	} else {
		if ([500, 501, 502, 503].includes(response.status)) {
			notification.error({
				message: '系统提示',
				description: '网络异常，请稍后再试！'
			});
		} else {
			notification.error({
				message: '系统提示',
				description: response.data.message || '服务器异常，请稍后再试'
			});
		}
	}
	console.warn(
		'[axios:responseInterceptor]: un normalized api response',
		response.config.method,
		response.config.url
	);
	return Promise.reject(Object.assign(response, { response }));
};

export const errorInterceptor = async (error: AxiosError) => {
	const res = error?.response;
	if (res && res.status === 401) {
		// 未登录 token失效
		await store.dispatch(updateRouterPrompt({ routerPrompt: true }));
		store.dispatch(clearLoginInfo());
		// window.location.href =
		//   process.env.REACT_APP_BUILD_ENV === 'development'
		//     ? '/login'
		//     : process.env.REACT_APP_URL + process.env.PUBLIC_URL + '/login';
	}
	return Promise.reject(error);
};

export { cancelToken };
