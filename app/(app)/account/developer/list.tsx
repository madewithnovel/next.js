'use client';

import Button from 'components/elements/button';
import Copybox from 'components/elements/copybox';
import Input from 'components/elements/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from 'components/ui/dropdown-menu';
import { Label } from 'components/ui/label';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from 'components/ui/sheet';
import { format } from 'date-fns/format';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';
import { EllipsisIcon, PlusIcon } from 'lucide-react';
import * as novel from 'novel/sdk';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function List ({ keys: hydratedKeys }) {
	const [keys, setKeys] = useState(hydratedKeys);
	const [createModal, toggleCreateModal] = useState(false);
	const [isWorking, working] = useState(false);
	const { handleSubmit, register, setError, formState: { errors }, reset } = useForm();

	async function submit (data) {
		working(true);
		try {
			data.expiry = (data.expiry > 90 || data.expiry <= 0 ? 30 : data.expiry) + 'd';
			const response = await novel.rpc.ApiKeyGenerate(data);
			if (response.ok) {
				const { key } = await response.json();
				setKeys([key, ...keys]);
				toggleCreateModal(false);
				reset({ label: '', expiry: '30' });
			} else {
				const { error } = await response.json();
				setError('label', { type: 'manual', message: error.message });
			}
		} catch (error) {
			setError('label', { type: 'manual', message: error.message });
		}
		working(false);
	}

	async function revoke (key) {
		working(true);
		try {
			const response = await novel.rpc.ApiKeyRevoke({ access_id: key.access_id });
			if (response.ok) {
				setKeys(keys.filter(k => k.access_id !== key.access_id));
			} else {
				const { error } = await response.json();
				setError('label', { type: 'manual', message: error.message });
			}
		} catch (error) {
			setError('label', { type: 'manual', message: error.message });
		}
		working(false);
	}

	return (
		<section className="section border rounded-md divide-y divide-border">
			<header className="p-5">
				<div className="flex gap-2 items-center justify-between">
					<div>
						<h3 className="text-lg font-medium">Restricted Keys</h3>
						<p className="text-muted-foreground">Create a key with specific access limits and permissions for greater security.</p>
					</div>
					<div>
						<Button working={isWorking} onClick={() => toggleCreateModal(true)} variant="outline" size="sm">
							<PlusIcon/>
							Create API Key
						</Button>
					</div>
				</div>
			</header>
			<table className="min-w-full divide-y divide-border">
				<thead>
					<tr>
						<th className="py-3.5 pl-5 text-left text-sm font-medium">Name</th>
						<th className="px-3 py-3.5 text-left text-sm font-medium">Token</th>
						<th className="px-3 py-3.5 text-left text-sm font-medium">Created</th>
						<th className="px-3 py-3.5 text-left text-sm font-medium">Last used</th>
						<th/>
					</tr>
				</thead>
				<tbody className="divide-y divide-border">
					{keys.length === 0 && (
						<tr>
							<td colSpan={5} className="py-20 text-center">
								No keys are available for use.
							</td>
						</tr>
					)}
					{keys.map(key => (
						<tr key={key.access_id}>
							<td className="py-3 pl-5 pr-3">
								<div className="font-medium">{key.label}</div>
								<span className="text-sm">{key.expires_at && `Expires in ${formatDistanceToNow(new Date(key.expires_at))}`}</span>
							</td>
							<td className="px-3 py-3 font-mono">
								<Copybox className="font-mono" value={key.secret_key}>{key.secret_key.substring(0, 23)}&hellip;</Copybox>
							</td>
							<td className="px-3 py-3 text-sm">
								{format(new Date(key.created_at), 'MMM dd, yyyy')}
							</td>
							<td className="px-3 py-3 text-sm">
								{key.last_used ? format(new Date(key.last_used), 'MMM dd, yyyy') : <>&ndash;</>}
							</td>
							<td className="relative whitespace-nowrap py-3 pl-3 pr-5 text-right">
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<button className="button outline xs"><EllipsisIcon /></button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="end">
										<DropdownMenuItem onClick={() => revoke(key)}>Delete key&hellip;</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			<Sheet open={createModal} onOpenChange={toggleCreateModal}>
				<SheetContent className="w-full sm:w-[640px]">
					<SheetHeader>
						<SheetTitle>Create an API Key</SheetTitle>
						<SheetDescription>
							You are about to create an API key that have limited permissions to access resources within this service.
						</SheetDescription>
					</SheetHeader>
					<div className="grid gap-4 py-4">
						<div className="flex flex-col gap-2">
							<Label htmlFor="label">Description</Label>
							<p className="text-sm text-muted-foreground">Add an optional description for the key.</p>
							<Input id="label" {...register('label')}/>
						</div>
						{errors.label && <div className="text-destructive text-sm">{errors.label.message}</div>}
						<div className="flex flex-col gap-2">
							<Label htmlFor="expiry">Expires</Label>
							<p className="text-sm text-muted-foreground">Number of days this key is valid for.</p>
							<div className="flex gap-2 items-center">
								<Input id="expiry" type="number" defaultValue={30} min={1} max={90} {...register('expiry')} className="w-24"/> Days
							</div>
							<p className="text-sm text-muted-foreground">Must be between 1 and 90 days.</p>
						</div>
					</div>
					<SheetFooter>
						<SheetClose asChild>
							<Button variant="outline">Cancel</Button>
						</SheetClose>
						<Button working={isWorking} onClick={handleSubmit(submit)}>Create API Key</Button>
					</SheetFooter>
				</SheetContent>
			</Sheet>
		</section>
	);
}
