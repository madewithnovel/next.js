'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import useNotification from '@novel/next/hooks/use-notification';
import * as novel from '@novel/next/sdk';
import { patchAccountSettingsUpdate } from 'app/api/requests/patchAccountSettingsUpdate';
import InlineNotify from 'components/elements/inline-notify';
import Toggle from 'components/elements/toggle';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const schema = patchAccountSettingsUpdate.pick({ marketing: true, newsletter: true });

export default function Notifications ({ settings }) {
	const notification = useNotification();
	const [saved, save] = useState(false);
	const [isWorking, working] = useState(false);
	const { handleSubmit } = useForm({ defaultValues: settings, resolver: zodResolver(schema) });

	async function submit (key, checked) {
		working(true);
		await novel.rpc.AccountSettingsUpdate({ [key]: checked });
		save(true);
		working(false);
	}

	return (
		<section className="section">
			<header>
				<div className="flex gap-2 items-center">
					<h3 className="text-xl font-medium">Notifications</h3>
					<InlineNotify saved={saved} leave={() => save(false)} duration={6000}/>
				</div>
			</header>
			<div>
				<div className="flex flex-col divide-y divide-border">
					<div className="py-5 flex items-center justify-between">
						<div>
							Marketing Emails
							<p className="text-muted-foreground">Receive emails about new products, features, and more.</p>
						</div>
						<Toggle
							disabled={isWorking}
							checked={settings.marketing === true}
							onChange={(e) => {
								function callback () {
									handleSubmit(submit('marketing', e.target.value));
								}
								if (e.target.value) {
									notification.request(callback);
								} else {
									notification.unsubscribe(callback);
								}
							}}
						/>
					</div>
					<div className="py-5 flex items-center justify-between">
						<div>
							Newsletter
							<p className="text-muted-foreground">Receive weekly digest from Novel and Marathon Products.</p>
						</div>
						<Toggle
							disabled={isWorking}
							checked={settings.newsletter === true}
							onChange={(e) => handleSubmit(submit('newsletter', e.target.value))}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
