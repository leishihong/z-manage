import { lazyLoad } from 'utils/lazy';

export default [
	{
		name: 'order',
		// element: <LayoutPage/>,
		path: '/order',
		meta: {
			title: '订单管理',
		},
		children: [
			{
				path: '/order/order-manage',
				name: 'orderManage',
				element: lazyLoad('order/order-manage'),
				meta: {
					title: '订单列表',
					requiresAuth: true,
					key: 'order-manage',
				},
			},
		],
	},
];
