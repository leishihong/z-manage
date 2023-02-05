import React, { FC, useState, memo, useMemo } from "react";
import { createPortal } from "react-dom";
import { Result, Spin } from "antd";

import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import zh_CN from "@react-pdf-viewer/locales/lib/zh_CN.json";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

import cx from "./index.module.less";

const workerUrl = "https://unpkg.com/pdfjs-dist/build/pdf.worker.js";
const loadErrorMessage = new Map([
  ["InvalidPDFException", "文档无效或损坏"],
  ["MissingPDFException", "文件丢失"],
  ["UnexpectedResponseException", "意外的服务器响应"],
  ["UnknownErrorException", "获取失败"],
]);

interface IProps {
  src: string;
  getContainer?: any;
  withCredentials?: boolean;
  initialPage?: number;
}
const PDFPreview: FC<IProps> = (props) => {
  const {
    src,
    getContainer = document.body,
    withCredentials = true,
    initialPage = 0,
  } = props;
  const isBoolean = useMemo(
    () => typeof getContainer === "boolean",
    [getContainer]
  );
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  //TODO: 改写pdf加载失败结构
  const renderError = (error: any) => {
    console.log("pdf-渲染异常", error);
    const message = loadErrorMessage.has(error.name)
      ? loadErrorMessage.get(error.name)
      : "网络不稳定、浏览器版本过低（建议升级您的浏览器）";
    return (
      <div className={cx["pdf-viewer-load-error"]}>
        <Result
          status="error"
          title="PDF加载失败，请稍后重试"
          subTitle={`造成失败的原因如下：${message}`}
        />
      </div>
    );
  };
  //TODO: 改写pdf默认加载器
  const renderLoading = (percentages: any) => {
    console.log("加载速度耗时", Math.round(percentages));
    return (
      <Spin spinning={true} tip="pdf正在加载中，请耐心等待..." size="large" />
    );
  };
  const renderViewer = useMemo(() => {
    return (
      <Worker workerUrl={workerUrl}>
        <div className={cx["pdf-viewer-wrap"]}>
          <Viewer
            fileUrl={src}
            plugins={[defaultLayoutPluginInstance]}
            localization={zh_CN}
            initialPage={initialPage}
            withCredentials={withCredentials}
            renderError={renderError}
            renderLoader={renderLoading}
          />
        </div>
      </Worker>
    );
  }, [src, initialPage]);

  return isBoolean ? renderViewer : createPortal(renderViewer, getContainer);
};
export default memo(PDFPreview);
