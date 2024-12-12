'use client';

import cx from 'clsx';
import Button from 'components/elements/button';
import Input from 'components/elements/input';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from 'components/ui/dialog';
import { Label } from 'components/ui/label';
import * as novel from '@/packages/next/sdk';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function Deactivate () {
	const [isWorking, working] = useState(false);
	const { handleSubmit, register, setError, setFocus, formState: { errors } } = useForm();

	async function deactivate (data) {
		working(true);
		try {
			const deactivation = await novel.rpc.AccountDeactivate({ sudo_password: data.password });
			if (!deactivation.ok) {
				working(false);
				const { error } = await deactivation.json();
				setFocus('password');
				return setError('password', { type: 'manual', message: error.message });
			}
			window.location.href = '/logout';
		} catch (error) {
			working(false);
			setError('password', { type: 'manual', message: error.message });
		}
	}
	return (
		<section className="section">
			<header>
				<h3 className="font-medium">Deactivate Account</h3>
				<p className="text-muted-foreground">Permanently delete this account. This action cannot be undone.</p>
			</header>
			<div className="flex items-center gap-2">
				<Dialog>
					<DialogTrigger asChild>
						<Button variant="destructive">Deactivate</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-[520px]">
						<DialogHeader>
							<DialogTitle>Are you sure you want to deactivate this account?</DialogTitle>
							<DialogDescription>
								You are about to deactivate this account. All your private information and details will be deleted. This action cannot be undone. Enter your Password to continue.
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
