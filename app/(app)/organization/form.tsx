'use client';

import Copybox from 'components/elements/copybox';

import DeactivateSection from './components/deactivate';
import EmailSection from './components/email';
import NameSection from './components/name';

export default function Form ({ org }) {
	return (
		<div className="flex flex-col gap-10">
			<section className="section">
				<header>
					<h3 className="font-medium">Organization ID</h3>
					<p className="text-zinc-500">This is the public name you can see to distinguish your organization.</p>
				</header>
				<div>
					<div className="flex items-center gap-2 w-full md:w-72">
						<Copybox className="font-mono">{org.id}</Copybox>
					</div>
				</div>
			</section>
			<NameSection org={org} />
			<EmailSection org={org} />
			<hr/>
			<DeactivateSection />
		</div>
	);
}
