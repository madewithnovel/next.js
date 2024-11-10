'use client';

import cx from 'clsx';
import AlertOk from 'components/elements/alerts/ok';
import AlertWarning from 'components/elements/alerts/warning';
import Button from 'components/elements/button';
import Input from 'components/elements/input';
import { GithubIcon, TriangleAlertIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import * as novel from 'novel/sdk';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import OTPInput from '@/components/elements/input/otp';

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
			<div>One Time Password</div>
			<OTPInput className={cx({ error: errors.password })} {...register('token')} />
			<Button working={working} variant="outline">Sign-out</Button>
			<Button working={working} type="submit">Continue</Button>
		</form>
	);
}
