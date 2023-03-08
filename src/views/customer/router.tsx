import LayoutPage from 'layout/index';

import { lazyLoad } from 'utils/lazy';

export default [
	{
		name: 'customer',
    // element: <LayoutPage/>,
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
