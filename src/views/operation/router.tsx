import LayoutPage from 'layout/index';
import { lazyLoad } from 'utils/lazy';

export default [
	{
		name: 'operation',
		// element: <LayoutPage />,
		meta: {
			title: '营销配置'
		},
		children: [
			{
				path: '/operation/bannerAdvertise',
				name: 'bannerAdvertise',
				element: lazyLoad('banner-advertise'),
				meta: {
					title: '横幅广告',
					requiresAuth: true
				}
			},
			{
				path: '/operation/hotNews',
				name: 'hotNews',
				element: lazyLoad('hot-news'),
				meta: {
					title: '热门资讯',
					requiresAuth: true
				}
			},
			{
				path: '/operation/hotDiscussion',
				name: 'hotDiscussion',
				element: lazyLoad('hot-discussion'),
				meta: {
					title: '热门讨论',
					requiresAuth: true
				}
			}
		]
	}
];
