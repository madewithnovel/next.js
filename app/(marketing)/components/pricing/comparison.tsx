import { CheckIcon, MinusIcon } from 'lucide-react';

export default function PricingComparison () {
	return (
		<div className="container flex flex-col mx-auto py-10 px-5 md:px-32">
			<div className="grid grid-cols-5 gap-5 text-lg">
				<div className="col-span-2 py-5">
					<div className="text-xl font-medium">Compare Plans</div>
				</div>
				<div className="text-center py-5">
					<div className="font-medium">Standard</div>
				</div>
				<div className="text-center py-5">
					<div className="font-medium">Business</div>
				</div>
				<div className="text-center py-5">
					<div className="font-medium">Enterprise</div>
				</div>
			</div>
			<hr/>
			<div className="flex flex-col divide-y divide-stone-200">
				<div className="grid grid-cols-5">
					<div className="col-span-2 py-5">
						Users
					</div>
					<div className="text-center py-5">Unlimited</div>
					<div className="text-center py-5">Unlimited</div>
					<div className="text-center py-5">Unlimited</div>
				</div>
				<div className="grid grid-cols-5">
					<div className="col-span-2 py-5">
						Workspaces
					</div>
					<div className="text-center py-5">5</div>
					<div className="text-center py-5">25</div>
					<div className="text-center py-5">Unlimited</div>
				</div>
				<div className="grid grid-cols-5">
					<div className="col-span-2 py-5">
						Chats
					</div>
					<div className="text-center py-5"><CheckIcon className="inline-flex" size={18}/></div>
					<div className="text-center py-5"><CheckIcon className="inline-flex" size={18}/></div>
					<div className="text-center py-5"><CheckIcon className="inline-flex" size={18}/></div>
				</div>
				<div className="grid grid-cols-5">
					<div className="col-span-2 py-5">
						Social Logins
					</div>
					<div className="text-center py-5">
						<MinusIcon className="inline-flex text-stone-300" size={18}/>
					</div>
					<div className="text-center py-5"><CheckIcon className="inline-flex" size={18}/></div>
					<div className="text-center py-5"><CheckIcon className="inline-flex" size={18}/></div>
				</div>
				<div className="grid grid-cols-5">
					<div className="col-span-2 py-5">
						Chat Backups
					</div>
					<div className="text-center py-5">
						<MinusIcon className="inline-flex text-stone-300" size={18}/>
					</div>
					<div className="text-center py-5">30 days</div>
					<div className="text-center py-5">Forever</div>
				</div>
				<div className="grid grid-cols-5">
					<div className="col-span-2 py-5">
						SSO
					</div>
					<div className="text-center py-5">
						<MinusIcon className="inline-flex text-stone-300" size={18}/>
					</div>
					<div className="text-center py-5">
						<MinusIcon className="inline-flex text-stone-300" size={18}/>
					</div>
					<div className="text-center py-5"><CheckIcon className="inline-flex" size={18}/></div>
				</div>
			</div>
		</div>
	);
}
