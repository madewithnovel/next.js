import { format } from 'date-fns/format';

export default function List ({ events }) {
	return (
		<section className="section">
			{events.length === 0 && (
				<div className="py-20 text-center border-t border rounded-md">
					No activity yet
				</div>
			)}
			{events.length > 0 && (
				<div>
					<table className="min-w-full divide-y divide-border">
						<thead>
							<tr>
								<th className="w-12 py-3.5 pl-4 pr-3 text-left text-sm font-medium sm:pl-0">Code</th>
								<th className="px-3 py-3.5 text-left text-sm font-medium">Event</th>
								<th className="px-3 py-3.5 text-right text-sm font-medium">ID</th>
								<th className="px-3 py-3.5 text-left text-sm font-medium">Date</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-border align-top">
							{events.map(event => (
								<tr key={event.event_id}>
									<td className="py-5 pl-4 pr-3 sm:pl-0">
										<div className="flex items-start gap-2">
											<span className="font-medium">{event.action}</span>
										</div>
									</td>
									<td className="whitespace-nowrap p-5 w-full">
										<span>{event.message}</span>
									</td>
									<td className="whitespace-nowrap text-sm font-mono p-5 w-full">
										{event.event_id}
									</td>
									<td className="whitespace-nowrap p-5">
										<div>{format(new Date(event.timestamp), 'MMM dd, yyyy')}</div>
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
