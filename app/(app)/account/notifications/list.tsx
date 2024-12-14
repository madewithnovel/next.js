'use client';

import postNotificationsArchiveRequest from 'app/api/requests/postNotificationsArchive';
import postNotificationsReadRequest from 'app/api/requests/postNotificationsRead';
import cx from 'clsx';
import Button from 'components/elements/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from 'components/ui/dropdown-menu';
import { format } from 'date-fns/format';
import { EllipsisIcon } from 'lucide-react';
import { useState } from 'react';

export default function List ({ notifications: hydratedNotifications }) {
	const [notifications, setNotifications] = useState(hydratedNotifications);
	const [isWorking, working] = useState(false);

	async function markAllAsRead () {
		working(true);
		await postNotificationsReadRequest({ items: hydratedNotifications.map(n => n.id) });
		setNotifications(notifications.map(n => ({ ...n, read: true })));
		working(false);
	}

	async function markAsRead (notification) {
		working(true);
		await postNotificationsReadRequest({ items: [notification.id] });
		setNotifications(notifications.map(n => n.id === notification.id ? { ...n, read: true } : n));
		working(false);
	}

	async function archive (notification) {
		working(true);
		await postNotificationsArchiveRequest({ items: [notification.id] });
		setNotifications(notifications.filter(n => n.id !== notification.id));
		working(false);
	}

	return (
		<section className="section">
			<header>
				<div className="flex gap-2 items-center justify-between">
					<h3 className="text-xl font-medium">Notifications</h3>
					{notifications.filter(n => !n.read).length > 0 && <Button variant="outline" size="sm" onClick={() => markAllAsRead()}>Mark {notifications.filter(n => !n.read).length} as read</Button>}
				</div>
			</header>
			{notifications.length === 0 && (
				<div className="py-20 text-center border-t border rounded-md">
					No notifications yet
				</div>
			)}
			{notifications.length > 0 && (
				<div>
					<table className="min-w-full divide-y divide-border">
						<thead>
							<tr>
								<th className="w-12 py-3.5 pl-4 pr-3 text-left text-sm font-medium sm:pl-0">Notification</th>
								<th className="px-3 py-3.5 text-left text-sm font-medium">Date</th>
								<th/>
							</tr>
						</thead>
						<tbody className="divide-y divide-border text-sm align-top">
							{notifications.map(notification => (
								<tr key={notification.id} className={cx({ 'pointer-events-none opacity-50': isWorking })}>
									<td className="py-3 pl-4 pr-3 sm:pl-0 w-full">
										<div className="flex items-start gap-2">
											{!notification.read && (
												<span className="relative flex h-3 w-3 mt-1">
													<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
													<span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
												</span>
											)}
											<div>
												<span className="font-medium">{notification.title}</span>
												{' '}-{' '}
												<span>{notification.body}</span>
											</div>
										</div>
									</td>
									<td className="whitespace-nowrap p-3">
										<div>{format(new Date(notification.received_at), 'MMM dd, yyyy')}</div>
									</td>
									<td className="relative whitespace-nowrap py-3 pl-3 pr-4 text-right sm:pr-0">
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<button className="button outline xs"><EllipsisIcon /></button>
											</DropdownMenuTrigger>
											<DropdownMenuContent align="end">
												<DropdownMenuItem disabled={notification.read} onClick={() => markAsRead(notification)}>Mark as read</DropdownMenuItem>
												<DropdownMenuItem onClick={() => archive(notification)}>Archive</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</section>
	);
}
