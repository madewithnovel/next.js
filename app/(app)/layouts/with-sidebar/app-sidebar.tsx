'use client';

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail, SidebarTrigger } from 'components/ui/sidebar';
import * as React from 'react';

import SidebarMenu from '../../sidebar-menu';
import { NavMain } from './nav-main';
import { NavUser } from './nav-user';
import { OrgSwitcher } from './org-switcher';

export function AppSidebar (props) {
	return (
		<Sidebar collapsible="icon" className="py-2" {...props}>
			<SidebarHeader>
				<OrgSwitcher />
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={SidebarMenu} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
