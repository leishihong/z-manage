import LayoutPage from 'layout/index';

import { lazyLoad } from 'utils/lazy';

export default [
	{
		path: '/home',
		name: 'home',
		element: lazyLoad('home/index'),
		meta: {
			title: '欢迎页',
			requiresAuth: false,
			key:'home'
		}
	}
];
