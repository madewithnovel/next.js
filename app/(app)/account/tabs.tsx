'use client';

import cx from 'classnames';
import Link from 'next/link';

const orgTabs = [
	{ id: 'account', name: 'Account', href: '/account' },
	{ id: 'security', name: 'Security', href: '/account/security' },
	{ id: 'organizations', name: 'Organizations', href: '/account/organizations' },
	{ id: 'notifications', name: 'Notifications', href: '/account/notifications' },
	{ id: 'developer', name: 'Developer', href: '/account/developer' },
	{ id: 'activity', name: 'Activity', href: '/account/activity' },
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
