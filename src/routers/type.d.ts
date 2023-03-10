export interface MetaProps {
	keepAlive?: boolean;
	hideInMenu?: boolean;
	requiresAuth?: boolean;
	title: string;
	icon?: string;
	key?: string;
	[key: string]: any;
}

export interface RouteObject {
	path?: string;
	name?: string;
	index?: boolean;
	element?: ReactNode | LazyExoticComponent<() => JSX.Element>;
	children?: RouteObject[];
	redirect?: string;
	meta?: MetaProps;
	isLink?: string;
	[key: string]: any;
}
