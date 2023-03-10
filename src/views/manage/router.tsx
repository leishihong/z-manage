import LayoutPage from 'layout/index';
import { lazyLoad } from 'utils/lazy';

export default [
	{
		name: 'manage',
		// element: <LayoutPage/>,
		path: '/manage',
		meta: {
			title: '管理中心',
		},
		children: [
			{
				path: '/manage/activity',
				name: 'activityManage',
				element: lazyLoad('manage/activity-manage/index'),
				meta: {
					title: '活动列表',
					requiresAuth: true,
					key: 'activity',
				},
			},
			{
				path: '/manage/community',
				name: 'communityManage',
				element: lazyLoad('manage/community-manage/index'),
				meta: {
					title: '社团列表',
					requiresAuth: true,
					key: 'community',
				},
			},
			{
				path: '/manage/moka',
				name: 'moKaManage',
				element: lazyLoad('manage/moka-manage/index'),
				meta: {
					title: 'MoKa管理',
					requiresAuth: true,
					key: 'moka',
				},
			},
		],
	},
];
