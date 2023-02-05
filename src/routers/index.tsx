import { lazy, Suspense, ReactNode } from 'react';
import { createBrowserRouter, RouteObject } from 'react-router-dom';

import LoadingComponent from 'components/Loading/index';

import LayoutPage from 'layout/index';
import LoginPage from 'views/login/index';

const NotFound = lazy(() => import('views/exception/403/index'));

const load = (children: ReactNode): ReactNode => (
	<Suspense fallback={<LoadingComponent />}>{children}</Suspense>
);
//定义路由数据
export const routes: RouteObject[] = [
	{
		path: '/',
		element: <LayoutPage />,
		children: [
			{
				path: '*',
				element: load(<NotFound />)
			}
		]
	},
	{
		path: '/login',
		element: <LoginPage />
	}
];

export default createBrowserRouter(routes);
