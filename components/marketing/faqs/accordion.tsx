'use client';

import { MinusIcon, PlusIcon } from 'lucide-react';
import { useState } from 'react';

const lines = [
	{
		headline: 'What am I getting exactly?',
		content: 'Still have questions about Novel? Book a call with our sales team today and we’ll show exactly how we can revolutionize the way your business handles everything from data to onboarding.',
	},
	{
		headline: 'Do you offer refunds?',
		content: 'We offer a 30-day money-back guarantee. If you are not happy with the product, we will refund your purchase.',
	},
	{
		headline: 'I am not able to see my purchase, what\'s next?',
		content: 'If you are not able to see your purchase, please contact our support team at hello@novel.dev',
	},
];

export default function FaqsAccordion () {
	const [active, setActive] = useState(0);
	return (
		<div className="container flex flex-col mx-auto px-5 md:px-32">
			<h2 className="text-xl md:text-6xl font-medium tracking-tight">Frequently Asked Questions</h2>
			<div className="flex flex-col divide-y divide-zinc-200">
				{lines.map((line, i) => (
					<div key={`i${i}`} className="flex flex-col gap-2 md:gap-5 py-5 md:py-10">
						<div className="flex items-center justify-between cursor-pointer" onClick={() => setActive(i)}>
							<div className="text-xl md:text-2xl font-normal md:font-medium">{line.headline}</div>
							{active === i ? <MinusIcon/> : <PlusIcon/>}
						</div>
						{active === i && (
							<div className="text-xl text-zinc-600">
								{line.content}
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
}
