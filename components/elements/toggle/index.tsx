'use client';

import cx from 'classnames';
import { Switch } from 'components/ui/switch';
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
			onCheckedChange={(value) => {
				if (props.onChange) {
					props.onChange({ target: { name: props.name, value } });
				}
				setEnabled(value);
			}}
			className={cx(
				enabled ? 'bg-stone-600' : 'bg-stone-200',
				props.disabled ? 'opacity-75 bg-stone-200' : 'cursor-pointer',
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
