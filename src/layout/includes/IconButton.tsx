import { forwardRef, memo } from 'react';
import { Button } from 'antd';
import styles from '../style/icon-button.module.less';
import cls from 'classnames';

const IconButton = forwardRef(
	(props: { [x: string]: any; icon: any; className: any }, ref: any) => {
		const { icon, className, ...rest } = props;

		return (
			<Button
				ref={ref}
				icon={icon}
				shape="circle"
				className={cls(styles['icon-button'], className)}
				{...rest}
			/>
		);
	}
);

export default memo(IconButton);
