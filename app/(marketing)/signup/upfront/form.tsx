'use client';

import StripeCheckout from 'components/stripe-checkout';
import { CheckCircle2Icon, CircleIcon } from 'lucide-react';
import * as novel from 'novel/sdk';
import { useForm } from 'react-hook-form';

export default function Form () {
	const { register, handleSubmit } = useForm();

	async function submit (data) {
		const { identifier, password } = data;
		await novel.user.register({ identifier, password });
	}

	return (
		<div>
			<form action={handleSubmit(submit)} className="flex flex-col gap-5">
				<div>Email</div>
				<input type="text" className="input md" {...register('identifier')} />
				<div>Password</div>
				<input type="password" className="input md" {...register('password')} />
				<div>Select Plan</div>
				<div>Credit Card</div>
				<StripeCheckout className="input" product={{
					mode: 'payment',
					amount: 850,
					currency: 'usd',
				}}/>
				<button className="bg-black text-white px-3 py-3" type="submit">Continue</button>
			</form>
		</div>
	);
}
