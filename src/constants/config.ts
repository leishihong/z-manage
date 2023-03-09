interface IKey {
	[key: string]: any;
}
export const genderConfig: IKey = { 1: '男', 2: '女' };

// 社团类型
export const communityTypeConfig: IKey = {
	0: '普通社团',
	1: '口碑商家',
};
// 活动状态
export const activityStatusConfig: IKey = {
	0: '进行中',
	1: '报名中',
	2: '已结束',
	3: '已取消',
};
// 活动归属类型
export const activityMethodsConfig: IKey = {
	0: '个人活动',
	2: '官方活动',
	1: '社团活动',
};

export const dateWeekListConfig: string[] = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

// ? 全局不动配置项 只做导出不做修改

// * 首页地址（默认）
export const WELCOME_URL = '/welcome';

// * Tabs（黑名单地址，不需要添加到 tabs 的路由地址，暂时没用）
export const TABS_BLACK_LIST: string[] = ['/403', '/404', '/500', '/layout', '/login'];

