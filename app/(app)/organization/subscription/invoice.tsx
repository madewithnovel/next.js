import format from 'date-fns/format';
import { DownloadIcon } from 'lucide-react';

export default function Invoice ({ charges }) {
	return (
		<section className="section">
			<header>
				<div className="flex gap-2 items-center">
					<h3 className="text-xl font-medium">Invoices</h3>
				</div>
				<p className="text-muted-foreground">Places where you're logged in.</p>
			</header>
			<div>
				<table className="min-w-full divide-y divide-border">
					<thead>
						<tr>
							<th className="w-48 py-3.5 pl-4 pr-3 text-left text-sm font-medium sm:pl-0">Invoice</th>
							<th className="px-3 py-3.5 text-left text-sm font-medium">Detail</th>
							<th/>
						</tr>
					</thead>
					<tbody className="divide-y divide-border text-sm">
						{charges && charges.map(charge => (
							<tr key={charge.number} className="hover:bg-muted">
								<td className="text-nowrap py-2 pl-4 pr-3 sm:pl-0">
									<div className="flex items-center">
										{charge.number}
									</div>
								</td>
								<td className="whitespace-nowrap px-3 py-2 w-full">
									<div className="flex items-center">
										{charge.status === 'paid' && (
											<>
												Paid {charge.amount} on {' '}
												{format(charge.paid_at, 'MMM dd, yyyy')}{' '}
												by {charge.email}
											</>
										)}
										{charge.status !== 'paid' && (
											<>
												Processing invoice amount of {charge.amount}. Please check back later.
											</>
										)}
									</div>
								</td>
								<td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-right sm:pr-0">
									<div className="flex items-center gap-2">
										{charge.invoice_pdf && (
											<a href={charge.invoice_pdf} target="_blank" className="button outline xs">
												<DownloadIcon size={16}/>
											</a>
										)}
										{!charge.invoice_pdf && (
											<button disabled className="button outline xs">
												<DownloadIcon size={16}/>
											</button>
										)}
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</section>
	);
}
