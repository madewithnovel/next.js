'use client';

import { notify } from 'components/elements/toast';
import { GithubIcon } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import * as novel from 'novel/sdk';
import { useForm } from 'react-hook-form';

export default function Form () {
	const { register, handleSubmit } = useForm();

	async function submit (data) {
		const { email, password } = data;
		const response = await novel.auth.login({ email, password });
		if (response.redirected === true) {
			redirect(response.url);
		} else {
			// update error
			// setError();
			notify('error', 'Invalid email or password');
		}
	}

	return (
		<form action={handleSubmit(submit)} className="flex flex-col gap-5">
			<div>
				<Link
					href={novel.api('/auth/github')}
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
			<input type="email" className="input md" {...register('email')} />
			<div className="flex items-center justify-between">
				Password
				<Link href="/login/forget">Forgot your password?</Link>
			</div>
			<input type="password" className="input md" {...register('password')} />
			<button className="bg-black text-white px-3 py-3" type="submit">Continue</button>
		</form>
	);
}
