'use client';

import { CardElement, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js/pure';
import postAuthPaymentIntentRequest from 'app/api/requests/postAuthPaymentIntent';

export { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

const cardStyle = {
	/**
	 * WIP
	 *
	 * Design needs to be added here manually
	 */
	style: {
		base: {
			color: 'color(--foreground)',
			borderColor: 'color(--border)',
			fontSize: '16px',
			'::placeholder': {
				color: 'color(--foreground)',
			},
		},
		invalid: {
			color: '#fa755a',
			iconColor: '#fa755a',
		},
	},
};

export async function getCustomerIntent (plan, stripe, elements, org_id = null) {
	const response = await postAuthPaymentIntentRequest({ plan, org_id });
	const setupIntent = await response.json();
	const card = elements.getElement(CardElement);
	try {
		const confirm = await stripe.confirmCardSetup(setupIntent.intent.client_secret, { payment_method: { card } });
		if (confirm.error) {
			return { error: confirm?.error };
		} else if (confirm.setupIntent?.status === 'succeeded') {
			return confirm.setupIntent;
		}
		return { error: { message: 'Something went wrong with your card' } };
	} catch (error) {
		return { error };
	}
}

export function StripeProvider ({ children }) {
	const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_TOKEN);
	return (
		<Elements stripe={stripe}>
			{children}
		</Elements>
	);
}

export function Card (props) {
	const { className, onChange, onLoadError } = props;
	// https://docs.stripe.com/payments/card-element
	return (
		<div className={className}>
			<CardElement
				id="card-element"
				options={cardStyle}
				onChange={onChange}
				onLoadError={onLoadError}
			/>
		</div>
	);
}
