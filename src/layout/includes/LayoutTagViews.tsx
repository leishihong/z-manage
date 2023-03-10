import { FC, Fragment } from 'react';
import { Tabs, message, Button, Dropdown, Menu } from 'antd';
import { HomeFilled, DownOutlined } from '@ant-design/icons';
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

	const menu = (
		<Menu
			items={[
				{
					key: '1',
					label: <span>关闭当前</span>,
					onClick: () => delTabs(pathname),
				},
				{
					key: '2',
					label: <span>关闭其它</span>,
					onClick: () => closeMultipleTab(pathname),
				},
				{
					key: '3',
					label: <span>关闭所有</span>,
					onClick: () => closeMultipleTab(),
				},
			]}
		/>
	);

	useEffect(() => {
		addTabs();
	}, [pathname]);

	// close multipleTab
	const closeMultipleTab = useCallback(
		(tabPath?: string) => {
			const handleTabsList = tagViewList.filter((item: Menu.MenuOptions) => {
				return item.path === tabPath || item.path === HOME_URL;
			});
			dispatch(setTagViewList({ tagViewList: handleTabsList }));
			tabPath ?? navigate(HOME_URL);
		},
		[tagViewList, HOME_URL]
	);
	const clickTabs = useCallback((path: string) => {
		navigate(path);
	}, []);

	// add tabs
	const addTabs = useCallback(() => {
		const route = searchRoute(pathname, routerList);
		const newTabsList: any = cloneDeep(tagViewList).filter((item) => item);

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
			// message.success('你删除了Tabs标签 😆😆😆');
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
			{settings.tagViews && !isEmpty(tagViewList) && (
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
						{map(tagViewList, (item: Menu.MenuOptions) => {
							return (
								<TabPane
									key={item.path}
									tab={
										<span>
											{item.path == HOME_URL && <HomeFilled />}
											{item.title}
										</span>
									}
									closable={item.path !== HOME_URL}
								/>
							);
						})}
					</Tabs>
					<Dropdown overlay={menu} placement="bottom" arrow={{ pointAtCenter: true }} trigger={['click']}>
						<Button className="more-button" type="primary" size="small">
							更多
							<DownOutlined />
						</Button>
					</Dropdown>
				</div>
			)}
		</Fragment>
	);
};

export default memo(LayoutTagViews);
