'use client';

import cx from 'clsx';
import Button from 'components/elements/button';
import Input from 'components/elements/input';
import Select from 'components/elements/select';
import { Card, getCustomerIntent, StripeProvider, useElements, useStripe } from 'components/stripe/checkout';
import { TriangleAlertIcon } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import * as novel from 'novel/sdk';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function Form ({ plans }) {
	return (
		<StripeProvider>
			<FormSteps plans={plans}/>
		</StripeProvider>
	);
}

function FormSteps ({ plans }) {
	const stripe = useStripe();
	const elements = useElements();
	const query = useSearchParams();
	const [working, isWorking] = useState(false);
	const [submitted, isSubmitted] = useState(false);

	// this is required for select to work
	const form = useForm({ defaultValues: { plan: plans?.[0].id } });
	const { register, handleSubmit, setError, setFocus, formState: { errors } } = form;

	useEffect(() => {
		if (!plans?.length) {
			novel.rpc.SubscriptionsPlans().then((response) => response.json()).then((data) => {
				form.setValue('plan', data.plans[0].id);
				plans;
			});
		}
	}, []);

	async function submit (data) {
		isWorking(true);

		/**
		 * Handle the payment intent by creating a customer in the backend
		 *
		 * You can customize the interval to be available in the front end as well.
		 */
		const plan = data.plan ?? 'standard-2024';
		const interval = 'month';
		let method;
		let intent = await getCustomerIntent(plan, stripe, elements);
		if (intent.error) {
			isWorking(false);
			const error = intent.error;
			return setError('email', { type: 'manual', message: error.message });
		} else {
			method = intent.payment_method;
			intent = intent.id;
		}

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
		const response = await novel.rpc.AuthSignup({ email, password, interval, intent, plan, method, invitation_code });
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
						<form action={handleSubmit(submit)} className="flex flex-col gap-5">
							<div>Email</div>
							<Input type="text" className={cx({ error: !!errors.email || !!errors.password })} {...register('email', { required: true })} />
							<div>Password</div>
							<Input type="password" className={cx({ error: !!errors.email || !!errors.password })} {...register('password')} />
							<div>Plan</div>
							<div>
								<Select
									form={form}
									className="w-full"
									defaultValue={plans[0].id}
									options={plans.map((plan) => ({ value: plan.id, label: plan.name }))}
									{...register('plan')}
								/>
							</div>
							<div>Credit Card</div>
							<div>
								<Card className="input"/>
							</div>
							{errors.email && (
								<div className="text-red-500 text-sm flex gap-2">
									<TriangleAlertIcon className="shrink-0 mt-0.5" size={20}/>
									{errors.email.type === 'required' ? 'Email address is required' : ''}
									{errors.email.message}
								</div>
							)}
							<Button working={working} type="submit">Subscribe</Button>
						</form>
					</div>
					<div>
						<div>Have an account? <Link href="/login">Sign in with your email</Link></div>
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
