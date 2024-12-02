'use client';

import cx from 'classnames';
import Link from 'next/link';

const orgTabs = [
	{ id: 'organization', name: 'Manage', href: '/organization' },
	{ id: 'team', name: 'Team', href: '/organization/team' },
	{ id: 'subscription', name: 'Subscription', href: '/organization/subscription' },
	{ id: 'activity', name: 'Activity', href: '/organization/activity' },
];

export default function Tabs ({ selected }) {
	return (
		<nav className="-mb-px flex border-b" aria-label="Tabs">
			{orgTabs.map((tab) => (
				<Link
					key={tab.name}
					href={tab.href}
					className={cx(
						'text-black decoration-2 whitespace-nowrap px-5 pb-1',
						selected.startsWith(tab.id)
							? 'border-b-2 border-accent-foreground'
							: 'hover:text-accent-foreground',
					)}
				>
					{tab.name}
				</Link>
			))}
		</nav>
	);
}
