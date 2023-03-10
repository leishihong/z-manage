import LayoutPage from 'layout/index';
import { lazyLoad } from 'utils/lazy';

export default [
	{
		name: 'operation',
		// element: <LayoutPage />,
		path: '/operation',
		meta: {
			title: '营销配置',
		},
		children: [
			{
				path: '/operation/bannerAdvertise',
				name: 'bannerAdvertise',
				element: lazyLoad('operation/banner-advertise'),
				meta: {
					title: '横幅广告',
					requiresAuth: true,
					key: 'bannerAdvertise',
				},
			},
			{
				path: '/operation/hotNews',
				name: 'hotNews',
				element: lazyLoad('operation/hot-news'),
				meta: {
					title: '热门资讯',
					requiresAuth: true,
					key: 'hotNews',
				},
			},
			{
				path: '/operation/hotDiscussion',
				name: 'hotDiscussion',
				element: lazyLoad('operation/hot-discussion'),
				meta: {
					title: '热门讨论',
					requiresAuth: true,
					key: 'hotDiscussion',
				},
			},
		],
	},
];
