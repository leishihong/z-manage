export interface MetaProps {
	keepAlive?: boolean;
	requiresAuth?: boolean;
	title: string;
	icon?: string;
	key?: string;
	[key: string]: any;
}

export interface RouteObject {
	path: string;
	name?: string;
	element?: ReactNode | LazyExoticComponent<() => JSX.Element>;
	children?: Array<RouteObject>;
	redirect?: string;
	meta?: MetaProps;
  isLink?: string;
  [key: string]: any;
}
