'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import locales from '@novel/next/constants/locales.json';
import patchAccountSettingsUpdateRequest, { request } from 'app/api/requests/patchAccountSettingsUpdate';
import Button from 'components/elements/button';
import InlineNotify from 'components/elements/inline-notify';
import Select from 'components/elements/select';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const key = 'language';

const schema = request.pick({ [key]: true });
type Schema = z.infer<typeof schema>

export default function Language ({ settings }) {
	const [saved, save] = useState(false);
	const [isWorking, working] = useState(false);
	const form = useForm<Schema>({ defaultValues: settings, resolver: zodResolver(schema) });
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
				<h3 className="font-medium">Language</h3>
			</header>
			<div>
				<div className="flex items-center gap-2 w-full md:w-64">
					<Select
						form={form}
						className="w-full"
						defaultValue={settings[key] ?? 'en'}
						options={locales.map(locale => ({ value: locale.code, label: locale.name }))}
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
