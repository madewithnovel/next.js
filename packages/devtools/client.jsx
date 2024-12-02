'use client';

import cx from 'clsx';
import { ArrowUpRightIcon, BanIcon, EllipsisIcon, XIcon } from 'lucide-react';
import { useSelectedLayoutSegments } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Manager } from 'socket.io-client';
import store2 from 'store2';

import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';

const store = store2.namespace('novel:devtool');

const socketOptions = {
	withCredentials: true,
};

const manager = new Manager(process.env.NEXT_PUBLIC_API_HOST, socketOptions);

const defaultData = { request: {}, query: {} };
let outsideEvents = store.get('events', defaultData);

export default function Wrapper ({ requests }) {
	const [opened, open] = useState(false);
	useEffect(() => {
		const handleKeyDown = (event) => {
			if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
				event.preventDefault();
				open(true);
			}
		};
		window.addEventListener('keydown', handleKeyDown);
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, []);
	return (
		<>{opened && <Index requests={requests} onClose={open}/>}</>
	);
}

function Index ({ requests, onClose }) {
	const socket = useRef(null);
	const [isOpen, open] = useState(true);
	const [tab, setTab] = useState('request');
	const [snapshot, setSnapshot] = useState({});
	const [connected, setConnected] = useState(false);
	const [events, setEvents] = useState({});
	const pathname = useSelectedLayoutSegments();
	const initialized = useRef(false); // only in dev
	const tableEndRef = useRef(null);

	function processEvent (event) {
		if (['request', 'query'].includes(event.type)) {
			if (!outsideEvents[event.type]?.[event.id]) {
				outsideEvents[event.type][event.id] = [];
			}
			outsideEvents[event.type][event.id].push(event);
			store.set('events', outsideEvents);
			setEvents(outsideEvents);
			setSnapshot({ ...snapshot });
			tableEndRef.current?.scrollIntoView({ behavior: 'smooth' });
		}
		if (['metrics', 'account', 'session'].includes(event.type)) {
			setSnapshot({ ...snapshot, [event.type]: event });
			store.set('snapshot', { ...snapshot, [event.type]: event });
		}
	}

	useEffect(() => {
		tableEndRef.current?.scrollIntoView({ behavior: 'instant' });
		if (!initialized.current) {
			for (const request of requests) {
				processEvent(request);
			}
			initialized.current = true;
			socket.current = manager.socket('/devtools', {
				retries: 12,
			});
			socket.current.on('connect', onConnect);
			socket.current.on('disconnect', onDisconnect);
			socket.current.on('system', (event) => {
				processEvent(event);
			});
			return () => {
				socket.current.on('connect', onConnect);
			};
		}
	}, []);

	function close () {
		socket.current.disconnect();
		onClose(false);
	}

	function resetDb () {
		outsideEvents = defaultData;
		store.set('events', defaultData);
		setEvents(defaultData);
		setSnapshot({});
	}

	async function onConnect () {
		setConnected(true);
	}

	async function onDisconnect () {
		setConnected(false);
	}

	return (
		<div className="text-xs hidden md:block fixed z-50 bottom-0 left-0 w-full border-t border-black drop-shadow-2xl bg-zinc-900 text-white">
			<div className="flex items-center justify-between bg-zinc-700 border-b border-black">
				<div onClick={() => setTab('request')} className={cx('px-5 pt-1.5 pb-1 flex items-center gap-2 border-b-2 border-transparent', { 'bg-zinc-900 border-blue-500': tab === 'request' })}>
					Requests
					{events.request && <span className="rounded-full bg-zinc-500 text-white text-xs px-1 py-0 font-mono">{Object.keys(events.request).length}</span>}
				</div>
				<div onClick={() => setTab('error')} className={cx('px-5 pt-1.5 pb-1 flex items-center gap-2 border-b-2 border-transparent', { 'bg-zinc-900 border-blue-500': tab === 'error' })}>Errors</div>
				<div onClick={() => setTab('query')} className={cx('px-5 pt-1.5 pb-1 flex items-center gap-2 border-b-2 border-transparent', { 'bg-zinc-900 border-blue-500': tab === 'query' })}>
					Queries
					{events.request && <span className="rounded-full bg-zinc-500 text-white text-xs px-1 py-0 font-mono">{Object.keys(events.query).length}</span>}
				</div>
				<div onClick={() => setTab('job')} className={cx('px-5 pt-1.5 pb-1 flex items-center gap-2 border-b-2 border-transparent', { 'bg-zinc-900 border-blue-500': tab === 'job' })}>Jobs</div>
				<div onClick={() => setTab('mail')} className={cx('px-5 pt-1.5 pb-1 flex items-center gap-2 border-b-2 border-transparent', { 'bg-zinc-900 border-blue-500': tab === 'mail' })}>Mail</div>
				{/* <div onClick={() => setTab('account')} className={cx('px-5 py-2', { 'bg-zinc-900': tab === 'account' })}>Auth</div> */}
				{/* <div onClick={() => setTab('session')} className={cx('px-5 py-2', { 'bg-zinc-900': tab === 'session' })}>Session</div> */}
				<div className="flex-1"></div>
				<div className="p-1">{snapshot.metrics ? (snapshot.metrics?.memory.heapUsed / 1000000).toFixed(0) : 0}MB</div>
				<div className="p-1" onClick={() => resetDb()}>
					<BanIcon size={14}/>
				</div>
				<div className="p-1" onClick={() => close()}>
					<XIcon size={14}/>
				</div>
				<div className="p-1">
					{connected && <div className="h-3 w-3 rounded-full bg-green-500"></div>}
					{!connected && <div className="h-3 w-3 rounded-full bg-zinc-500"></div>}
				</div>
			</div>
			{isOpen && (
				<div className="h-96 flex flex-col">
					<div className="flex-1 overflow-y-auto overflow-x-hidden whitespace-break-spaces flex flex-col">
						{tab === 'request' && events.request && <RequestList events={events.request}/>}
						{tab === 'query' && events.query && <QueriesList events={events.query}/>}
						<div ref={tableEndRef}/>
					</div>
					<div className="whitespace-nowrap px-5 py-2 border-t border-black bg-zinc-700">
						<a href={`vscode://file/${process.env.NEXT_PUBLIC_DEV_CWD}/app/${pathname.join('/')}/page.tsx`} className="flex items-center gap-1">
							Editing {process.env.NEXT_PUBLIC_DEV_CWD}/app/{pathname.join('/')}/page.tsx
							<ArrowUpRightIcon size={18}/>
						</a>
					</div>
				</div>
			)}
		</div>
	);
}

