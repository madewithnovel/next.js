'use client';

import cx from 'classnames';
import AlertOk from 'components/elements/alerts/ok';
import Button from 'components/elements/button';
import { GithubIcon, TriangleAlertIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import * as novel from 'novel/sdk';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import AlertWarning from '@/components/elements/alerts/warning';

export default function Form () {
	const query = useSearchParams();
	const router = useRouter();
	const [working, isWorking] = useState(false);
	const { register, handleSubmit, setError, setFocus, formState: { errors } } = useForm();

	async function submit (data) {
		isWorking(true);
		const { email, password } = data;
		const response = await novel.rpc.postAuthStrategy('password', { email, password });
		if (response.ok) {
			const data = await response.json();
			if (data.redirect_to) {
				const callback = await novel.request.get(data.redirect_to);
				router.push(callback.url);
			}
		} else {
			const data = await response.json();
			setError('email', { type: 'custom', message: data.error.message });
			setFocus('email');
		}
		isWorking(false);
	}

	return (
		<form action={handleSubmit(submit)} className="flex flex-col gap-5">
			{query.has('reset') && (
				<AlertOk title="Password has been reset">
					Account has been reset to have the new password. Please Log in again.
				</AlertOk>
			)}
			{query.has('verified') && (
				<AlertOk title="Account verification successful">
					This account has been verified and can now be used. You can log in to continue.
				</AlertOk>
			)}
			{query.has('error') && (
				<AlertWarning title="Authentication failed">
					{(() => {
						switch (query.get('error')) {
						case 'REGISTRATION_REQUIRED':
							return 'You need to have an account before you can login with your social account.';
						case 'AUTH_ATTEMPT_EXPIRED':
							return 'Something went wrong while trying to log you in. Please try again.';
						}
					})()}
				</AlertWarning>
			)}
			<div>
				<Link
					href={novel.path('/auth/github')}
					className="border border-stone-200 px-3 py-2 block text-center flex items-center justify-center gap-2"
				>
					<GithubIcon size={20}/>
					Continue with Github
				</Link>
			</div>
			<div className="flex items-center justify-between text-sm text-stone-500">
				<hr className="w-full"/>
				<div className="px-2">OR</div>
				<hr className="w-full"/>
			</div>
			<div>Email</div>
			<input type="email" className={cx('input md', { error: !!errors.email || !!errors.password })} {...register('email')} />
			<div className="flex items-center justify-between">
				Password
				<Link href="/login/forget">Forgot your password?</Link>
			</div>
			<input type="password" className={cx('input md', { error: !!errors.email || !!errors.password })} {...register('password')} />
			{errors.email && (
				<div className="text-red-500 text-sm flex gap-2">
					<TriangleAlertIcon className="shrink-0 mt-1" size={20}/>
					{errors.email.message}
				</div>
			)}
			<Button working={working} className="button action" type="submit">Continue</Button>
		</form>
	);
}
