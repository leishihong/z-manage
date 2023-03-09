import cls from 'classnames';
import welcome from 'assets/images/welcome.png';

import cx from './index.module.less';

const Welcome = () => {
	return (
		<div className={cls(cx['welcome'], cx['card'])}>
			<img src={welcome} />
		</div>
	);
};

export default Welcome;