function RequestList ({ events }) {
	const [opened, open] = useState(false);
	const [current, setCurrent] = useState(null);

	function select (event) {
		const start = event.find((event) => event.action === 'start');
		const end = event.find((event) => event.action === 'end');
		setCurrent({ start, end, event });
		open(true);
	}

	return (
		<>
			<Sheet open={opened} onOpenChange={open}>
				<SheetContent className="overflow-auto">
					<SheetHeader>
						<SheetTitle>{current?.start.id}</SheetTitle>
					</SheetHeader>
					<div className="grid py-4">
						<div className="grid grid-cols-5 gap-5 odd:bg-zinc-100 py-2">
							<div>Method</div>
							<div className="col-span-4">
								{current?.start.data.method}
							</div>
						</div>
						<div className="grid grid-cols-5 gap-5 odd:bg-zinc-100 py-2">
							<div>Path</div>
							<div className="col-span-4">
								{current?.start.data.url}
							</div>
						</div>
						<div className="grid grid-cols-5 gap-5 odd:bg-zinc-100 py-2">
							<div>Status</div>
							<div className="col-span-4">
								{current?.end ? (current.end.data.elapsedTime).toFixed(2) + ' ms' : 'Pending'}
							</div>
						</div>
						<div className="grid grid-cols-5 gap-5 odd:bg-zinc-100 py-2">
							<div>Status</div>
							<div className="col-span-4">
								{current?.end ? (current.end?.data.headers?.['content-length'] ?? 0) + ' B' : 'Pending'}
							</div>
						</div>
						<div className="grid grid-cols-5 gap-5 odd:bg-zinc-100 py-2">
							<div>Params</div>
							<div className="col-span-4 overflow-x-scroll">
								<pre>{current?.start ? JSON.stringify(current?.start.data.params, null, 2) : ''}</pre>
							</div>
						</div>
						<div className="grid grid-cols-5 gap-5 odd:bg-zinc-100 py-2">
							<div>Query</div>
							<div className="col-span-4 overflow-x-scroll">
								<pre>{current?.start ? JSON.stringify(current?.start.data.query, null, 2) : ''}</pre>
							</div>
						</div>
						<div className="grid grid-cols-5 gap-5 odd:bg-zinc-100 py-2">
							<div>Headers</div>
							<div className="col-span-4 overflow-x-scroll">
								<pre>{current?.end ? JSON.stringify(current?.end.data.headers, null, 2) : ''}</pre>
							</div>
						</div>
						<div className="grid grid-cols-5 gap-5 odd:bg-zinc-100 py-2">
							<div>Body</div>
							<div className="col-span-4 overflow-x-scroll">
								<pre>{current?.start ? JSON.stringify(current?.start.data.body, null, 2) : ''}</pre>
							</div>
						</div>
						<div className="grid grid-cols-5 gap-5 odd:bg-zinc-100 py-2">
							<div>Response</div>
							<div className="col-span-4 overflow-x-scroll">
								<pre>{current?.end && current.end.data.payload ? JSON.stringify(JSON.parse(current?.end.data.payload), null, 2) : ''}</pre>
							</div>
						</div>

					</div>
				</SheetContent>
			</Sheet>
			<table className="table table-auto border-collapse">
				<thead className="">
					<tr className="sticky top-0 bg-zinc-950">
						<th className="border border-zinc-600 text-left py-1 px-2 w-10">Method</th>
						<th className="border border-zinc-600 text-left py-1 px-2 min-w-40">Path</th>
						{/* <th className="border border-zinc-600 text-left p-1 w-16">Timestamp</th> */}
						{/* <th className="border border-zinc-600 text-left p-1 w-16">Ago</th> */}
						<th className="border border-zinc-600 text-left py-1 px-2 w-12">Status</th>
						<th className="border border-zinc-600 text-right py-1 px-2 w-16">Size</th>
						<th className="border border-zinc-600 text-right py-1 px-2 w-16">Time</th>
						<th className="border border-zinc-600 text-left py-1 px-2 w-5"></th>
					</tr>
				</thead>
				<tbody>
					{events && Object.keys(events)
						.filter((key) => {
							const start = events[key].find((event) => event.action === 'start');
							if (start) {
								return start;
							}
							return false;
						})
						.map((key) => {
							const start = events[key].find((event) => event.action === 'start');
							const end = events[key].find((event) => event.action === 'end');
							return (
								<tr key={key} className="even:bg-zinc-800" onClick={() => select(events[key])}>
									<td className="border-x border-zinc-600 py-1 px-2 overflow-ellipsis whitespace-nowrap">{start?.data.method}</td>
									<td className="border-x border-zinc-600 py-1 px-2 overflow-ellipsis whitespace-nowrap">{start?.data.url}</td>
									{/* <td className="border-x border-zinc-600 p-1"></td> */}
									{/* <td className="border-x border-zinc-600 p-1 whitespace-nowrap overflow-ellipsis">/!* 15s ago *!/</td> */}
									<td className="border-x border-zinc-600 py-1 px-2 overflow-ellipsis whitespace-nowrap">{end ? end?.data.statusCode : 'Pending'}</td>
									<td className="border-x border-zinc-600 py-1 px-2 text-right overflow-ellipsis whitespace-nowrap">{end ? (end?.data.headers?.['content-length'] ?? 0) + ' B' : 'Pending'}</td>
									<td className="border-x border-zinc-600 py-1 px-2 text-right overflow-ellipsis whitespace-nowrap">{end ? end?.data.elapsedTime?.toFixed(2) + ' ms' : 'Pending'}</td>
									<td className="border-x border-zinc-600 py-1 px-2">{end ? <EllipsisIcon size={18}/> : 'Pending'}</td>
								</tr>
							);
						})}
				</tbody>
			</table>
		</>
	);
}

