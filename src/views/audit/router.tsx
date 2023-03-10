import LayoutPage from 'layout/index';
import { lazyLoad } from 'utils/lazy';

export default [
	{
		name: 'audit',
		// element: <LayoutPage/>,
		path: '/audit',
		meta: {
			title: '审核中心',
		},
		children: [
			{
				name: 'activityAudit',
				path: '/audit/activity',
				element: lazyLoad('audit/activity-audit'),
				// element: lazyLoad('activity-audit'),
				meta: {
					title: '活动发布',
					requiresAuth: true,
					key: 'activity',
				},
			},
			{
				name: 'communityAudit',
				path: '/audit/community',
				element: lazyLoad('audit/community-audit'),
				meta: {
					title: '社团入驻',
					requiresAuth: true,
					key: 'community',
				},
			},
		],
	},
];
