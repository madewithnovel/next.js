import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from 'components/ui/input-otp';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import { useState } from 'react';

export default function OTPInput ({ name, onChange, ...props }) {
	const [value, setValue] = useState('');

	function change (value) {
		setValue(value);
		onChange({ target: { name, value } });
	}

	return (
		<InputOTP {...props} maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS} value={value} onChange={(value) => change(value)}>
			<InputOTPGroup>
				<InputOTPSlot index={0} />
				<InputOTPSlot index={1} />
				<InputOTPSlot index={2} />
				<InputOTPSlot index={3} />
				<InputOTPSlot index={4} />
				<InputOTPSlot index={5} />
			</InputOTPGroup>
		</InputOTP>
	);
}