function QueriesList ({ events }) {
	const [opened, open] = useState(false);
	const [current, setCurrent] = useState(null);

	function select (event) {
		const start = event.find((event) => event.action === 'start');
		const end = event.find((event) => event.action === 'end');
		setCurrent({ start, end, event });
		open(true);
	}

	return (
		<>
			<Sheet open={opened} onOpenChange={open}>
				<SheetContent className="overflow-auto">
					<SheetHeader>
						<SheetTitle>{current?.end.id}</SheetTitle>
					</SheetHeader>
					<div className="grid py-4">
						<div className="grid grid-cols-5 gap-5 odd:bg-zinc-100 py-2">
							<div>Elapsed</div>
							<div className="col-span-4">
								{current?.end ? current.end.elapsed.toFixed(2) + ' ms' : 'Pending'}
							</div>
						</div>
						<div className="grid grid-cols-5 gap-5 odd:bg-zinc-100 py-2">
							<div>SQL</div>
							<div className="col-span-4 max-h-96 overflow-y-auto">
								{current?.end.query.sql}
							</div>
						</div>
						<div className="grid grid-cols-5 gap-5 odd:bg-zinc-100 py-2">
							<div>Bindings</div>
							<div className="col-span-4">
								{current?.end ? JSON.stringify(current.end.query.bindings, null, 2) : 'Pending'}
							</div>
						</div>
						<div className="grid grid-cols-5 gap-5 odd:bg-zinc-100 py-2">
							<div>Response</div>
							<div className="col-span-4 max-h-96 overflow-y-auto">
								{current?.end ? JSON.stringify(current.end.query.response, null, 2) : 'Pending'}
							</div>
						</div>
					</div>
				</SheetContent>
			</Sheet>
			<table className="table table-auto border-collapse">
				<thead className="">
					<tr className="sticky top-0 bg-zinc-950">
						<th className="border border-zinc-600 text-left py-1 px-2 w-10">Method</th>
						<th className="border border-zinc-600 text-left py-1 px-2 w-10">Request ID</th>
						<th className="border border-zinc-600 text-left py-1 px-2 min-w-40">SQL</th>
						<th className="border border-zinc-600 py-1 px-2 w-5 text-right">Time</th>
						<th className="border border-zinc-600 py-1 px-2 w-5 text-right"></th>
					</tr>
				</thead>
				<tbody>
					{events && Object.keys(events)
						.map((key) => {
							// const start = events[key].find((event) => event.action === 'start');
							const end = events[key].find((event) => event.action === 'end');
							return (
								<tr key={key} className="even:bg-zinc-800 align-top"onClick={() => select(events[key])}>
									<td className="border-x border-zinc-600 py-1 px-2 overflow-ellipsis whitespace-nowrap">{end?.query.method}</td>
									<td className="border-x border-zinc-600 py-1 px-2 overflow-ellipsis whitespace-nowrap">{end?.requestId.substring(0, 13)}</td>
									<td className="border-x border-zinc-600 py-1 px-2 overflow-ellipsis whitespace-break-spaces">{end ? end.query.sql : 'Pending'}</td>
									<td className="text-right border-x border-zinc-600 py-1 px-2 overflow-ellipsis whitespace-nowrap">{end?.elapsed ? `${end?.elapsed.toFixed(2)} ms` : 'Pending'}</td>
									<td className="border-x border-zinc-600 py-1 px-2">{end ? <EllipsisIcon size={18}/> : 'Pending'}</td>
								</tr>
							);
						})}
				</tbody>
			</table>
		</>
	);
}
