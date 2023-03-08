import LayoutPage from 'layout/index';
import { lazyLoad } from 'utils/lazy';

export default [
	{
		name: 'manage',
		// element: <LayoutPage/>,
		meta: {
			title: '管理中心'
		},
		children: [
			{
				path: '/manage/activity',
				name: 'activityManage',
				element: lazyLoad('activity-manage'),
				meta: {
					title: '活动列表',
					requiresAuth: true
				}
			},
			{
				path: '/manage/community',
				name: 'communityManage',
				element: lazyLoad('community-manage'),
				meta: {
					title: '社团列表',
					requiresAuth: true
				}
			},
			{
				path: '/manage/moka',
				name: 'moKaManage',
				element: lazyLoad('moka-manage'),
				meta: {
					title: 'MoKa管理',
					requiresAuth: true
				}
			}
		]
	}
];
