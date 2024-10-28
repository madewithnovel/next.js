'use client';

import { MinusIcon, PlusIcon } from 'lucide-react';
import { useState } from 'react';

const lines = [
	{
		headline: 'What am I getting exactly?',
		content: 'Still have questions about Novel? Book a call with our sales team today and we’ll show exactly how we can revolutionize the way your business handles global payments and sales tax forever.',
	},
	{
		headline: 'Do you offer refunds?',
		content: 'We offer a 30-day money-back guarantee. If you are not happy with the product, we will refund your purchase.',
	},
	{
		headline: 'I am not able to see my purchase, what\'s next?',
		content: 'If you are not able to see your purchase, please contact our support team at hello@madewithnovel.com',
	},
];

export default function Faqs () {
	const [active, setActive] = useState(0);
	return (
		<div className="container flex flex-col mx-auto px-10">
			<div className="text-6xl font-medium tracking-tight">Frequently Asked Questions</div>

			<div className="flex flex-col divide-y divide-stone-200">
				{lines.map((line, i) => (
					<div key={`i${i}`} className="flex flex-col gap-5 py-10">
						<div className="flex items-center justify-between cursor-pointer" onClick={() => setActive(i)}>
							<div className="text-2xl">{line.headline}</div>
							{active === i ? <MinusIcon/> : <PlusIcon/>}
						</div>
						{active === i && (
							<div className="text-xl text-stone-600">
								{line.content}
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
}
