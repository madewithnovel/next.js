'use client';

import * as novel from '@novel/next/sdk';
import { useEffect, useRef, useState } from 'react';

export default function useNotification () {
	const sw = useRef(null);
	const buffer = useRef([]);
	const [registration, setRegistration] = useState(null);
	const [subscription, setSubscription] = useState(null);

	async function subscribe () {
		if (registration) {
			const response = await novel.rpc.NotificationsVapid();
			const { vapid_key } = await response.json();
			const subscription = await registration.pushManager.subscribe({
				userVisibleOnly: true,
				applicationServerKey: vapid_key,
			});
			setSubscription(subscription);
			const key = subscription.toJSON().keys.p256dh;
			const auth = subscription.toJSON().keys.auth;
			await novel.rpc.NotificationsRegister({ endpoint: subscription.endpoint, key, auth });
		}
	}

	async function unsubscribe () {
		let sub = subscription;
		if (!sub) {
			sub = await registration.pushManager?.getSubscription();
		}
		if (sub) {
			await sub.unsubscribe();
			await novel.rpc.NotificationsDeregister({ endpoint: sub.endpoint });
		}
		setSubscription(null);
	}

	useEffect(() => {
		if (sw.current && registration) {
			if (buffer.current) {
				buffer.current.forEach((method) => {
					if (method === 'subscribe') {
						subscribe();
					}
					if (method === 'unsubscribe') {
						unsubscribe();
					}
				});
				buffer.current = [];
			}
		}
	}, [registration]);

	useEffect(() => {
		if (!sw.current) {
			if ('serviceWorker' in navigator) {
				navigator.serviceWorker.register('/sw.js').then(async (registration) => {
					sw.current = registration;
					setRegistration(registration);

					registration.pushManager?.getSubscription().then((subscription) => {
						setSubscription(subscription);
					});
				});
			}
		}
	}, []);

	return {
		request () {
			if (sw.current) {
				subscribe();
			} else {
				buffer.current.push('subscribe');
			}
		},
		unsubscribe () {
			if (sw.current) {
				unsubscribe();
			} else {
				buffer.current.push('unsubscribe');
			}
		},
		subscribed: !!subscription,
	};
}
