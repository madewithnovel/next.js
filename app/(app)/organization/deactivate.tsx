'use client';

import getSession from '@novel/next/hooks/get-session';
import useSession from '@novel/next/hooks/use-session';
import * as novel from '@novel/next/sdk';
import cx from 'clsx';
import Button from 'components/elements/button';
import Input from 'components/elements/input';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from 'components/ui/dialog';
import { Label } from 'components/ui/label';
import store from 'packages/novel/store';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function Deactivate () {
	const session = useSession();
	const [isWorking, working] = useState(false);
	const { handleSubmit, register, setError, setFocus, formState: { errors } } = useForm();

	async function deactivate (data) {
		working(true);
		const current = session.organization.id;
		try {
			const deactivation = await novel.rpc.OrganizationDeactivate({ sudo_password: data.password });
			if (!deactivation.ok) {
				working(false);
				const { error } = await deactivation.json();
				setFocus('password');
				return setError('password', { type: 'manual', message: error.message });
			}
			const availableOrganizations = session.organizations.filter(org => org.id !== current);
			const response = await novel.rpc.SessionSwitch({ org_id: availableOrganizations[0].id });
			if (response.ok) {
				const session = await getSession();
				store.set('session', session);
				window.location.href = '/dashboard';
			}
		} catch (error) {
			setError('password', { type: 'manual', message: error.message });
		}
		working(false);
	}

	return (
		<section className="section">
			<header>
				<h3 className="font-medium">Delete Organization</h3>
				<p className="text-zinc-500">Permanently delete this organization. This action cannot be undone.</p>
			</header>
			<div className="flex items-center gap-2">
				<Dialog>
					<DialogTrigger asChild>
						<Button variant="destructive">Deactivate</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-[520px]">
						<DialogHeader>
							<DialogTitle>Are you sure you want to deactivate this organization?</DialogTitle>
							<DialogDescription>
								You are about to deactivate this organization. This action cannot be undone. Enter your Password to continue.
							</DialogDescription>
						</DialogHeader>
						<div className="grid gap-4 py-4">
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="password" className="text-right">
									Password
								</Label>
								<Input
									type="password"
									className={cx('col-span-3', { error: errors.password })}
									{...register('password')}
								/>
							</div>
							{errors.password && (
								<div className="grid grid-cols-4 items-center gap-4">
									<div></div>
									<div className="col-span-3 text-destructive">{errors.password.message}</div>
								</div>
							)}
						</div>
						<DialogFooter>
							<Button working={isWorking} variant="outline" onClick={handleSubmit(deactivate)}>Yes, Deactivate</Button>
							<DialogClose asChild>
								<Button>Cancel</Button>
							</DialogClose>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>
		</section>
	);
}
