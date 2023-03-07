import { lazyLoad } from 'utils/lazy';

export default [
	{
		path: '/operation',
		name: 'operation',
		element: lazy(() => import('layout/OutletLayout')),
		meta: {
			title: '营销配置',
			requiresAuth: false
		},
		children: [
			{
				path: '/operation/bannerAdvertise',
				name: 'bannerAdvertise',
				element: lazyLoad('banner-advertise'),
				meta: {
					title: '横幅广告',
					requiresAuth: false
				}
			},
			{
				path: '/operation/hotNews',
				name: 'hotNews',
				element: lazyLoad('hot-news'),
				meta: {
					title: '热门资讯',
					requiresAuth: false
				}
			},
			{
				path: '/operation/hotDiscussion',
				name: 'hotDiscussion',
				element: lazyLoad('hot-discussion'),
				meta: {
					title: '热门讨论',
					requiresAuth: false
				}
			}
		]
	}
];
