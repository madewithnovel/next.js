'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import * as novel from '@novel/next/sdk';
import { patchOrganizationUpdate } from 'app/api/requests/patchOrganizationUpdate';
import Button from 'components/elements/button';
import InlineNotify from 'components/elements/inline-notify';
import Input from 'components/elements/input';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const key = 'email';

const schema = patchOrganizationUpdate.pick({ [key]: true }).extend({
	[key]: z.string().email('Please provide a proper email address for this organization.'),
});

export default function Email ({ org }) {
	const [saved, save] = useState(false);
	const [isWorking, working] = useState(false);
	const { reset, register, handleSubmit, setError, formState: { errors, defaultValues, dirtyFields } } = useForm({ defaultValues: org, resolver: zodResolver(schema) });

	function submit (key) {
		return async (data) => {
			if (data[key] !== defaultValues[key]) {
				working(true);
				try {
					const response = await novel.rpc.OrganizationUpdate({ [key]: data[key] });
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
				<h3 className="font-medium">Billing Email</h3>
				<p className="text-muted-foreground">Organization email that can be used for support and billing purposes.</p>
			</header>
			<div>
				<div className="flex items-center gap-2 w-full md:w-96">
					<Input type="email" {...register(key)} onKeyDown={(e) => e.key === 'Enter' && handleSubmit(submit(key))(e)}/>
					{dirtyFields[key] && <Button variant="outline" working={isWorking} onClick={handleSubmit(submit(key))}>Save</Button>}
					<InlineNotify saved={saved} leave={() => save(false)} duration={6000}/>
				</div>
				{errors[key] && <div className="mt-2 text-destructive text-sm">{errors[key].message}</div>}
			</div>
		</section>
	);
}
