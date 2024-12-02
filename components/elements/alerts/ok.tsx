import { CheckCircle2Icon } from 'lucide-react';

export default function AlertOk (props) {
	const { children, title, actions } = props;
	return (
		<div className="rounded-md bg-green-50 p-4">
			<div className="flex">
				<div className="flex-shrink-0">
					<CheckCircle2Icon aria-hidden="true" className="h-6 w-6 text-green-400"/>
				</div>
				<div className="ml-3">
					<h3 className="font-medium text-green-800">{title}</h3>
					<div className="mt-2 text-green-700">
						{children}
					</div>
					{actions && (
						<div className="mt-4">
							<div className="-mx-2 -my-1.5 flex">
								<button
									type="button"
									className="rounded-md bg-green-50 px-2 py-1.5 font-medium text-green-800 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
								>
									View status
								</button>
								<button
									type="button"
									className="ml-3 rounded-md bg-green-50 px-2 py-1.5 font-medium text-green-800 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
								>
									Dismiss
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
