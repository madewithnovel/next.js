'use client';

import deleteOrganizationInviteRejectRequest from 'app/api/requests/deleteOrganizationInviteReject';
import postOrganizationInviteAcceptRequest from 'app/api/requests/postOrganizationInviteAccept';
import AlertOk from 'components/elements/alerts/ok';
import Button from 'components/elements/button';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';
import { useState } from 'react';

export default function List ({ invites: hydratedInvites }) {
	const [invites, setInvites] = useState(hydratedInvites);
	const [isWorking, working] = useState(false);
	const [accepted, setAccepted] = useState(false);

	async function accept (invite) {
		working(true);
		await postOrganizationInviteAcceptRequest({ invitation_code: invite.invitation_code });
		setInvites(invites.filter((i) => i.invitation_code !== invite.invitation_code));
		setAccepted(true);
		working(false);
	}

	async function reject (invite) {
		working(true);
		await deleteOrganizationInviteRejectRequest({ invitation_code: invite.invitation_code });
		setInvites(invites.filter((i) => i.invitation_code !== invite.invitation_code));
		working(false);
	}

	return (
		<>
			{accepted && (
				<AlertOk title="Invitation accepted">
					You have accepted the invitation to join an organization. You may select it in your dashboard.
				</AlertOk>
			)}
			{invites.length > 0 && (
				<div className="flex flex-col gap-1 divide-y divide-border border rounded-md">
					{invites.map((invite, i) => (
						<div key={i} className="flex items-center justify-between gap-10">
							<div className="flex-1 p-5"><span className="font-medium">{invite.organization.name}</span> invites you to join their organization</div>
							<div>{invite.expired === true ? 'Expired' : ''}</div>
							<div className="text-sm">Expires in {formatDistanceToNow(new Date(invite.expires_at))}</div>
							<div className="flex items-center gap-2 p-2">
								{invite.expired !== true && <Button working={isWorking} size="sm" onClick={() => accept(invite)}>Accept</Button>}
								<Button working={isWorking} size="sm" variant="outline" onClick={() => reject(invite)}>Reject</Button>
							</div>
						</div>
					))}
				</div>
			)}
		</>
	);
}
