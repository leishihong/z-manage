export interface GlobalState {
	settings: any;
	userInfo?: {
		name?: string;
		avatar?: string;
		job?: string;
		organization?: string;
		location?: string;
		email?: string;
		permissions: Record<string, string[]>;
	};
	isCollapsed: boolean;
	userLoading?: boolean;
	routerPrompt?: boolean;
	authRouter: any[];
	slideMenuList: Menu.MenuOptions[];
	authButtons: { [key: string]: any };
	breadcrumbList: { [key: string]: any };
	tagViewList: Menu.MenuOptions[];
}
