import { format } from 'date-fns/format';

export default function List ({ events }) {
	return (
		<section className="section">
			{(!events || events.length === 0) && (
				<div className="py-20 text-center border-t border rounded-md">
					No activity yet
				</div>
			)}
			{events.length > 0 && (
				<div className="flex flex-col gap-10">
					<table className="min-w-full divide-y divide-border">
						<thead>
							<tr>
								<th className="w-12 py-3.5 pl-4 pr-3 text-left text-sm font-medium sm:pl-0">Event</th>
								<th className="px-3 py-3.5 text-right text-sm font-medium">ID</th>
								<th className="px-3 py-3.5 text-left text-sm font-medium">Date</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-border align-top">
							{events.map(event => (
								<tr key={event.event_id}>
									<td className="py-5 pl-4 pr-3 sm:pl-0 w-full">
										{event.message}
									</td>
									<td className="whitespace-nowrap text-sm font-mono p-5 w-full">
										{event.event_id}
									</td>
									<td className="whitespace-nowrap p-5 pr-0">
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
