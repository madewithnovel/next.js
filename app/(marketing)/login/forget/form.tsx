'use client';

import cx from 'classnames';
import AlertInfo from 'components/elements/alerts/info';
import Button from 'components/elements/button';
import { TriangleAlertIcon } from 'lucide-react';
import Link from 'next/link';
import * as novel from 'novel/sdk';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function Form () {
	const [working, isWorking] = useState(false);
	const [submitted, isSubmitted] = useState(false);
	const { register, handleSubmit, watch, setError, setFocus, formState: { errors } } = useForm();

	async function submit (data) {
		isWorking(true);
		const { email } = data;
		const response = await novel.rpc.postAuthForgot({ email });
		if (!response.ok) {
			const data = await response.json();
			setError('email', { type: 'custom', message: data.error.message });
			setFocus('email');
		}
		isSubmitted(true);
		isWorking(false);
	}

	return (
		<>
			{!submitted && (
				<>
					<div>
						<div className="text-3xl font-medium">Forgot your Password?</div>
						<div className="text-lg">Enter your email address and we'll send you a link to reset your password</div>
					</div>
					<form action={handleSubmit(submit)} className="flex flex-col gap-5">
						<div>Email</div>
						<input type="email" className={cx('input md', { error: !!errors.email })} {...register('email')} />
						{errors.email && (
							<div className="text-red-500 text-sm flex gap-2">
								<TriangleAlertIcon className="shrink-0 mt-1" size={20}/>
								{errors.email.message}
							</div>
						)}
						<Button working={working} className="button action" type="submit">Reset your Password</Button>
					</form>
					<div>Have an account? <Link href="/login">Sign in with your email</Link></div>
					<hr/>
					<div>
						If you don’t see your reset link be sure to check your spam filter for an email from
						noreply@novel.dev
					</div>
				</>
			)}
			{submitted && (
				<AlertInfo title="Check your email for your reset link">
					<p>We’ve sent a link to {watch('email')} that works only for this browser. The link expires shortly, so please click on it soon.</p>
				</AlertInfo>
			)}
		</>
	);
}
