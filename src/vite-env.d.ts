/// <reference types="vite/client" />

declare module "*.png";
declare module "*.svg";
declare module "*.jpg";
// 定义 less 类型
declare module "*.less" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module "@ant-design/pro-components";

declare interface Window {
  _AMapSecurityConfig: any;
  AMap: any;
}
declare let AMap: any;
declare let AMapUI: any;
declare let Loca: any;
declare let ___onAPILoaded: any;
