'use client';

import * as novel from 'novel/sdk';
import {useForm} from 'react-hook-form';
import {redirect} from 'next/navigation';

export default function Form() {
	const {register, handleSubmit} = useForm();

	async function submit(data) {
		const {email, password} = data;
		const response = await novel.auth.login({email, password});
		if (response.redirect_to) {
			redirect(response.redirect_to);
		}
	}

	return (
		<div>
			<form action={handleSubmit(submit)} className="flex flex-col gap-5">
				<div>Email</div>
				<input type="email" className="input md" {...register('email')} />
				<button className="bg-black text-white px-3 py-3" type="submit">Reset password</button>
			</form>
		</div>
	);
}