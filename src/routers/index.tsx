import { isEmpty, map, compact } from 'lodash';

import { lazySuspense } from 'utils/lazy';
import routesConfig from './AppRouter';
import AuthRouter from './AuthRouter';
import { RouteObject } from './type';

const renderRoutes = (routes: Array<RouteObject>) => {
	return map(routes, (item: RouteObject & any) => {
		const res: any = { ...item };
		if (item.element && item.path) {
			res.element = lazySuspense(
				<AuthRouter>
					<item.element />
				</AuthRouter>
			);
		}
		// children
		if (!isEmpty(item.children)) {
			res.children = compact(renderRoutes(item.children));
		}
		// 重定向
		if (item.redirect) {
			res.element = <Navigate to={item.redirect} replace />;
		}

		return res;
	});
};

// 路由注册
export default function SetUpRoutes() {
	console.log(
		compact(renderRoutes(routesConfig)),
		'renderRoutes(routesConfig)'
	);
	const element = useRoutes(compact(renderRoutes(routesConfig)));
	return element;
}
