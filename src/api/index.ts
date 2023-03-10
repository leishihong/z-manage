import { post } from "./config/request";

// 活动列表
export const fetchQueryActivityList = (params?: any) => post("manage/community/communityList", params);
