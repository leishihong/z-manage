import { FC, ReactNode, createElement } from 'react';
import { Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';
import { map, isEmpty } from 'lodash';
import * as Icons from '@ant-design/icons';

import LogoCircle from 'assets/images/logo-circle.png';

import { useAppSelector, useAppDispatch } from 'store/hooks';
import { setSlideMenuList, setAuthRouter, setBreadcrumbList } from 'store/globalSlice';
import { formatMenuRouterList, routerList } from 'routers/AppRouter';
import { searchRoute, getOpenKeys, findAllBreadcrumb, handleRouter } from '../utils';

import 'layout/style/sider-menu.less';

const { Sider } = Layout;

// 定义 menu 类型
type MenuItem = Required<MenuProps>['items'][number];

const getItem = (label: ReactNode, key?: React.Key | null, icon?: ReactNode, children?: MenuItem[], type?: 'group'): MenuItem => {
	return {
		key,
		icon,
		children,
		label,
		type,
	} as MenuItem;
};

const LayoutSiderMenu: FC = () => {
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { isCollapsed, settings } = useAppSelector(({ globalState }) => globalState);
	const [selectedKeys, setSelectedKeys] = useState<string[]>([pathname]);
	const [openKeys, setOpenKeys] = useState<string[]>([]);
	// 获取菜单列表并处理成 antd menu 需要的格式
	const [menuList, setMenuList] = useState<MenuItem[]>([]);
	// 动态渲染 Icon 图标
	const customIcons: { [key: string]: any } = Icons;
	const addIcon = (name: string) => {
		return createElement(customIcons[name]);
	};
	// 处理后台返回菜单 key 值为 antd 菜单需要的 key 值
	const deepLoopFloat = (menuList: Menu.MenuOptions[], newArr: MenuItem[] = []) => {
		menuList.forEach((item: Menu.MenuOptions) => {
			// 下面判断代码解释 *** !item?.children?.length   ==>   (!item.children || item.children.length === 0)
			if (!item?.children?.length) return newArr.push(getItem(item.title, item.path, addIcon(item.icon!)));
			newArr.push(getItem(item.title, item.path, addIcon(item.icon!), deepLoopFloat(item.children)));
		});
		return newArr;
	};

	const getMenuData = async () => {
		setMenuList(deepLoopFloat(formatMenuRouterList(routerList)));
		// 存储处理过后的所有面包屑导航栏到 redux 中
		await dispatch(
			setBreadcrumbList({
				breadcrumbList: findAllBreadcrumb(formatMenuRouterList(routerList)),
			})
		);
		// 把路由菜单处理成一维数组，存储到 redux 中，做菜单权限判断
		const dynamicRouter = handleRouter(formatMenuRouterList(routerList));
		await dispatch(setAuthRouter({ authRouter: dynamicRouter }));
		// 暂时隐藏有时间处理
		// await dispatch(setSlideMenuList({ slideMenuList: formatMenuRouterList(routerList) }));
	};
	useEffect(() => {
		getMenuData();
	}, []);

	// 刷新页面菜单保持高亮
	useEffect(() => {
		setSelectedKeys([pathname]);
		isCollapsed ? null : setOpenKeys(getOpenKeys(pathname));
	}, [pathname, isCollapsed]);

	const handleMenuClick: MenuProps['onClick'] = useCallback(
		({ key }: { key: string }) => {
			const route = searchRoute(key, formatMenuRouterList(routerList));
			if (route.isLink) window.open(route.isLink, '_blank');
			console.log(key, 'key');
			navigate(key);
		},
		[routerList]
	);
	const handleMenuOpenChange = useCallback((openKeys: string[]) => {
		if (openKeys.length === 0 || openKeys.length === 1) return setOpenKeys(openKeys);
		const latestOpenKey = openKeys[openKeys.length - 1];
		if (latestOpenKey.includes(openKeys[0])) return setOpenKeys(openKeys);
		setOpenKeys([latestOpenKey]);
	}, []);

	return (
		<Sider className="layout-slide" trigger={null} collapsible width={settings.menuWidth} collapsed={isCollapsed} theme="light">
			<div className="layout-slide-content">
				<div className="logo-box">
					<img src={LogoCircle} alt="logo" className="logo-img" />
					{!isCollapsed ? <h2 className="logo-text">我的热爱</h2> : null}
				</div>
				<Menu
					theme="light"
					className="layout-slide-menu"
					mode="inline"
					openKeys={openKeys}
					selectedKeys={selectedKeys}
					items={menuList}
					onClick={handleMenuClick}
					onOpenChange={handleMenuOpenChange}
				/>
			</div>
		</Sider>
	);
};
export default memo(LayoutSiderMenu);
