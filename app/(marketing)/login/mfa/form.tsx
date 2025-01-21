'use client';

import postAuthMfaRequest, { Request } from 'app/api/requests/postAuthMfa';
import cx from 'clsx';
import Button from 'components/elements/button';
import { TriangleAlertIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import OTPInput from '@/components/elements/input/otp';

export default function Form () {
	const query = useSearchParams();
	const router = useRouter();
	const [working, isWorking] = useState(false);
	const { register, handleSubmit, setError, setFocus, formState: { errors } } = useForm<Request>();

	async function submit (data) {
		isWorking(true);
		const response = await postAuthMfaRequest(query.get('strategy'), { otp: data.otp });
		if (response.ok) {
			isWorking(false);
			if (response.redirected === true) {
				if (response.url.includes('MFA_OTP_INVALID')) {
					setError('otp', { type: 'custom', message: ' The OTP provided is not a valid token based on the registered authenticator. Please try again.' });
					return setFocus('otp');
				}
				return router.replace(response.url);
			}
			setError('otp', { type: 'custom', message: 'Something happened while trying to verify your OTP. Please try again.' });
			setFocus('otp');
		} else {
			const data = await response.json();
			isWorking(false);
			setError('otp', { type: 'custom', message: data.error.message });
			setFocus('otp');
		}
	}

	return (
		<form onSubmit={handleSubmit(submit)}>
			<div className="flex items-center gap-2">
				<OTPInput className={cx({ error: errors.otp })} {...register('otp')} />
				<Button working={working} type="submit">Continue</Button>
			</div>
			{errors.otp && (
				<div className="mt-5 text-red-500 text-sm flex gap-2">
					<TriangleAlertIcon className="shrink-0 mt-0.5" size={20}/>
					{errors.otp.message}
				</div>
			)}
		</form>
	);
}
