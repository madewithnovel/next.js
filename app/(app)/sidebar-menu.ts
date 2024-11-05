import { Building2Icon, HouseIcon, SquareKanbanIcon } from 'lucide-react';

export default [
	{
		title: 'Overview',
		url: '/dashboard',
		icon: HouseIcon,
		isActive: (pathname) => pathname === '/dashboard' || pathname === '/organization/activity',
		items: [
			{
				title: 'Overview',
				url: '/dashboard',
			},
			{
				title: 'Activity',
				url: '/organization/activity',
			},
		],
	},
	{
		title: 'Projects',
		url: '/projects',
		icon: SquareKanbanIcon,
		isActive: (pathname) => pathname.startsWith('/projects'),
		items: [
			{
				title: 'Projects',
				url: '/projects',
			},
			{
				title: 'Archived',
				url: '/projects/archived',
			},
		],
	},
	{
		title: 'Organization',
		url: '/organization',
		icon: Building2Icon,
		isActive: (pathname) => pathname.startsWith('/organization'),
		items: [
			{
				title: 'Manage',
				url: '/organization',
			},
			{
				title: 'Team',
				url: '/organization/team',
			},
			{
				title: 'Subscription',
				url: '/organization/subscription',
			},
		],
	},
];
