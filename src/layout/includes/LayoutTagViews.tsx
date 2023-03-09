import { FC, Fragment } from 'react';
import { Tabs, message } from 'antd';
import { HomeFilled } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { map, cloneDeep, isEmpty, compact } from 'lodash';

import { layoutRouterList } from 'routers/AppRouter';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { toggleCollapse, setTagViewList } from 'store/globalSlice';
import { GlobalState } from 'store/globalSlice/interface';

import { searchRoute, getOpenKeys, findAllBreadcrumb, handleRouter } from 'layout/utils';
import { formatMenuRouterList, routerList } from 'routers/AppRouter';

import { HOME_URL } from 'constants/config';

import 'layout/style/tag-views.less';

const { TabPane } = Tabs;

const LayoutTagViews: FC = () => {
	const { tagViewList, settings }: GlobalState = useAppSelector(({ globalState }) => globalState);
	const dispatch = useAppDispatch();
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const [activeValue, setActiveValue] = useState<string>(pathname);

	useEffect(() => {
		addTabs();
	}, [pathname]);

	const clickTabs = useCallback((path: string) => {
		navigate(path);
	}, []);

	// add tabs
	const addTabs = useCallback(() => {
		const route = searchRoute(pathname, routerList);
		const newTabsList: any = cloneDeep(tagViewList).filter(item=>item)

		if (tagViewList.every((item: any) => item.path !== route.path)) {
			newTabsList.push({ title: route.meta!.title, path: route.path });
		}
		dispatch(setTagViewList({ tagViewList: newTabsList }));
		setActiveValue(pathname);
	}, [pathname, tagViewList, routerList]);
	// delete tabs
	const delTabs = useCallback(
		(tabPath?: string) => {
			if (tabPath === HOME_URL) return;
			if (pathname === tabPath) {
				tagViewList.forEach((item: Menu.MenuOptions, index: number) => {
					if (item.path !== pathname) return;
					const nextTab = tagViewList[index + 1] || tagViewList[index - 1];
					if (!nextTab) return;
					navigate(nextTab.path);
				});
			}
			message.success('你删除了Tabs标签 😆😆😆');
			dispatch(
				setTagViewList({
					tagViewList: tagViewList.filter((item: Menu.MenuOptions) => item.path !== tabPath),
				})
			);
		},
		[pathname, tagViewList]
	);

	return (
		<Fragment>
			{!settings.tagViews && !isEmpty(tagViewList) && (
				<div className="tabs">
					<Tabs
						animated
						activeKey={activeValue}
						onChange={clickTabs}
						hideAdd
						type="editable-card"
						onEdit={(path) => {
							delTabs(path as string);
						}}
					>
						{tagViewList.map((item: Menu.MenuOptions) => {
							return (
								<TabPane
									key={item.path}
									tab={
										<span>
											{item.path == HOME_URL ? <HomeFilled /> : ''}
											{item.title}
										</span>
									}
									closable={item.path !== HOME_URL}
								/>
							);
						})}
					</Tabs>
					{/* <MoreButton tabsList={tabsList} delTabs={delTabs} setTabsList={setTabsList}></MoreButton> */}
				</div>
			)}
		</Fragment>
	);
};

export default memo(LayoutTagViews);
