'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { patchAccountSettingsUpdate } from 'app/api/requests/patchAccountSettingsUpdate';
import Button from 'components/elements/button';
import InlineNotify from 'components/elements/inline-notify';
import Select from 'components/elements/select';
import * as novel from 'novel/sdk';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const key = 'theme';

const schema = patchAccountSettingsUpdate.pick({ [key]: true });

export default function Theme ({ settings }) {
	const [saved, save] = useState(false);
	const [isWorking, working] = useState(false);
	const form = useForm({ defaultValues: settings, resolver: zodResolver(schema) });
	const { reset, register, handleSubmit, formState: { errors, defaultValues, dirtyFields } } = form;

	function submit (key) {
		return async (data) => {
			if (data[key] !== defaultValues[key]) {
				working(true);
				const response = await novel.rpc.AccountSettingsUpdate({ [key]: data[key] });
				save(true);
				working(false);
				if (response.ok) {
					reset(data);
				}
			}
		};
	}

	return (
		<section className="section">
			<header>
				<h3 className="font-medium">Appearance</h3>
				<p className="text-zinc-500">The site will change themes on your next restart.</p>
			</header>
			<div>
				<div className="flex items-center gap-2 w-full md:w-48">

					<Select
						form={form}
						className="w-full"
						defaultValue={settings.theme}
						options={[
							{ value: 'auto', label: 'System Default' },
							{ value: 'light', label: 'Light' },
							{ value: 'dark', label: 'Dark' },
						]}
						{...register(key)}
					/>
					{dirtyFields[key] && <Button variant="outline" working={isWorking} onClick={handleSubmit(submit(key))}>Save</Button>}
					<InlineNotify saved={saved} leave={() => save(false)} duration={6000}/>
				</div>
				{errors[key] && <div className="mt-2 text-destructive text-sm">{errors[key].message}</div>}
			</div>
		</section>
	);
}
