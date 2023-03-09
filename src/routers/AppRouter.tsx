import { Navigate } from 'react-router-dom';
import { flattenDeep, compact, isEmpty, map } from 'lodash';
import LayoutPage from 'layout/index';
import { RouteObject } from 'routers/type';
import { lazyLoad } from 'utils/lazy';

// 全局检测router配置信息
const routerFiles: any = import.meta.glob('views/**/router.(tsx)', {
	eager: true,
});

let routerList: Array<RouteObject & any> = [];

// 数据定义重组
for (const path in routerFiles) {
	routerList = [...routerList, ...(routerFiles[path].default || routerFiles[path])];
}
// 主面需要的路由信息
const layoutRouterList = flattenDeep(compact(routerList.map((item) => (isEmpty(item.element) ? item.children : item))));
console.log(layoutRouterList, 'layoutRouterList', routerList);

const formatMenuRouterList = (dataSource: any) => {
	return map(dataSource, (item: any) => {
		const res = { ...item };
		Object.assign(res, { title: item.meta.title, icon: 'HomeOutlined' });
		if (!isEmpty(item.children)) res.children = formatMenuRouterList(item.children);
		return res;
	});
};
const routesConfig: any = [
	{
		path: '/',
		redirect: '/welcome',
	},
	{
		name: 'layout',
		element: <LayoutPage />,
		children: [
			...layoutRouterList,
			{
				path: '*',
				name: '404',
				element: lazyLoad('exception/404/index'),
				meta: {
					title: '404',
					requiresAuth: true,
					key: '404',
				},
			},
		],
	},
	{
		path: '/login',
		name: 'login',
		element: lazyLoad('login/index'),
	},
	{
		path: '*',
		name: '404',
		element: lazyLoad('exception/404/index'),
		meta: {
			title: '404',
		},
	},
];
export { routerList, formatMenuRouterList, layoutRouterList };

export default routesConfig;
