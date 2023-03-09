import LayoutPage from 'layout/index';

import { lazyLoad } from 'utils/lazy';

export default [
	{
		path: '/welcome',
		name: 'welcome',
		element: lazyLoad('welcome/index'),
		meta: {
			title: '欢迎页',
			requiresAuth: false
		}
	}
];
