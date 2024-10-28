'use client';

import { GithubIcon } from 'lucide-react';
import Link from 'next/link';
import { redirect, useSearchParams } from 'next/navigation';
import * as novel from 'novel/sdk';
import { useForm } from 'react-hook-form';

export default function Form () {
	const { register, handleSubmit } = useForm();
	const params = useSearchParams();

	async function submit (data) {
		const { email, password } = data;
		const invitation_code = params.invite;
		const response = await novel.user.register({ email, password, invitation_code });
		/**
		 * Based on your signup flow, this would redirect to the welcome page or to
		 * the dashboard, already authenticated.
		 */
		return redirect(response.redirect_to);
	}

	return (
		<div>
			<form action={handleSubmit(submit)} className="flex flex-col gap-5">
				<div>Email</div>
				<input type="text" className="input md" {...register('email')} />
				<div>Password</div>
				<input type="password" className="input md" {...register('password')} />
				<button className="bg-black text-white px-3 py-3" type="submit">Continue</button>
				<div className="flex items-center justify-between text-sm text-stone-500">
					<hr className="w-full"/>
					<div className="px-2">OR</div>
					<hr className="w-full"/>
				</div>
				<div>
					<Link
						href={novel.api('/auth/github')}
						className="border border-stone-200 px-3 py-2 block text-center flex items-center justify-center gap-2"
					>
						<GithubIcon size={20}/>
						Continue with Github
					</Link>
				</div>
			</form>
		</div>
	);
}
