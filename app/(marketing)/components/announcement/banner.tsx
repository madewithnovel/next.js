import './style.css';

import cx from 'clsx';

export default function AnnouncementBanner ({ children, ...props }) {
	return (
		<div {...props} className={cx('announcement', props.className)}>
			{children}
		</div>
	);
}
