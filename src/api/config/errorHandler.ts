import type { AxiosError, AxiosResponse } from 'axios';
import { notification } from 'antd';
import { store } from 'store/index';
import { clearLoginInfo } from 'store/loginSlice';

// 不提示信息
const dontRrompt: any = [];

// 特殊处理
// const specialTreatment = [1320, 1324]
export const specialTreatment: any = [1130001];

export function isAxiosError(object: any): object is AxiosError {
  return object.config !== undefined;
}

export function handleError(error: any) {
  if (isAxiosError(error)) {
    if (error.response) {
      const response = error.response as AxiosResponse<any>;
      console.log(22222, 'response', response);
      if (response.status === 200) {
        const IResponseCode = response.data.status;
        const message = response.data.message;
        if (![200].includes(IResponseCode)) {
          handelOtherError(IResponseCode, message);
        }
      } else {
        if (response.status === 401) {
          notification.error({
            message: '温馨提示',
            description: '令牌已过期，请刷新此页面并重试',
          });
          handelOtherError(response.data.status);
        } else if ([500, 501, 502, 503].includes(response.status)) {
          // router.push('/500');
          notification.error({
            message: '温馨提示',
            description: '服务器异常，请稍等一会儿再试~~',
          });
        } else {
          notification.error({
            message: '温馨提示',
            description: response?.data?.message || '系统内部异常',
          });
        }
      }
    } else if (error.request) {
      notification.error({ message: '温馨提示', description: '网络错误' });
    } else {
      notification.error({ message: '温馨提示', description: '服务器错误' });
    }
  } else {
    console.log(error, 'IResponseCode');
    // Raven.captureException(error);
    notification.error({
      message: '温馨提示',
      description: error?.data?.message || '未知异常',
    });
  }
}

export function handelOtherError(IResponseCode: number, message = '未知异常') {
  // 不提示信息
  const dontRromptRes = dontRrompt.find((value: any) => value == IResponseCode);
  if (dontRromptRes !== undefined) {
    return;
  }
  // 特殊处理
  const specialTreatmentRes = specialTreatment.find(
    (value: any) => value == IResponseCode
  );
  console.log(specialTreatmentRes, 'specialTreatmentRes');
  if (specialTreatmentRes !== undefined) {
    store.dispatch(clearLoginInfo());
    return;
  }
  notification.error({ message: '温馨提示', description: message });
}
