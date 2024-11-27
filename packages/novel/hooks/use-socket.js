'use client';

import { useEffect, useRef, useState } from 'react';
import { Manager } from 'socket.io-client';

export default function useSocket (namespace) {
	const socket = useRef(null);
	const [connected, setConnected] = useState(false);
	const queue = useRef([]);

	function onConnect () {
		setConnected(socket.current);
	}

	useEffect(() => {
		if (!!connected && socket.current) {
			if (queue.current.length) {
				queue.current.forEach(([method, ...args]) => {
					socket.current[method](...args);
				});
				queue.current = [];
			}
		}
	}, [connected]);

	useEffect(() => {
		if (!socket.current) {
			const socketOptions = { withCredentials: true };
			const manager = new Manager(process.env.NEXT_PUBLIC_API_HOST, socketOptions);
			socket.current = manager.socket(namespace, { retries: 12 });
			socket.current.on('connect', onConnect);
			return () => {
				socket.current.on('connect', onConnect);
			};
		}
	}, []);

	return {
		on (...args) {
			if (socket.current) {
				socket.current.on(...args);
			} else {
				queue.current.push(['on', ...args]);
			}
		},
		emit (...args) {
			if (socket.current) {
				socket.current.emit(...args);
			} else {
				queue.current.push(['emit', ...args]);
			}
		},
		current: socket.current,
	};
}
