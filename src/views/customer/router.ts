import { lazyLoad, Lazy } from 'utils/lazy';

export default [
	{
		path: '/customer',
		name: 'customer',
    element: lazy(() => import('layout/OutletLayout')),
		meta: {
			title: '客服中心',
			requiresAuth: false
		},
		children: [
			{
        path: '/customer/customer',
				name: 'customer',
				element: lazyLoad('customer'),
				meta: {
					title: '客服中心',
					requiresAuth: false
				}
			}
		]
	}
];
