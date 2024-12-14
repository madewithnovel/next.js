'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import getSession from '@novel/next/hooks/get-session';
import store from '@novel/next/store';
import postOrganizationCreateRequest, { Request, request } from 'app/api/requests/postOrganizationCreate';
import postSessionSwitchRequest from 'app/api/requests/postSessionSwitch';
import cx from 'clsx';
import Button from 'components/elements/button';
import Input from 'components/elements/input';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from 'components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from 'components/ui/dropdown-menu';
import { Label } from 'components/ui/label';
import { EllipsisIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

async function switchTo (org_id) {
	const response = await postSessionSwitchRequest({ org_id });
	if (response.ok) {
		const session = await getSession();
		store.set('session', session);
		window.location.href = '/dashboard';
	}
}

export function NewOrganization (props) {
	const { children, open, onOpenChange } = props;
	const [isWorking, working] = useState(false);
	const { handleSubmit, register, setError, formState: { errors }, reset } = useForm<Request>({ resolver: zodResolver(request) });

	async function create (data) {
		working(true);
		try {
			const response = await postOrganizationCreateRequest(data);
			working(false);
			if (response.ok) {
				const data = await response.json();
				reset();
				await switchTo(data.id);
			} else {
				const { error } = await response.json();
				setError('name', { type: 'manual', message: error.message });
			}
		} catch (error) {
			working(false);
			setError('name', { type: 'manual', message: error.message });
		}
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			{children && (
				<DialogTrigger asChild>
					{children}
				</DialogTrigger>
			)}
			<DialogContent className="sm:max-w-[520px]">
				<DialogHeader>
					<DialogTitle>Create Organization</DialogTitle>
					<DialogDescription>
						You are about to create a new organization. Ensure that you comply to our <a className="text-foreground underline underline-offset-2" href="/legal/terms">Terms of Use</a> and our <a className="text-foreground underline underline-offset-2" href="/legal/privacy">Privacy Policy</a> before proceeding.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-5 items-center gap-4">
						<Label htmlFor="name" className="text-right col-span-2">
							Organization Name
						</Label>
						<Input
							type="text"
							className={cx('col-span-3', { error: errors.name })}
							{...register('name')}
						/>
					</div>
					<div className="grid grid-cols-5 items-center gap-4">
						<Label htmlFor="username" className="text-right col-span-2">
							Billing Email
						</Label>
						<Input
							type="email"
							className={cx('col-span-3', { error: errors.email })}
							{...register('email')}
						/>
					</div>
					{errors.name && (
						<div className="grid grid-cols-5 items-center gap-4">
							<div className="col-span-2"></div>
							<div className="col-span-3 text-destructive">{errors.name.message}</div>
						</div>
					)}
				</div>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline">Cancel</Button>
					</DialogClose>
					<Button working={isWorking} onClick={handleSubmit(create)}>Create Organization</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

export default function Organizations ({ organizations }) {
	return (
		<section className="section">
			<header>
				<div className="flex justify-end">
					<NewOrganization>
						<Button variant="outline">New Organization</Button>
					</NewOrganization>
				</div>
			</header>
			<div>
				<table className="min-w-full divide-y divide-border">
					<thead>
						<tr>
							<th className="w-12 py-3.5 pl-4 pr-3 text-center text-sm font-medium sm:pl-0">Type</th>
							<th className="px-3 py-3.5 text-left text-sm font-medium">Device</th>
							<th/>
						</tr>
					</thead>
					<tbody className="divide-y divide-border">
						{organizations.map(org => (
							<tr key={org.id}>
								<td className="flex items-center justify-center py-2 pl-4 pr-3 sm:pl-0">
									<div className="h-10 w-10 text-sm rounded bg-muted p-2 font-medium flex items-center justify-center">
										{org.name.toUpperCase().split(' ').map(word => word[0]).join('').substring(0, 2)}
									</div>
								</td>
								<td className="whitespace-nowrap px-3 py-2 w-full">{org.name}</td>
								<td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-right sm:pr-0">
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<button className="button outline xs">
												<EllipsisIcon/>
											</button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end">
											<DropdownMenuItem onClick={() => switchTo(org.id)}>Switch to&hellip;</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</section>
	);
}
