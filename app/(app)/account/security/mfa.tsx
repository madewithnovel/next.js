'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { patchAccountSettingsUpdate } from 'app/api/requests/patchAccountSettingsUpdate';
import cx from 'clsx';
import Button from 'components/elements/button';
import InlineNotify from 'components/elements/inline-notify';
import OTPInput from 'components/elements/input/otp';
import Toggle from 'components/elements/toggle';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from 'components/ui/dialog';
import { Label } from 'components/ui/label';
import * as novel from 'novel/sdk';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const schema = patchAccountSettingsUpdate.pick({ marketing: true, newsletter: true });

export default function MFA ({ mfa }) {
	const [qr, setQr] = useState('');
	const [secret, setSecret] = useState('');
	const [hasMfa, setMfa] = useState(!!mfa);
	const [opened, toggleDialog] = useState(false);
	const [saved, save] = useState(false);
	const [isWorking, working] = useState(false);
	const { register, getValues, setError, setValue, formState: { errors }, reset } = useForm({ resolver: zodResolver(schema) });

	async function submit () {
		const token = getValues('token');
		working(true);
		try {
			const response = await novel.rpc.AccountMfaRegister({ token, secret });
			working(false);
			if (response.ok) {
				save(true);
				setValue('token', '');
				setMfa(true);
				toggleDialog(false);
			} else {
				const { error } = await response.json();
				setError('token', { type: 'manual', message: error.message });
			}
		} catch (error) {
			working(false);
			setError('token', { type: 'manual', message: error.message });
		}
	}

	async function toggle (state) {
		toggleDialog(state);
		setValue('token', '');
		if (state === true) {
			const response = await novel.rpc.AccountMfaGenerate();
			const { mfa } = await response.json();
			setQr(mfa.qr);
			setSecret(mfa.secret);
		}
	}

	return (
		<section className="section">
			<header>
				<div className="flex gap-2 items-center">
					<h3 className="text-xl font-medium">Multi-factor Authentication</h3>
				</div>
			</header>
			<div>
				<div className="flex flex-col divide-y divide-border">
					<div className="py-5 flex items-center justify-between">
						<div>
							Register an Authenticator
							<p className="text-muted-foreground">We'll ask for a verification code everytime you log in.</p>
						</div>
						<div className="flex items-center gap-5">
							<InlineNotify saved={saved} leave={() => save(false)} duration={6000}/>
							{!hasMfa && (
								<div onClick={() => toggle(true)}>
									<Toggle checked={hasMfa} />
								</div>
							)}
							{hasMfa && (
								<Toggle checked={hasMfa}/>
							)}
							<Dialog open={opened} onOpenChange={(state) => toggle(state)}>
								<DialogContent className="sm:max-w-[430px]">
									<DialogHeader>
										<DialogTitle>Register Authenticator</DialogTitle>
										<DialogDescription>
											Scan the QR code below on any authenticator app. We recommend{' '}
											<a className="text-foreground underline underline-offset-2" href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2">Google Authenticator</a>,{' '}
											<a className="text-foreground underline underline-offset-2" href="https://www.microsoft.com/security/mobile-authenticator-app">Microsoft Authenticator</a>,{' '}
											<a className="text-foreground underline underline-offset-2" href="https://freeotp.github.io/">FreeOTP</a>.
										</DialogDescription>
									</DialogHeader>
									<div className="flex flex-col items-center gap-10 py-10">
										<div className="aspect-square w-48 bg-zinc-200">
											{qr && <img src={qr} alt=""/>}
										</div>
										<div>
											<Label htmlFor="name" className="text-right">
												Token
											</Label>
											<OTPInput className={cx({ error: errors.password })} {...register('token')} />
										</div>
										{errors.token && (
											<div className="text-destructive text-center">{errors.token.message}</div>
										)}
									</div>
									<DialogFooter>
										<DialogClose asChild>
											<Button variant="outline">Cancel</Button>
										</DialogClose>
										<Button working={isWorking} onClick={() => submit()}>Register Authenticator</Button>
									</DialogFooter>
								</DialogContent>
							</Dialog>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
