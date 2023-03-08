import { ReactNode, FC, Fragment } from 'react';
import { isEmpty, map, compact } from 'lodash';
import { stringify } from 'query-string';

import { lazySuspense } from 'utils/lazy';
import { store } from 'store/index';
import { RouteObject } from './type';

/**
 * @description 路由守卫组件
 * */

interface IProps {
	route: RouteObject;
	children: ReactNode;
}
const defaultProps = {
	route: {
		meta: {
			title: ''
		}
	}
} as IProps;

const AuthRouter: FC<Partial<IProps>> = (props) => {
	const { route } = { ...defaultProps, ...props };
	const { pathname, search } = useLocation();
	const navigate = useNavigate();
	const { token } = store.getState().loginState;
	const redirectParams = {
		search,
		redirect: encodeURIComponent(window.location.href)
	};
	if (route?.meta?.title) document.title = route.meta.title;
	// 判断当前路由是否需要访问权限(不需要权限直接放行)
	if (!route.meta?.requiresAuth) return <Fragment>{props.children}</Fragment>;
	// 判断是否有Token
	if (!token) {
		// navigate(`/login?${stringify(redirectParams)}`, { replace: true });
		return <Navigate to={`/login?${stringify(redirectParams)}`} replace />;
	}
	// 当前账号有权限返回 Router，正常访问页面
	return <Fragment>{props.children}</Fragment>;
};

export default AuthRouter;
