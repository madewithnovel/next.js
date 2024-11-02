'use client';

import './style.css';

import cx from 'clsx';
import { Button as ShadcnButton } from 'components/ui/button';
import { Loader2Icon } from 'lucide-react';
import { useRef } from 'react';

export default function Button (props) {
	const { children, className, disabled, working, ...rest } = props;
	const ref = useRef();
	return (
		<ShadcnButton {...rest} style={{ width: working && ref?.current ? ref.current?.offsetWidth : 'auto' }} ref={ref}
			className={cx('button', className, { working })} disabled={disabled || working}>
			{working && <Loader2Icon className="animate-spin"/>}
			{!working && children}
		</ShadcnButton>
	);
}
