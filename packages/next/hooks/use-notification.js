'use client';

import deleteNotificationsDeregisterRequest from 'app/api/requests/deleteNotificationsDeregister';
import getNotificationsVapidRequest from 'app/api/requests/getNotificationsVapid';
import postNotificationsRegisterRequest from 'app/api/requests/postNotificationsRegister';
import { useEffect, useRef, useState } from 'react';

export default function useNotification () {
	const sw = useRef(null);
	const buffer = useRef([]);
	const [registration, setRegistration] = useState(null);
	const [subscription, setSubscription] = useState(null);

	async function subscribe (callback) {
		if (registration) {
			const response = await getNotificationsVapidRequest();
			const { vapid_key } = await response.json();
			if (vapid_key) {
				const subscription = await registration.pushManager.subscribe({
					userVisibleOnly: true,
					applicationServerKey: vapid_key,
				});
				setSubscription(subscription);
				const key = subscription.toJSON().keys.p256dh;
				const auth = subscription.toJSON().keys.auth;
				await postNotificationsRegisterRequest({ endpoint: subscription.endpoint, key, auth });
			}
		}
		if (callback) {
			callback();
		}
	}

	async function unsubscribe (callback) {
		let sub = subscription;
		if (!sub) {
			sub = await registration.pushManager?.getSubscription();
		}
		if (sub) {
			await sub.unsubscribe();
			await deleteNotificationsDeregisterRequest({ endpoint: sub.endpoint });
		}
		if (callback) {
			callback();
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
		request (callback) {
			if (sw.current) {
				subscribe(callback);
			} else {
				buffer.current.push('subscribe');
			}
		},
		unsubscribe (callback) {
			if (sw.current) {
				unsubscribe(callback);
			} else {
				buffer.current.push('unsubscribe');
			}
		},
		subscribed: !!subscription,
	};
}
