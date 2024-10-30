'use client';

import { redirect } from 'next/navigation';
import * as novel from 'novel/sdk';
import { useForm } from 'react-hook-form';

export default function Form () {
	const { register, handleSubmit } = useForm();

	async function submit (data) {
		const { email } = data;
		await novel.rpc.AuthPasswordless({ email });
		redirect('/login/passwordless/ok');
	}

	return (
		<div>
			<form action={handleSubmit(submit)} className="flex flex-col gap-5">
				<div>Email</div>
				<input type="email" className="input md" {...register('email')} />
				<button className="bg-black text-white px-3 py-3" type="submit">Continue with your Email</button>
			</form>
		</div>
	);
}
