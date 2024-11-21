'use client';

import cx from 'clsx';
import { ArrowUpRightIcon, ExternalLinkIcon } from 'lucide-react';
import { useSelectedLayoutSegments } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Manager } from 'socket.io-client';
import store2 from 'store2';

const store = store2.namespace('novel:devtool');

const socketOptions = {
	withCredentials: true,
};

const manager = new Manager(process.env.NEXT_PUBLIC_API_HOST, socketOptions);

/**
 * TODO: load the requests done by server action as well
 */

const listOutside = [];
const requests = {};
const errors = {};
const queries = {};
const jobs = {};
const mails = {};

export default function Index ({ requests }) {
	const [isOpen, open] = useState(true);
	const [tab, setTab] = useState('request');
	const [snapshot, setSnapshot] = useState({});
	const [connected, setConnected] = useState(false);
	const [list, setList] = useState([]);
	const pathname = useSelectedLayoutSegments();

	useEffect(() => {
		// support locale
		const socket = manager.socket('/devtools', {
			retries: 12,
		});
		socket.on('connect', onConnect);
		socket.on('disconnect', onDisconnect);
		socket.on('system', (event) => {
			if (event.type === 'request') {
				if (!requests[event.id]) {
					requests[event.id] = [];
				}
				requests[event.id].push(event);
			}
			if (['metrics', 'account', 'session'].includes(event.type)) {
				setSnapshot({ ...snapshot, [event.type]: event });
			}
		});
		return () => {
			socket.off('connect', onConnect);
		};
	}, []);

	async function onConnect (socket) {
		setConnected(true);
	}

	async function onDisconnect () {
		setConnected(false);
	}

	return <div
		className="hidden md:block fixed z-50 bottom-0 left-0 w-full drop-shadow-2xl bg-zinc-900 text-white">
		<div
			className="flex items-center justify-between bg-zinc-700"
		>
			<div onClick={() => setTab('request')} className={cx('px-5 py-2', { 'bg-zinc-900': tab === 'request' })}>Requests</div>
			<div onClick={() => setTab('error')} className={cx('px-5 py-2', { 'bg-zinc-900': tab === 'error' })}>Errors</div>
			<div onClick={() => setTab('query')} className={cx('px-5 py-2', { 'bg-zinc-900': tab === 'query' })}>Queries</div>
			{/* <div onClick={() => setTab('account')} className={cx('px-5 py-2', { 'bg-zinc-900': tab === 'account' })}>Auth</div> */}
			{/* <div onClick={() => setTab('session')} className={cx('px-5 py-2', { 'bg-zinc-900': tab === 'session' })}>Session</div> */}
			<div onClick={() => setTab('job')} className={cx('px-5 py-2', { 'bg-zinc-900': tab === 'job' })}>Jobs</div>
			<div onClick={() => setTab('mail')} className={cx('px-5 py-2', { 'bg-zinc-900': tab === 'mail' })}>Mail</div>
			<div className="flex-1"></div>
			<div className="p-2">{snapshot.metrics ? (snapshot.metrics?.memory.heapUsed / 1000000).toFixed(0) : 0}MB</div>
			<div className="p-2">523ms</div>
			<div className="p-3">
				{connected && <div className="h-3 w-3 rounded-full bg-green-500"></div>}
				{!connected && <div className="h-3 w-3 rounded-full bg-zinc-500"></div>}
			</div>
		</div>
		{isOpen && (
			<div className="h-96 flex flex-col">
				<div className="flex-1 overflow-y-auto overflow-x-hidden whitespace-break-spaces flex flex-col">
					{tab === 'request' && <RequestList list={list} pathname={pathname} />}
				</div>
				<div className="whitespace-nowrap p-5 bg-zinc-700">
					<a href={`vscode://file/${process.env.NEXT_PUBLIC_DEV_CWD}/app/${pathname.join('/')}/page.tsx`} className="flex items-center gap-1">
						Editing {process.env.NEXT_PUBLIC_DEV_CWD}/app/{pathname.join('/')}/page.tsx
						<ArrowUpRightIcon size={18} />
					</a>
				</div>
			</div>
		)}
	</div>;
}

function RequestList ({ list, pathname }) {
	return (
		<table className="table-auto">
			<thead>
				<tr>
					<th>ID</th>
					<th>Path</th>
					<th>Status</th>
				</tr>
			</thead>
			<tbody>
				{list.filter(item => item.type === 'request').map((item, index) => (
					<tr key={index}>
						<td>{item.data.id}</td>
						<td>{item.data.method} {item.data.url}</td>
						<td>{item.data.status}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
