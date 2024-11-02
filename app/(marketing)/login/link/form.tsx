'use client';

import cx from 'clsx';
import Button from 'components/elements/button';
import Input from 'components/elements/input';
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
		const response = await novel.rpc.postAuthStrategy('passwordless', { email });
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
						<div className="text-3xl font-medium">Login with your Email Address</div>
						<div className="text-lg">Enter your email address and we'll send you a link to login.</div>
					</div>
					<form action={handleSubmit(submit)} className="flex flex-col gap-5">
						<div>Email</div>
						<Input type="email" className={cx({ error: !!errors.email })} {...register('email', { required: true })} />
						{errors.email && (
							<div className="text-red-500 text-sm flex gap-2">
								<TriangleAlertIcon className="shrink-0 mt-0.5" size={20}/>
								{errors.email.type === 'required' ? 'Email address is required' : ''}
								{errors.email.message}
							</div>
						)}
						<Button working={working} type="submit">Continue with your Email</Button>
					</form>
					<div>Have an account? <Link href="/login">Sign in with your email</Link></div>
					<hr/>
					<div>
						If you don’t see your login link be sure to check your spam filter for an email from
						noreply@novel.dev
					</div>
				</>
			)}
			{submitted && (
				<div className="bg-white flex flex-col items-center justify-center">
					<div className="max-w-md w-full space-y-8">
						<div className="space-y-2">
							<h1 className="text-3xl font-medium tracking-tight text-black">Check your email for your magic link.</h1>
						</div>
						<hr/>
						<p className="text-zinc-600">
							We’ve sent an authentication link to {watch('email')} that works only for this browser. The link expires shortly, so please click on it soon.
						</p>
					</div>
				</div>
			)}
		</>
	);
}
