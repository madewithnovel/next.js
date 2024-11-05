'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { patchAccountUpdate } from 'app/api/requests/patchAccountUpdate';
import Button from 'components/elements/button';
import InlineNotify from 'components/elements/inline-notify';
import Input from 'components/elements/input';
import * as novel from 'novel/sdk';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const key = 'display_name';

const schema = patchAccountUpdate.pick({ [key]: true });

export default function Name ({ profile }) {
	const [saved, save] = useState(false);
	const [isWorking, working] = useState(false);
	const { reset, register, handleSubmit, setError, formState: { errors, defaultValues, dirtyFields } } = useForm({ defaultValues: profile, resolver: zodResolver(schema) });

	function submit (key) {
		return async (data) => {
			if (data[key] !== defaultValues[key]) {
				working(true);
				try {
					const response = await novel.rpc.AccountUpdate({ [key]: data[key] });
					if (response.ok) {
						save(true);
						reset(data);
					} else {
						const { error } = await response.json();
						setError(key, { type: 'manual', message: error.message });
					}
				} catch (error) {
					setError(key, { type: 'manual', message: error.message });
				}
				working(false);
			}
		};
	}

	return (
		<section className="section">
			<header>
				<h3 className="font-medium">Display Name</h3>
			</header>
			<div>
				<div className="flex items-center gap-2 w-full md:w-96">
					<Input type="text" {...register(key)} onKeyDown={(e) => e.key === 'Enter' && handleSubmit(submit(key))(e)} className="w-96"/>
					{dirtyFields[key] && <Button variant="outline" working={isWorking} onClick={handleSubmit(submit(key))}>Save</Button>}
					<InlineNotify saved={saved} leave={() => save(false)} duration={6000}/>
				</div>
				{errors[key] && <div className="mt-2 text-destructive text-sm">{errors[key].message}</div>}
			</div>
		</section>
	);
}
