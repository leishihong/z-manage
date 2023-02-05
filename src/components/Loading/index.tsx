import { useLayoutEffect, useEffect, memo, useMemo } from "react";
import { Spin } from "antd";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

import { useAppSelector } from "store/hooks";

import styles from "./style/index.module.less";

const LazyLoading = () => {
  const settings = useAppSelector(({ globalState }) => globalState.settings);
  const themeColor = useMemo(() => settings.themeColor, [settings]);

  const progressEl: any = document.querySelector(".bar");

  useLayoutEffect(() => {
    NProgress.configure({ showSpinner: false });
    if (progressEl) {
      progressEl.style.background = themeColor;
    }
  }, [progressEl, themeColor]);
  useEffect(() => {
    NProgress.start();
    return () => {
      NProgress.done();
    };
  }, []);

  return (
    <div className={styles.spin}>
      <Spin size="large" tip="拼命加载中..." />
    </div>
  );
};
export default memo(LazyLoading);
