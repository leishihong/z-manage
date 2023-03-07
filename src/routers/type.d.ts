export interface IRouteType {
	path: string;
	name: string;
	index?: number;
  element?: ReactNode | LazyExoticComponent<() => JSX.Element>;
	elementName?: string;
	children?: Array<IRouteType>;
	meta?: {
		title?: string;
		title?: string;
		icon?: string;
		requiresAuth?: boolean;
		[key: string]: any;
	};
	redirect?: string;
}
