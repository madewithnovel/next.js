'use client';

import useNotification from 'novel/hooks/use-notification';
import useSocket from 'novel/hooks/use-socket';
import { useEffect, useState } from 'react';

export default function Page () {
	const notification = useNotification();
	const socket = useSocket('/test');

	const [time, setTime] = useState('');

	useEffect(() => {
		socket.on('time', (time) => {
			setTime(time);
		});
	}, []);

	function emit () {
		socket.emit('timer', { test: +new Date() });
	}

	return (
		<div>
			room

			<div>
				received from socket server: {time}
			</div>

			<div>
				connected: {socket.current ? 'Yes' : 'No'}
			</div>

			<div>
				Notification {notification.subscribed ? 'subscribed' : 'not subscribed'}
			</div>

			<div>
				<button className="button" onClick={() => emit()}>send time to socket server</button>
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
