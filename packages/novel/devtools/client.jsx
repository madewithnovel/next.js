'use client';

import { useSelectedLayoutSegments } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Manager } from 'socket.io-client';

const socketOptions = {
	withCredentials: true,
};

const manager = new Manager(process.env.NEXT_PUBLIC_API_HOST, socketOptions);

/**
 * TODO: load the requests done by server action as well
 */

export default function Index ({ requests }) {
	const [isOpen, open] = useState(false);
	const pathname = useSelectedLayoutSegments();

	useEffect(() => {
		// support locale
		const socket = manager.socket('/devtools', {
			retries: 12,
		});
		socket.on('connect', onConnect);
		socket.on('system', (event) => {
			// console.log(event);
		});
		return () => {
			socket.off('connect', onConnect);
		};
	}, []);

	async function onConnect (socket) {

	}

	return <div
		onClick={() => open(!isOpen)}
		className="hidden md:block fixed z-50 bottom-0 left-0 w-full bg-white text-xs border-t border-stone-200">
		<div className="px-5 flex items-center justify-between">
			<div className="p-2">Requests</div>
			<div className="p-2">Jobs</div>
			<div className="p-2">Queries</div>
			<div className="p-2">Exceptions</div>
			<div className="p-2">Auth</div>
			<div className="p-2">Session</div>
			<div className="p-2">Mail</div>
			<a href={`vscode://file/${process.env.NEXT_PUBLIC_DEV_CWD}/app/${pathname.join('/')}/page.tsx`} className="p-2">Editing: {process.env.NEXT_PUBLIC_DEV_CWD}/app/{pathname.join('/')}/page.tsx</a>
			<div className="flex-1"></div>
			<div className="p-2">2MB</div>
			<div className="p-2">523ms</div>
		</div>
		{isOpen && (<div className="h-96">
			events
		</div>)}
	</div>;
}
