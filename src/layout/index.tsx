import { FC, memo, ReactNode, JSXElementConstructor, ReactElement, ReactFragment, ReactPortal } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout, FloatButton } from 'antd';

import LayoutHeader from './includes/LayoutHeader';
import LayoutSiderMenu from './includes/LayoutSiderMenu';
import LayoutTagViews from './includes/LayoutTagViews';

import { layoutRouterList } from 'routers/AppRouter';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { toggleCollapse, setAuthButtons } from 'store/globalSlice';
import { GlobalState } from 'store/globalSlice/interface';

import 'layout/style/layout-app.less';

const { Header, Content, Footer } = Layout;

const navbarHeight = 55;

const DefaultLayout: FC = () => {
	const { isCollapsed, settings }: GlobalState = useAppSelector(({ globalState }) => globalState);
	const dispatch = useAppDispatch();
	const [pathname, setPathname] = useState('/default');

	const menuWidth = useMemo(() => (isCollapsed ? 80 : settings?.menuWidth), [isCollapsed, settings]);

	const { paddingLeft, paddingTop } = useMemo(
		() => ({
			paddingLeft: settings.sliderMenu ? { paddingLeft: menuWidth } : {},
			paddingTop: settings.sliderMenu ? { paddingTop: navbarHeight } : {},
		}),
		[isCollapsed, menuWidth, settings.sliderMenu]
	);
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
		<section className={'app-container'} id="test-pro-layout">
			<LayoutSiderMenu />
			<div
				className="app-layout"
				style={Object.assign({}, paddingLeft, {
					width: `calc(100% - ${menuWidth})`,
				})}
			>
				{/* <div
					className="app-layout-space"
					style={{
						height: settings.tagViews ? navbarHeight + 38 : navbarHeight
					}}
				/> */}
				<div className="app-layout-header" style={{ left: menuWidth }}>
					<LayoutHeader />
					<LayoutTagViews />
				</div>
				<div className="app-layout-content" id="app-layout-content">
					<Outlet />
					<FloatButton.BackTop target={() => (document as any).body} />
				</div>
			</div>
		</section>
	);
};
export default memo(DefaultLayout);
