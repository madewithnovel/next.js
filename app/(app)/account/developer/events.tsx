import { format } from 'date-fns/format';

export default function Events ({ events }) {
	return (
		<div className="section">
			<table className="min-w-full divide-y divide-border">
				<thead>
					<tr>
						<th className="w-12 py-3.5 pl-4 pr-3 text-center text-sm font-medium sm:pl-0">Status</th>
						<th className="w-12 px-3 py-3.5 text-left text-sm font-medium">Method</th>
						<th className="whitespace-nowrap w-28 px-3 py-3.5 text-left text-sm font-medium">Access Key</th>
						<th className="px-3 py-3.5 text-left text-sm font-medium">URL</th>
						<th className="pl-3 py-3.5 text-right text-sm font-medium">Time</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-border text-sm">
					<tr>
						<td colSpan={5}>
							<div className="py-20 mt-5 text-center border-t border rounded-md">
								No activity yet
							</div>
						</td>
					</tr>
					{events.map(event => (
						<tr key={event.request_id}>
							<td className="flex items-center justify-center py-2 pl-4 pr-3 sm:pl-0">
								{event.status < 400 && (
									<span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
										{event.status}
									</span>
								)}
								{event.status >= 400 && (
									<span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
										{event.status}
									</span>
								)}
							</td>
							<td className="px-3 py-2 font-mono">
								{event.method}
							</td>
							<td className="px-3 py-2 font-mono">
								{event.access_id.substring(0, 6)}&hellip;
							</td>
							<td className=" px-3 py-2 font-mono">
								<div className="whitespace-nowrap overflow-ellipsis w-96">
									{event.url}
								</div>
							</td>
							<td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-right sm:pr-0">
								{format(new Date(event.timestamp), 'MMM dd, yyyy - hh:mm a')}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
