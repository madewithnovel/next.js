'use client';

import cx from 'clsx';
import AlertError from 'components/elements/alerts/error';
import Button from 'components/elements/button';
import Input from 'components/elements/input';
import { Avatar, AvatarFallback, AvatarImage } from 'components/ui/avatar';
import { Checkbox } from 'components/ui/checkbox';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from 'components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from 'components/ui/dropdown-menu';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from 'components/ui/sheet';
import { EllipsisIcon, PlusIcon } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import * as novel from 'novel/sdk';
import { useState } from 'react';

import AlertOk from '@/components/elements/alerts/ok';

export default function Members ({ members: hydratedMemebrs }) {
	const query = useSearchParams();
	const [members, setMembers] = useState(hydratedMemebrs);
	const [isWorking, working] = useState(false);
	const [errors, setErrors] = useState({ remove: undefined, promote: undefined, invite: undefined });
	const [focus, setFocus] = useState({});
	const [invite, setInvite] = useState({ emails: '' });
	const [revokeModal, revokeConfirm] = useState(false);
	const [promoteModal, promoteConfirm] = useState(false);

	async function sendInvites () {
		if (invite.role) {
			working(true);
			const response = await novel.rpc.OrganizationInvite({
				invites: invite.emails.split(',').map(email => ({ email, roles: [invite.role] })),
			});
			working(false);
			if (!response.ok) {
				const { error } = await response.json();
				setErrors({ invite: error.message });
			} else {
				window.location.href = '/organization/team?invited';
			}
		}
	}

	async function promote (member) {
		promoteConfirm(true);
		setFocus(member);
	}

	async function revoke (member) {
		revokeConfirm(true);
		setFocus(member);
	}

	async function forRevocation () {
		if (focus) {
			working(true);
			const response = await novel.rpc.OrganizationMembersRemove({ account_id: focus.id });
			working(false);
			if (!response.ok) {
				const { error } = await response.json();
				setErrors({ remove: error.message });
			} else {
				const newMembers = members.filter(member => member.id !== focus.id);
				setMembers(newMembers);
			}
			revokeConfirm(false);
		}
	}

	async function forPromotion () {
		if (focus) {
			if (hydratedMemebrs.find(member => member.id === focus.id).role !== focus.role) {
				working(true);
				const response = await novel.rpc.OrganizationMembersPromote({ account_id: focus.id, roles: [focus.role] });
				working(false);
				if (!response.ok) {
					const { error } = await response.json();
					setErrors({ promote: error.message });
				}
				promoteConfirm(false);
			}
		}
	}

	return (
		<div className="flex flex-col gap-10">
			<div className="flex justify-end">
				<Dialog>
					<DialogTrigger asChild>
						<Button working={isWorking}>
							<PlusIcon />
							New member
						</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-[520px]">
						<DialogHeader>
							<DialogTitle>Invite Members</DialogTitle>
						</DialogHeader>
						<div className="grid gap-4 py-4">
							<div>Add the email addresses of the people you'd like to invite to your organization.</div>
							<div>
								<Input placeholder="ada@twist.com, joe@smith.net..." onChange={(e) => setInvite({ ...invite, emails: e.target.value })} value={invite.emails}/>
							</div>
							<div className="flex flex-col">
								<div className="bg-muted px-5 py-2 font-medium">
									Administrator Roles
								</div>
								<div className="flex flex-col divide-y divide-border">
									<div className="flex items-center space-x-2 p-5 hover:bg-muted/10">
										<Checkbox id="role:admin" checked={invite.role === 'admin'} onCheckedChange={(state) => state === true && setInvite({ ...invite, role: 'admin' })}/>
										<label htmlFor="role:admin" className="leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
											Administrator
										</label>
									</div>
								</div>
								<div className="bg-muted px-5 py-2 font-medium">
									Non-Administrator Roles
								</div>
								<div className="flex flex-col divide-y divide-border">
									<div className="flex items-center space-x-2 p-5 hover:bg-muted/10">
										<Checkbox id="role:user" checked={invite.role === 'user'} onCheckedChange={(state) => state === true && setInvite({ ...invite, role: 'user' })}/>
										<label htmlFor="role:user" className="leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
											User
										</label>
									</div>
								</div>
							</div>
						</div>
						<DialogFooter>
							<DialogClose asChild>
								<Button variant="outline">Cancel</Button>
							</DialogClose>
							<Button working={isWorking} onClick={() => sendInvites()}>Send Invites</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>
			<section className="section">
				<div>
					{query.has('invited') && !(errors.remove || errors.promote) && (
						<AlertOk title="Your team invitation has been sent">
							Your team has received the invitation you have just sent. Please let them know as the links will expire in 3 days.
						</AlertOk>
					)}
					{errors.remove && (
						<AlertError title="Cannot remove user">
							{errors.remove}
						</AlertError>
					)}
					{errors.promote && (
						<AlertError title="Cannot continue with role change">
							{errors.promote}
						</AlertError>
					)}
					<table className="min-w-full divide-y divide-border">
						<thead>
							<tr>
								<th colSpan={2} className="py-3.5 pl-4 pr-3 text-left text-sm font-medium sm:pl-0">Member</th>
								<th className="px-3 py-3.5 text-left text-sm font-medium">Roles</th>
								<th className="px-3 py-3.5 text-left text-sm font-medium">Status</th>
								<th className="w-24 px-3 py-3.5 text-left text-sm font-medium">MFA</th>
								<th/>
							</tr>
						</thead>
						<tbody className="divide-y divide-border">
							{members.map(member => (
								<tr key={member.id} className={cx({ 'pointer-events-none opacity-50': isWorking })}>
									<td className="w-14">
										<Avatar className="h-10 w-10 rounded-lg">
											<AvatarImage src={member.picture} alt={member.display_name ?? member.email}/>
											<AvatarFallback className="rounded-lg uppercase">{(member.display_name ?? member.email).substring(0, 2)}</AvatarFallback>
										</Avatar>
									</td>
									<td className="py-2 pl-4 pr-3 sm:pl-0">
										<div className="font-medium">{member.display_name ?? member.email}</div>
										<span className="text-muted-foreground">{member.email}</span>
									</td>
									<td className="whitespace-nowrap px-3 py-2 capitalize">
										{member.role}
									</td>
									<td className="whitespace-nowrap px-3 py-2 capitalize">
										{member.status}
									</td>
									<td className="whitespace-nowrap px-3 py-2">
										{member.mfa && <div className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">Enabled</div>}
										{!member.mfa && <div className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">MFA Required</div>}
									</td>
									<td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-right sm:pr-0">
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<button className="button secondary xs">
													<EllipsisIcon/>
												</button>
											</DropdownMenuTrigger>
											<DropdownMenuContent align="end">
												<DropdownMenuItem onClick={() => promote(member)}>Change Role&hellip;</DropdownMenuItem>
												<DropdownMenuItem onClick={() => revoke(member)}>Revoke Membership</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</td>
								</tr>
							))}

							<Sheet open={promoteModal} onOpenChange={promoteConfirm}>
								<SheetContent>
									<SheetHeader>
										<SheetTitle>Change role of {focus.display_name ?? focus.email}</SheetTitle>
										<SheetDescription>
											This user will have their new role applied immediately. Please ensure you have the right access control in your organization before proceeding.
										</SheetDescription>
									</SheetHeader>
									<div className="grid gap-4 py-4">
										<div className="flex flex-col">
											<div className="bg-muted px-5 py-2 font-medium">
												Administrator Roles
											</div>
											<div className="flex flex-col divide-y divide-border">
												<div className="flex items-center space-x-2 p-5 hover:bg-muted/10">
													<Checkbox id="role:admin" checked={focus.role === 'admin'} onCheckedChange={(state) => state === true && setFocus({ ...focus, role: 'admin' })}/>
													<label htmlFor="role:admin" className="leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
														Administrator
													</label>
												</div>
											</div>
											<div className="bg-muted px-5 py-2 font-medium">
												Non-Administrator Roles
											</div>
											<div className="flex flex-col divide-y divide-border">
												<div className="flex items-center space-x-2 p-5 hover:bg-muted/10">
													<Checkbox id="role:user" checked={focus.role === 'user'} onCheckedChange={(state) => state === true && setFocus({ ...focus, role: 'user' })}/>
													<label htmlFor="role:user" className="leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
														User
													</label>
												</div>
											</div>
										</div>
									</div>
									<SheetFooter>
										<SheetClose asChild>
											<Button variant="outline">Cancel</Button>
										</SheetClose>
										<Button working={isWorking} onClick={() => forPromotion()}>Confirm Roles</Button>
									</SheetFooter>
								</SheetContent>
							</Sheet>

							<Dialog open={revokeModal} onOpenChange={revokeConfirm}>
								<DialogContent className="sm:max-w-[520px]">
									<DialogHeader>
										<DialogTitle>Are you sure you want to revoke this user?</DialogTitle>
										<DialogDescription>
											You are about to remove this user from your organization. You can invite this user again in the future.
										</DialogDescription>
									</DialogHeader>
									<DialogFooter>
										<DialogClose asChild>
											<Button variant="outline">Cancel</Button>
										</DialogClose>
										<Button working={isWorking} onClick={() => forRevocation()}>Yes, Remove User</Button>
									</DialogFooter>
								</DialogContent>
							</Dialog>
						</tbody>
					</table>
				</div>
			</section>
		</div>
	);
}
