'use client';

import { Transition } from '@headlessui/react';
import cx from 'classnames';
import { CheckCircle2Icon } from 'lucide-react';
import { forwardRef, Fragment, useEffect } from 'react';

type Props = {
	saved: boolean;
	leave: (value: boolean) => void;
	duration?: number;
}

export default forwardRef(function InlineNotify (props: Props, ref) {
	const { saved, leave, duration } = props;
	useEffect(() => {
		let timeout;
		if (saved === true && leave) {
			timeout = setTimeout(() => {
				leave(false);
				clearTimeout(timeout);
			}, duration ?? 6000);
		}
		return () => {
			clearTimeout(timeout);
			timeout = null;
		};
	}, [saved]);

	return (
		<Transition
			show={saved}
			as={Fragment}
			enter="transition-opacity duration-150"
			enterFrom="opacity-0"
			enterTo="opacity-100"
			leave="transition-opacity duration-150"
			leaveFrom="opacity-100"
			leaveTo="opacity-0"
		>
			<div ref={ref}
				className={cx('flex items-center gap-1 text-green-600 shrink-0', saved ? 'animate-enter' : 'animate-leave')}>
				<CheckCircle2Icon className="shrink-0" size={14}/>
				{' '}
				Saved
			</div>
		</Transition>
	);
});
