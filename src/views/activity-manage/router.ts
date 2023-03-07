import { lazyLoad, Lazy } from 'utils/lazy';

export default [
	{
		name: 'ActivityManage',
		path: '/activityManage',
		element: lazyLoad('activity-manage/index'),
		meta: {
			title: '系统提示',
			requiresAuth: false
		}
	}
];
