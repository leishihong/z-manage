import { Navigate } from 'react-router-dom';
import { flattenDeep, compact, isEmpty } from 'lodash';
import LayoutPage from 'layout/index';
import { RouteObject } from 'routers/type';
import { lazyLoad } from 'utils/lazy';

// 全局检测router配置信息
const routerFiles: any = import.meta.glob('views/**/router.(tsx)', {
	eager: true
});

let routerList: Array<RouteObject> = [];

// 数据定义重组
for (const path in routerFiles) {
	routerList = [
		...routerList,
		...(routerFiles[path].default || routerFiles[path])
	];
}
// 主面需要的路由信息
const layoutRouterList = flattenDeep(
	compact(
		routerList.map((item) => (isEmpty(item.element) ? item.children : false))
	)
);

const routesConfig: any = [
	{
		path: '/',
		redirect: '/welcome'
	},
	{
		name: 'layout',
		element: <LayoutPage />,
		children: [
			{
				path: '/welcome',
				name: 'welcome',
				element: lazyLoad('welcome/index'),
				meta: {
					title: '首页'
				}
			},
			...layoutRouterList,
			{
				path: '*',
				name: '404',
				element: lazyLoad('exception/404/index'),
				meta: {
					title: '404'
				}
			}
		]
	},
	{
		path: '/login',
		name: 'login',
		element: lazyLoad('login/index')
	},
	{
		path: '*',
		name: '404',
		element: lazyLoad('exception/404/index'),
		meta: {
			title: '404'
		}
	}
];
export { routerList };

export default routesConfig;
