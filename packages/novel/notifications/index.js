'use client';

import store from '../store';

export async function setup () {
	const session = store.get('session');
	// if ('serviceWorker' in navigator) {
	// 	navigator.serviceWorker.register('/sw.js').then(async (registration) => {
	// 		console.log('Service Worker registered:', registration);
	//
	// 		try {
	// 			const subscription = await registration.pushManager.subscribe({
	// 				userVisibleOnly: true,
	// 				applicationServerKey: '',
	// 			});
	//
	// 			console.log(subscription);
	// 		} catch (error) {
	// 			console.error(error);
	// 		}
	// 	});
	// }
}
