'use client';

import useNotification from 'novel/hooks/use-notification';
import useSocket from 'novel/hooks/use-socket';
import { useEffect, useState } from 'react';

export default function Page () {
	const notification = useNotification();
	const socket = useSocket('/test');
	const socket2 = useSocket('/test2');

	const [time, setTime] = useState('');

	useEffect(() => {
		socket.on('time', (time) => {
			setTime(time);
		});

		setInterval(() => {
			socket2.emit('timer', { test: +new Date() });
		}, 1000);
	}, []);

	return (
		<div>
			room

			<div>
				received from socket server: {time}
			</div>

			<div>
				Notification {notification.subscribed ? 'subscribed' : 'not subscribed'}
			</div>

			<div>
				<button className="button" onClick={() => socket.emit('timer', { test: +new Date() })}>send time to socket server</button>
			</div>

			<div>
				<button className="button" onClick={() => notification.request()}>susbcribe</button>
			</div>

			<div>
				<button className="button" onClick={() => notification.unsubscribe()}>unsusbcribe</button>
			</div>
		</div>
	);
}
