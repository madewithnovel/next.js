'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import postAccountUpdatePasswordRequest, { request } from 'app/api/requests/postAccountUpdatePassword';
import cx from 'clsx';
import Button from 'components/elements/button';
import InlineNotify from 'components/elements/inline-notify';
import Input from 'components/elements/input';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from 'components/ui/dialog';
import { Label } from 'components/ui/label';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = request.extend({
	confirm_password: z.string(),
});

export default function Password () {
	const [saved, save] = useState(false);
	const [isWorking, working] = useState(false);
	const [passwordOpen, togglePasswordModal] = useState(false);
	const { handleSubmit, register, setError, setFocus, formState: { errors }, reset } = useForm({ resolver: zodResolver(schema) });

	async function submit (data) {
		if ((data.new_password !== data.confirm_password) || data.new_password.trim().length === 0) {
			setFocus('new_password');
			return setError('new_password', { type: 'manual', message: 'Your new password might have been mistyped. Please make sure you type it twice correctly.' });
		}
		working(true);
		try {
			const response = await postAccountUpdatePasswordRequest(data);
			working(false);
			if (response.ok) {
				togglePasswordModal(false);
				save(true);
				reset();
			} else {
				const { error } = await response.json();
				if (error.code === 'AUTH_ATTEMPT_INCORRECT') {
					setFocus('password');
					setError('password', { type: 'manual', message: error.message });
				} else {
					setError('new_password', { type: 'manual', message: error.message });
				}
			}
		} catch (error) {
			working(false);
			setError('new_password', { type: 'manual', message: error.message });
		}
	}

	return (
		<section className="section">
			<header>
				<h3 className="font-medium">Password</h3>
			</header>
			<div>
				<div className="flex items-center justify-between gap-2 w-full">
					<div className="w-full md:w-1/2">
						We recommend changing your password every 3 months to ensure that your account is secure.
					</div>
					<div className="flex items-center gap-5">
						<InlineNotify saved={saved} leave={() => save(false)} duration={6000}/>
						<Dialog open={passwordOpen} onOpenChange={togglePasswordModal}>
							<DialogTrigger asChild>
								<Button working={isWorking}>Change Password</Button>
							</DialogTrigger>
							<DialogContent className="sm:max-w-[640px]">
								<DialogHeader>
									<DialogTitle>Change Password</DialogTitle>
									<DialogDescription>
										You are about to change your password for this account.
									</DialogDescription>
								</DialogHeader>
								<div className="grid gap-4 py-4">
									<div className="grid grid-cols-4 items-center gap-4">
										<Label htmlFor="name" className="text-right">
											Current Password
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
									<div className="grid grid-cols-4 items-center gap-4">
										<div></div>
										<hr className="col-span-3"/>
									</div>
									<div className="grid grid-cols-4 items-center gap-4">
										<Label htmlFor="name" className="text-right">
											New Password
										</Label>
										<Input
											type="password"
											className={cx('col-span-3', { error: errors.new_password })}
											{...register('new_password')}
										/>
									</div>
									<div className="grid grid-cols-4 items-center gap-4">
										<Label htmlFor="username" className="text-right">
											Confirm
										</Label>
										<Input
											type="password"
											className={cx('col-span-3', { error: errors.new_password })}
											{...register('confirm_password')}
										/>
									</div>
									{errors.new_password && (
										<div className="grid grid-cols-4 items-center gap-4">
											<div></div>
											<div className="col-span-3 text-destructive">{errors.new_password.message}</div>
										</div>
									)}
								</div>
								<DialogFooter>
									<DialogClose asChild>
										<Button variant="outline">Cancel</Button>
									</DialogClose>
									<Button working={isWorking} onClick={handleSubmit(submit)}>Change Password</Button>
								</DialogFooter>
							</DialogContent>
						</Dialog>
					</div>
				</div>

			</div>
		</section>
	);
}
