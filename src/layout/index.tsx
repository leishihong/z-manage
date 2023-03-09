import { PropsWithChildren, FC, memo, ReactNode, JSXElementConstructor, ReactElement, ReactFragment, ReactPortal } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout, Button, FloatButton, Card } from 'antd';
import { QuestionCircleOutlined, SyncOutlined, SmileOutlined, DoubleRightOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import { PageContainer, ProLayout, ProCard, SettingDrawer } from '@ant-design/pro-components';
import type { ProSettings } from '@ant-design/pro-components';

import LayoutHeader from './includes/LayoutHeader';
import LayoutSiderMenu from './includes/LayoutSiderMenu';
import LayoutTagViews from './includes/LayoutTagViews'

import { layoutRouterList } from 'routers/AppRouter';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { toggleCollapse, setAuthButtons } from 'store/globalSlice';
import { GlobalState } from 'store/globalSlice/interface';

import cx from './style/index.module.less';

const { Header, Content, Footer } = Layout;

const DefaultLayout: FC = () => {
	const { isCollapsed }: GlobalState = useAppSelector(({ globalState }) => globalState);
	const dispatch = useAppDispatch();
	const [pathname, setPathname] = useState('/default');

	// 获取按钮权限列表
	const getAuthButtonsList = async () => {
		// const { data } = await getAuthorButtons();
		// dispatch(setAuthButtons(data));
	};
	// 监听窗口大小变化
	const listeningWindowResize = useCallback(() => {
		const screenWidth: number = document.body.clientWidth;
		const collapsed = !isCollapsed && screenWidth < 1200 ? true : false;
		dispatch(toggleCollapse({ isCollapsed: collapsed }));
	}, [isCollapsed]);

	useEffect(() => {
		window.addEventListener('resize', listeningWindowResize);
		getAuthButtonsList();
		return () => {
			window.removeEventListener('resize', listeningWindowResize);
		};
	}, []);
	return (
		<section className={cx['container']} id="test-pro-layout">
			{/* <ProLayout
				siderWidth={216}
				menuDataRender={() => layoutRouterList}
				router={layoutRouterList}
				layout="mix"
				menuItemRender={(item: { path: any }, dom: any) => (
					<a
						onClick={() => {
							setPathname(item.path || '/welcome');
						}}
					>
						{dom}
					</a>
				)}
				location={{ pathname }}
				avatarProps={{
					src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
					size: 'small',
					title: '七妮妮'
				}}
				{...settings}
			>
				<PageContainer>
					<ProCard
						style={{
							height: '100vh',
							minHeight: 800
						}}
					>
						<Outlet />
						<FloatButton.BackTop />
					</ProCard>
				</PageContainer>
			</ProLayout>
			<SettingDrawer
				pathname={pathname}
				enableDarkTheme
				getContainer={() => document.getElementById('test-pro-layout')}
				settings={settings}
				onSettingChange={(changeSetting: any) => {
					setSetting(changeSetting);
				}}
				disableUrlParams={false}
			/> */}
				<LayoutSiderMenu />
				<Content className="main-content">
				<LayoutHeader />
					<LayoutTagViews/>
					<div className="content-box">
						<div
							className="article-content"
							style={{
								height: '100vh',
								minHeight: 800,
							}}
						>
							<Outlet />
							<FloatButton.BackTop />
						</div>
					</div>
				</Content>
		</section>
	);
};
export default memo(DefaultLayout);
