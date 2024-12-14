/**
 * Service Worker
 *
 * This is a service worker that will be registered in the browser when the user visits the site.
 *
 * Implementation taken from: https://nextjs.org/docs/app/building-your-application/configuring/progressive-web-apps
 */
self.addEventListener('push', function (event) {
	// you can debug this in chrome://gcm-internals/
	if (event.data) {
		let data;
		console.log(event.data);
		try {
			data = event.data.json();
			data = data.body;
		} catch {
			data = event.data.text();
		}
		const options = {
			body: data,
			vibrate: [100, 50, 100],
			data: {
				dateOfArrival: Date.now(),
				primaryKey: '2',
			},
		};
		event.waitUntil(self.registration.showNotification(data.title, options));
	}
});

self.addEventListener('notificationclick', function (event) {
	event.notification.close();
});
