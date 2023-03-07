import { lazyLoad, Lazy } from 'utils/lazy';

import { Outlet, Navigate } from 'react-router-dom';

export default [
	{
		path: '/audit',
		name: 'audit',
		element: lazy(() => import('layout/OutletLayout')),
		meta: {
			title: '审核中心',
			requiresAuth: false
		},
		children: [
			{
				name: 'activityAudit',
				index: true,
				path: '/audit/activity',
        element: lazy(() => import('views/audit/activity-audit')),
				// element: lazyLoad('activity-audit'),
				meta: {
					title: '活动发布',
					requiresAuth: false
				}
			},
			{
				name: 'communityAudit',
				path: '/audit/community',
				index: true,
				element: lazyLoad('community-audit'),
				meta: {
					title: '社团入驻',
					requiresAuth: false
				}
			}
		]
	}
];
