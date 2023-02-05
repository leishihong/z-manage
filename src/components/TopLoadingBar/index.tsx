import React, { useEffect, useRef, memo, useMemo } from "react";
import TopLoadingBar from "react-top-loading-bar";
import { useAppSelector } from "store/hooks";

const LoadingBar = () => {
  const settings = useAppSelector(({ globalState }) => globalState.settings);
  const loadingBarRef = useRef<any>(null);
  const themeColor = useMemo(() => settings.themeColor, [settings]);

  useEffect(() => {
    const loadingBar = loadingBarRef.current;
    loadingBar?.staticStart();
    return () => {
      loadingBar?.complete();
    };
  }, [loadingBarRef.current]);

  return <TopLoadingBar color={themeColor} ref={loadingBarRef} shadow />;
};

export default memo(LoadingBar);
