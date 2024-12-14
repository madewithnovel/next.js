'use client';

import postAuthResetRequest from 'app/api/requests/postAuthReset';
import cx from 'clsx';
import Button from 'components/elements/button';
import Input from 'components/elements/input';
import { TriangleAlertIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function Form () {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [working, isWorking] = useState(false);
	const { register, handleSubmit, setError, setFocus, formState: { errors } } = useForm();

	async function submit (data) {
		isWorking(true);
		if (!searchParams.get('token')) {
			isWorking(false);
			setFocus('email');
			return setError('email', { type: 'manual', message: 'There is no token available for this reset attempt. Please request a new password reset attempt.' });
		}
		if (data.password !== data.password_confirm) {
			isWorking(false);
			setFocus('password_confirm');
			return setError('email', { type: 'manual', message: 'Passwords given for both do not match. Please enter the same passwords on both fields.' });
		}
		if (!data.email || !data.password || !data.password_confirm) {
			isWorking(false);
			setFocus('email');
			return setError('email', { type: 'manual', message: 'There are required fields missing. Please enter everything needed for these form.' });
		}
		const { email, password } = data;
		const response = await postAuthResetRequest({ email, password, token: searchParams.get('token') });
		isWorking(false);
		if (response.ok) {
			router.push('/login?reset');
		} else {
			const data = await response.json();
			setFocus('password');
			setError('email', { type: 'manual', message: data.error.message });
		}
	}

	return (
		<div>
			<form action={handleSubmit(submit)} className="flex flex-col gap-5">
				<div>Email</div>
				<Input type="email" className={cx({ error: !!errors.email || !!errors.password_confirm })} {...register('email', { required: true })} />
				<div>New Password</div>
				<Input type="password" className={cx({ error: !!errors.email || !!errors.password_confirm })} {...register('password', { required: true })} />
				<div>Confirm Password</div>
				<Input type="password" className={cx({ error: !!errors.email || !!errors.password_confirm })}{...register('password_confirm', { required: true })} />
				{errors.email && (
					<div className="text-red-500 text-sm flex gap-2">
						<TriangleAlertIcon className="shrink-0 mt-0.5" size={20}/>
						{errors.email.type === 'required' ? 'Email address is required' : ''}
						{errors.email.message}
					</div>
				)}
				<Button working={working} type="submit">Reset Password</Button>
			</form>
		</div>
	);
}
