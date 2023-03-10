// 以根据自身后台系统进行修改
export interface HttpResponse<T = unknown> {
	status: number;
	message: string;
	data: T;
}
export interface IResponseData<T = any> {
	status: number;
	message: string;
	data: T;
	success: boolean;
}
