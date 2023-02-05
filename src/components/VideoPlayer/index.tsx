import React, { useEffect, memo, FC, useState, useRef, useMemo, forwardRef, useImperativeHandle } from 'react';
import { createPortal } from 'react-dom';
import Player, { IPlayerOptions } from 'xgplayer';

interface IScreenShot {
  screenShot?: {
    [key: string]: any;
  };
}

type TypeIPlayerOptions = IPlayerOptions & IScreenShot;

const defaultOptions: TypeIPlayerOptions = {
  lang: 'zh-cn', //zh-cn' | 'en' | 'jp'
  autoplay: false, // 是否自动播放
  volume: 0.6, // 播放器音量
  url: '', // 播放地址
  poster: '', // 封面图
  // closeInactive: true, //放器控制栏常驻不隐藏
  playsinline: false, // 控制操作调是否常驻
  playbackRate: [0.5, 0.75, 1, 1.5, 2], // 倍速播放
  defaultPlaybackRate: 1,
  download: true, //设置download控件显示
  pip: true,
  screenShot: {
    saveImg: true,
    quality: 0.92,
    type: 'image/png',
    format: '.png'
  },
  keyShortcut: 'on',
  keyShortcutStep: {
    //设置调整步长
    currentTime: 15, //播放进度调整步长，默认10秒
    volume: 0.2 //音量调整步长，默认0.1
  },
  fitVideoSize: 'auto', // 'fixWidth' | 'fixHeight' | 'auto'
  // width: 400,
  // height: 300,
  fluid: true, // 流式布局
  videoInit: true, // 初始化显示视频首帧 和自动播放冲突
  cssFullscreen: true, //样式全屏功能不会隐藏当前浏览器的标签栏，导航栏，只是在当前页面内部全屏显示。
  errorTips: `请<span>刷新</span>试试`, //播放器出现错误时的文字提示HTML内容
  rotate: {
    //视频旋转按钮配置项
    innerRotate: true, //只旋转内部video
    clockwise: false // 旋转方向是否为顺时针
  }
};

interface IProps {
  options: { [key: string]: any };
  getContainer: any;
}
const VideoPlayer: FC<IProps> = forwardRef((props, ref) => {
  const { options, getContainer = document.body } = props;
  const playerContainer = useRef<any>();
  const playerRef = useRef<any>();
  const isBoolean = useMemo(() => typeof getContainer === 'boolean', [getContainer]);
  useEffect(() => {
    init();
    return () => {
      playerRef.current = null;
    };
  }, [playerContainer.current]);

  useImperativeHandle(ref, () => ({
    player: playerRef.current
  }));

  const init = () => {
    playerRef.current = new Player({
      el: playerContainer.current,
      ...Object.assign({}, defaultOptions, options)
    });
  };
  const renderVideo = useMemo(() => {
    return <div ref={playerContainer} />;
  }, [playerContainer.current]);

  return isBoolean ? renderVideo : createPortal(renderVideo, getContainer);
});

export default memo(VideoPlayer);
