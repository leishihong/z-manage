import { Modal } from 'antd';

export const useModalConfirm = () => {
	const modalConfirm = (
		props: any,
		callback: (ctx: (status?: string) => void) => void
	) => {
		const {
			content,
			type = 'confirm',
			title = '温馨提示',
			okText = '确定',
			cancelText = '取消',
			...resetProps
		} = props;
		Modal.confirm({
			title,
			content,
			okText,
			cancelText,
			...resetProps,
			onOk: () => {
				return new Promise<void>(async (resolve, reject) => {
					await callback((status) => {
						if (status === 'success') {
							resolve();
						} else {
							reject();
						}
					});
				});
			}
		});
	};

	return { modalConfirm };
};
