'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import timezones from '@novel/next/constants/timezones.json';
import patchAccountSettingsUpdateRequest, { request } from 'app/api/requests/patchAccountSettingsUpdate';
import Button from 'components/elements/button';
import InlineNotify from 'components/elements/inline-notify';
import Select from 'components/elements/select';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const key = 'timezone';
const utcd = new Set();
timezones.forEach(timezone => {
	timezone.utc.forEach(utc => utcd.add(utc));
});

const schema = request.pick({ [key]: true });

export default function Timezone ({ settings }) {
	const [saved, save] = useState(false);
	const [isWorking, working] = useState(false);
	const form = useForm({ defaultValues: settings, resolver: zodResolver(schema) });
	const { reset, register, handleSubmit, formState: { errors, defaultValues, dirtyFields } } = form;

	function submit (key) {
		return async (data) => {
			if (data[key] !== defaultValues[key]) {
				working(true);
				const response = await patchAccountSettingsUpdateRequest({ [key]: data[key] });
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
				<h3 className="font-medium">Timezone</h3>
				<p className="text-zinc-500">Graphs and Reports will follow the timezone setting.</p>
			</header>
			<div>
				<div className="flex items-center gap-2 w-full md:w-72">
					<Select
						form={form}
						className="w-full"
						defaultValue={settings[key] ?? 'en'}
						options={Array.from(utcd).map(locale => ({ value: locale, label: locale }))}
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
