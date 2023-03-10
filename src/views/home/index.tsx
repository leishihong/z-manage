import { Card } from 'antd';

import cls from 'classnames';
import welcome from 'assets/images/welcome.png';

import cx from './index.module.less';

const Welcome = () => {
	return (
		<Card className={cx['card']}>
			<div className={cls(cx['welcome'], cx['card'])}>
				<img src={welcome} />
			</div>
		</Card>
	);
};

export default Welcome;
