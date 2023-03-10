import React, { useContext, useEffect, useCallback, useState, useRef } from 'react';
import { Modal } from 'antd';
import { History, Transition } from 'history';
import { UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom';

type ExtendNavigator = Navigator & Pick<History, 'block'>;

export const useBlocker = (blocker: (tx: Transition) => void, when = true) => {
	const { navigator }: any = useContext(NavigationContext);
	useEffect(() => {
		if (!when) return;
		// 如不需要刷新页面或关闭tab时取消浏览器询问弹窗，下面的绑定事件则不需要
		// window.addEventListener('beforeunload', removeBeforeUnload);
		const unblock = (navigator as any as ExtendNavigator).block((tx: { retry: () => void }) => {
			const autoUnblockingTx: any = {
				...tx,
				retry() {
					unblock();
					tx.retry();
				},
			};

			blocker(autoUnblockingTx);
		});
		// 由于无法直接 remove history 库中绑定的 beforeunload 事件，只能自己在绑定一个 beforeunload 事件（在原事件之前），触发时调用 unblock
		function removeBeforeUnload() {
			unblock();
		}
		return () => {
			unblock();
			// window.removeEventListener('beforeunload', removeBeforeUnload);
		};
	}, [navigator, blocker, when]);
};

/**
 * @description 编辑表单是路由返回提示
 * 使用方法：首先在需要拦截的组件中引用 usePrompt 方法
 * @param message
 * @param when
 * @returns
 */
export const usePrompt = (message: any, when = true) => {
	const { basename } = useContext(NavigationContext);

	const blocker = useCallback(
		(tx: { location: { pathname: any }; retry: () => void }) => {
			if (typeof message === 'function') {
				let targetLocation = tx?.location?.pathname;
				if (targetLocation.startsWith(basename)) {
					targetLocation = targetLocation.substring(basename.length);
				}
				const callback = () => {
					tx.retry();
				};
				message(targetLocation, callback);
			} else if (typeof message === 'string') {
				if (window.confirm(message || '当前页面有未保存的内容，您确定要离开该页面吗?')) {
					tx.retry();
				}
			}
		},
		[message, basename]
	);

	return useBlocker(blocker, when);
};
