'use client';

import './style.css';

import cx from 'classnames';
import { Loader2Icon } from 'lucide-react';
import { useRef } from 'react';

export default function Button (props) {
	const { children, className, disabled, working, ...rest } = props;
	const ref = useRef();
	return (
		<button {...rest} style={{ width: working && ref?.current ? ref.current?.offsetWidth : 'auto' }} ref={ref}
			className={cx('button', className, { working })} disabled={disabled || working}>
			{working && <Loader2Icon className="animate-spin"/>}
			{!working && children}
		</button>
	);
}
