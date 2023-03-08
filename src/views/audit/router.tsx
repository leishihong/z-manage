import LayoutPage from 'layout/index';
import { lazyLoad } from 'utils/lazy';

export default [
	{
		name: 'audit',
		// element: <LayoutPage/>,
		meta: {
			title: '审核中心'
		},
		children: [
			{
				name: 'activityAudit',
				path: '/audit/activity',
				element: lazy(() => import('views/audit/activity-audit')),
				// element: lazyLoad('activity-audit'),
				meta: {
					title: '活动发布',
					requiresAuth: true
				}
			},
			{
				name: 'communityAudit',
				path: '/audit/community',
				element: lazyLoad('community-audit'),
				meta: {
					title: '社团入驻',
					requiresAuth: true
				}
			}
		]
	}
];
