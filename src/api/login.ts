import { fetchApi, post } from "./config/request";

interface ILogin {
  password: string;
  rememberMe: boolean;
  userCode: string;
  verificationCode: string;
}

// 登录验证
export const fetchLogin = (params: ILogin) =>
  post("manage/login/in", params, { headers: { verificationCode: 123456 } });
// 登陆生成随机验证码
export const fetchVerifyCode = (params: any) =>
  fetchApi.get("manage/login/verifyCode", params);
// 退出登录
export const fetchLogout = (params: { userCode: string }) =>
  post("manage/logout", params);
