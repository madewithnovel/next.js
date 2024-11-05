'use client';

import cx from 'classnames';
import { ClipboardIcon } from 'lucide-react';
import { useRef } from 'react';

import { notify } from '../toast';

export default function Copybox (props) {
	const children = props.children;
	const value = props.value;
	const ref = useRef(null);
	const notified = useRef(false);

	async function copy (event) {
		event.preventDefault();
		event.stopPropagation();
		const { state } = await navigator.permissions.query({ name: 'clipboard-write' });
		if (state !== 'denied' && navigator.clipboard.writeText) {
			await navigator.clipboard.writeText(value || ref.current.innerText);
			notify('Copied to clipboard');
		}

		if (state === 'denied' && notified.current === false) {
			notify('warn', 'Cannot copy to clipboard', ['Your browser requires permission to write to your clipboard.', 'You can allow the request shown in your browser now or ignore it and manually copy the text you need.']);
			if (navigator.permissions.request) {
				await navigator.permissions.request({ name: 'clipboard-write' });
			}
			notified.current = true;
		}
	}

	return (
		<div {...props} ref={ref} onClick={(e) => copy(e)} className={cx('flex h-10 bg-muted justify-between w-full rounded-md border border-input bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50', props.className)}>
			<div>
				{children}
			</div>
			<ClipboardIcon size={19} className="text-muted-foreground"/>
		</div>
	);
}
