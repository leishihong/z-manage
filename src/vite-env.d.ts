/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_BASE_PATH: string;
  readonly VITE_APP_API_PREFIX: string;
  readonly VITE_APP_URL: string;
  readonly VITE_APP_A_AMP_SECURITY_JS_CODE: string;
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '*.png';
declare module '*.svg';
declare module '*.jpg';
// 定义 less 类型
declare module '*.less' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '@ant-design/pro-components';

declare interface Window {
  _AMapSecurityConfig: any;
  AMap: any;
}
declare let AMap: any;
declare let AMapUI: any;
declare let Loca: any;
declare let ___onAPILoaded: any;
