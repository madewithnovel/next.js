'use client';

import patchAccountUpdateRequest from 'app/api/requests/patchAccountUpdate';
import cx from 'classnames';
import InlineNotify from 'components/elements/inline-notify';
import Upload from 'components/elements/upload';
import Image from 'next/image';
import { useState } from 'react';

export default function Picture ({ profile }) {
	const [picture, setPicture] = useState(profile.picture);
	const [saved, save] = useState(false);
	const [error, setError] = useState(null);
	const [isWorking, working] = useState(false);

	async function submit (picture) {
		setPicture(picture);
		working(true);
		try {
			const response = await patchAccountUpdateRequest({ picture });
			if (response.ok) {
				save(true);
			} else {
				setPicture(profile.picture);
				const { error } = await response.json();
				setError(error.message);
			}
		} catch (error) {
			setError(error.message);
		}
		working(false);
	}

	return (
		<div className="section">
			<header>
				<h3 className="font-medium">Picture</h3>
				<p className="text-zinc-500">
					This is your avatar. Click on the avatar to upload a custom one from your files.</p>
			</header>
			<div className="flex items-start justify-between">
				<div className="flex-1 flex flex-col">
					<div className="flex gap-2 items-center">
						<Upload
							disabled={isWorking}
							options={{
								maxFiles: 1,
								accept: {
									'image/png': [],
									'image/jpeg': [],
									'image/webp': [],
								},
							}}
							onStart={() => working(true)}
							onChange={(picture) => submit(picture)}
						>
							<div
								className={cx({ 'opacity-50': isWorking }, 'cursor-pointer h-20 w-20 relative rounded-lg my-2 overflow-hidden', { 'bg-black': !picture })}>
								{picture &&
									<Image
										src={picture}
										alt="avatar"
										fill={true}
										className="h-full w-full object-cover"
									/>}
							</div>
						</Upload>
						<InlineNotify saved={saved} leave={() => save(false)} duration={6000}/>
					</div>
					{error && <div className="mt-2 text-destructive text-sm">{error}</div>}
				</div>
			</div>
		</div>
	);
}
