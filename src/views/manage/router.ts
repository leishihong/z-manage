import { lazyLoad, Lazy } from 'utils/lazy';

export default [
	{
    path: '/manage',
		name: 'manage',
    element: lazy(() => import('layout/OutletLayout')),
		meta: {
			title: '管理中心',
			requiresAuth: false
		},
		children: [
			{
				path: '/manage/activity',
				name: 'activityManage',
				element: lazyLoad('activity-manage'),
				meta: {
					title: '活动列表',
					requiresAuth: false
				}
			},
			{
				path: '/manage/community',
				name: 'communityManage',
				element: lazyLoad('community-manage'),
				meta: {
					title: '社团列表',
					requiresAuth: false
				}
			},
			{
				path: '/manage/moka',
				name: 'moKaManage',
				element: lazyLoad('moka-manage'),
				meta: {
					title: 'MoKa管理',
					requiresAuth: false
				}
			}
		]
	}
];
