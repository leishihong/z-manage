import { ReactNode, FC, Fragment } from 'react';
import { isEmpty, map, compact } from 'lodash';
import { stringify } from 'query-string';

import { Lazy } from 'utils/lazy';
import { store } from 'store/index';

import { IRouteType } from './type';
import routesConfig from './AppRouter';

const renderRoutes = (routes: Array<IRouteType>) => {
	return map(routes, (item: IRouteType & any) => {
		const res: any = { ...item };
		if (!item?.path) return;
		if (item.element) {
			res.element = Lazy(
				<BeforeEach route={item}>
					<item.element />
				</BeforeEach>
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

interface IProps {
	route: IRouteType;
	children: ReactNode;
}
const defaultProps = {
	route: {
		meta: {
			title: ''
		}
	}
} as IProps;

export const BeforeEach: FC<Partial<IProps>> = (props) => {
	const { route } = { ...defaultProps, ...props };
	const { pathname, search } = useLocation();
	const navigate = useNavigate();
	const { token } = store.getState().loginState;
	const redirectParams = {
		search,
		redirect: encodeURIComponent(window.location.href)
	};
	if (route?.meta?.title) {
		document.title = route.meta.title;
	}
	// 看是否登录 requiresAuth && token
	if (route?.meta?.requiresAuth && !token) {
		navigate(`/login?${stringify(redirectParams)}`, { replace: true });
		// <Navigate to={`/login?${stringify(redirectParams)}`} replace />;
	}
	return <Fragment>{props.children}</Fragment>;
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
