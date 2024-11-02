'use client';

import { Switch } from '@headlessui/react';
import cx from 'clsx';
import { forwardRef, useState } from 'react';

interface Props {
	checked?: boolean;
	name?: string;
	disabled?: boolean;
	onChange: (e: InputEvent) => void;
	className?: string | Record<string, unknown>;
}

export default forwardRef(function Toggle (props: Props, ref) {
	const [enabled, setEnabled] = useState(props.checked === true);

	return (
		<Switch
			name={props.name}
			ref={ref}
			checked={enabled}
			disabled={props.disabled}
			onChange={(value) => {
				if (props.onChange) {
					props.onChange({ target: { name: props.name, value } });
				}
				setEnabled(value);
			}}
			className={cx(
				enabled ? 'bg-stone-600' : 'bg-stone-200',
				props.disabled ? 'opacity-75 bg-stone-200' : 'cursor-pointer',
				'relative inline-flex h-6 w-11 flex-shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-stone-600 focus:ring-offset-2',
				props.className ? { ...props.className } : null,
			)}
		>
			<span
				aria-hidden="true"
				className={cx(
					enabled ? 'translate-x-5' : 'translate-x-0',
					'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
				)}
			/>
		</Switch>
	);
});
