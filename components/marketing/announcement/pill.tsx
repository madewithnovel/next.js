import cx from 'classnames';
import Link from 'next/link';

export default function AnnouncementPill ({ children, href, ...props }) {
	return (
		<Link href={href} {...props} className="flex justify-center mb-5">
			<div className={cx('text-nowrap border border-zinc-200 hover:border-zinc-400 rounded-full px-3 py-1 5 text-zinc-800 text-sm', props.className)}>
				{children}
			</div>
		</Link>
	);
}
