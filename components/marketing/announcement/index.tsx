import './style.css';

import cx from 'classnames';

export default function Announcement ({ children, ...props }) {
	return (
		<div {...props} className={cx('announcement', props.className)}>
			{children}
		</div>
	);
}
