/**
 * @description 路由地址配置
 */
export const URL: { [key: string]: string } = {
	'system-settings': '/pagesUser/pages/system-settings/index',
	login: '/pagesUser/pages/login/index',
	'code-login': '/pagesUser/pages/code-login/index',
	'modify-info': '/pagesUser/pages/modify-info/index',
	'version-info': '/pagesUser/pages/version-info/index',
	cancellation: '/pagesUser/pages/cancellation/index',
	'scan-code': '/pagesWriteOff/pages/scan-code-write-off/index',

	'community-detail': '/pagesCommonDetails/pages/community-detail/index',
	'activity-detail': '/pagesCommonDetails/pages/activity-detail/index',
	'moka-detail': '/pagesCommonDetails/pages/moka-detail/index',
	'activity-order-payment': '/pagesCommonDetails/pages/activity-order-payment/index',

	'publish-activity': '/pagesPublishCreate/pages/publish-activity/index',
	'community-club': '/pagesPublishCreate/pages/community-club/index',
	'moka-manage': '/pagesPublishCreate/pages/moka-manage/index',

	'choose-city': '/pagesSubPackages/pages/choose-city/index',
	webview: '/pagesSubPackages/pages/webview/index',
	'capsule-activity': '/pagesSubPackages/pages/capsule-activity/index',
	'guide-place-authorized': '/pagesSubPackages/pages/guide-place-authorized/index',

	404: '/pagesNotfound/pages/404/index',
	land: '/pages/land/index',
};
/**
 * @description TabBar路由
 */
export const TAB = {
	home: '/pages/home-page/index',
	moka: '/pages/moka/index',
	activity: '/pages/activity/index',
	mine: '/pages/mine/index',
};
