'use client';

import * as novel from 'novel/sdk';
import {useForm} from 'react-hook-form';
import {redirect, useSearchParams} from 'next/navigation';

export default function Form() {
	// get search params from next router
	const searchParams = useSearchParams();
	const {register, handleSubmit, setError} = useForm();

	async function submit(data) {
		if (!searchParams.get('token')) {
			return setError('token', {type: 'manual', message: 'No token provided'});
		}
		if (data.password !== data.password_confirm) {
			return setError('password_confirm', {type: 'manual', message: 'Passwords do not match'});
		}
		const {email, password} = data;
		await novel.user.reset({email, password, token: searchParams.get('token')});
		redirect('/login/reset/ok');
	}

	return (
		<div>
			<form action={handleSubmit(submit)} className="flex flex-col gap-5">
				<div>Email</div>
				<input type="email" className="input md" {...register('email')} />
				<div>New Password</div>
				<input type="password" className="input md" {...register('password')}  />
				<div>Confirm Password</div>
				<input type="password" className="input md" {...register('password_confirm')}  />
				<button className="bg-black text-white px-3 py-3" type="submit">Reset password</button>
			</form>
		</div>
	);
}