import { IRouteType } from 'routers/type';
import { lazyLoad, Lazy } from 'utils/lazy';

const routerFiles: any = import.meta.glob('views/**/router.(ts)', {
	eager: true
	// import: 'default'
});

// const lazyLoad = (moduleName: string): any => {
// 	const modules: any = import.meta.glob('src/*/**/*.tsx');
// 	return lazy(modules[`/src/views/${moduleName}.tsx`]);
// };

let routerList: Array<IRouteType> = [];
for (const path in routerFiles) {
	routerList = [
		...routerList,
		...(routerFiles[path].default || routerFiles[path])
	];
}

const routesConfig: Array<IRouteType> = [
	{
		path: '/',
		name: 'layout',
		element: lazy(() => import('layout/index')),
		children: [
			{
				path: '/',
				name: 'home',
				redirect: '/home'
			},
			{
				path: '/home',
				name: 'home',
				// element: lazyLoad('home/index'),
				element: lazyLoad('home/index'),
				meta: { title: '首页' }
			},
			...routerList
		]
	},
	{
		path: '/login',
		name: 'login',
		element: lazyLoad('login/index')
		// element: () => import('views/login/index')
	},
	{
		path: '*',
		name: '404',
		element: lazyLoad('exception/404/index'),
		// element: () => import('views/exception/404'),
		meta: {
			title: '404'
		}
	}
];

export default routesConfig;
