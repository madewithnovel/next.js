'use client';

import * as novel from '@novel/next/sdk';
import postAuthSignupRequest, { Request } from 'app/api/requests/postAuthSignup';
import cx from 'clsx';
import Button from 'components/elements/button';
import Input from 'components/elements/input';
import { GithubIcon, TriangleAlertIcon } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function Form () {
	const query = useSearchParams();
	const [working, isWorking] = useState(false);
	const [submitted, isSubmitted] = useState(false);
	const { register, handleSubmit, setError, setFocus, formState: { errors } } = useForm<Request>();

	async function submit (data) {
		isWorking(true);
		/**
		 * Handle the payment intent by creating a customer in the backend
		 *
		 * You can customize the interval to be available in the front end as well.
		 */
		const plan = query.get('plan') ?? 'standard-2024';
		const interval = query.get('interval') === 'year' ? 'year' : 'month';

		/**
		 * Check the validity of the input, you can use zod here
		 */
		const { email, password } = data;
		if (password.length === 0) {
			isWorking(false);
			setFocus('password');
			return setError('email', { type: 'manual', message: 'Please provide a memorable password.' });
		}
		const invitation_code = query.get('invite');

		/**
		 * Send the request to the backend
		 */
		const response = await postAuthSignupRequest({ email, password, plan, interval, invitation_code });
		isWorking(false);
		if (response.ok) {
			const data = await response.json();
			if (data.redirect_to) {
				isSubmitted(true);
			}
		} else {
			const data = await response.json();
			setError('email', { type: 'custom', message: data.error.message });
			setFocus('email');
		}
	}

	return (
		<>
			{!submitted && (
				<>
					<div>
						<div className="text-3xl font-medium">First, your email address</div>
						<p className="text-lg">
							Please provide a business email if you have one
						</p>
					</div>
					<div>
						<form onSubmit={handleSubmit(submit)} className="flex flex-col gap-5">
							<div>Email</div>
							<Input type="text" className={cx({ error: !!errors.email || !!errors.password })} {...register('email', { required: true })} />
							<div>Password</div>
							<Input type="password" className={cx({ error: !!errors.email || !!errors.password })} {...register('password')} />
							{errors.email && (
								<div className="text-red-500 text-sm flex gap-2">
									<TriangleAlertIcon className="shrink-0 mt-0.5" size={20}/>
									{errors.email.type === 'required' ? 'Email address is required' : ''}
									{errors.email.message}
								</div>
							)}
							<Button working={working} type="submit">Continue</Button>
							<div className="flex items-center justify-between text-sm text-stone-500">
								<hr className="w-full"/>
								<div className="px-2">OR</div>
								<hr className="w-full"/>
							</div>
							<div>
								<Link
									href={novel.path('/auth/github')}
									className="button secondary w-full"
								>
									<GithubIcon size={20}/>
									Continue with Github
								</Link>
							</div>
						</form>
					</div>
					<div>
						<div>Have an account? <Link href="/login">Sign in with your email</Link></div>
						<div>Want to pay upfront? <Link href="/signup/upfront">Pay upfront</Link></div>
					</div>
					<div className="text-sm">
						By creating an account, you agree to Novel's <Link href="/legal/terms">Terms of Use</Link>{' '}
						and consent to Novel's <Link href="/legal/privacy">Privacy Statement</Link>.
					</div>
				</>
			)}
			{submitted && (
				<div className="bg-white flex flex-col items-center justify-center p-4">
					<div className="max-w-md w-full space-y-8">
						<div className="space-y-2">
							<h1 className="text-4xl font-medium tracking-tight text-black">Welcome aboard!</h1>
							<p className="text-xl">We're excited to have you join us.</p>
						</div>
						<hr/>
						<p className="text-zinc-600">
							Your account has been successfully created. We have sent you a verification email. From there you can continue to use Novel.
						</p>

						<Link href="/dashboard" className="button">
							Get Started
						</Link>
					</div>
				</div>
			)}
		</>
	);
}
