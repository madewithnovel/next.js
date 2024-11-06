'use client';

import useSession from 'components/hooks/use-session';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from 'components/ui/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from 'components/ui/sidebar';
import { ChevronsUpDown, Plus } from 'lucide-react';
import { useState } from 'react';

export function OrgSwitcher () {
	const { isMobile } = useSidebar();
	const session = useSession();
	const teams = session.organizations;
	const [activeTeam, setActiveTeam] = useState(teams[0]);

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<div className="flex aspect-square size-8 text-sm items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
								{activeTeam.name.split(' ').map(w => w[0]).join('').substring(0, 2)}
							</div>
							<div className="grid flex-1 text-left leading-tight">
								<span className="truncate font-medium">
									{activeTeam.name}
								</span>
								<span className="truncate text-xs capitalize">{activeTeam.type}</span>
							</div>
							<ChevronsUpDown className="ml-auto" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
						align="start"
						side={isMobile ? 'bottom' : 'right'}
						sideOffset={4}
					>
						<DropdownMenuLabel className="text-xs text-muted-foreground">
							Teams
						</DropdownMenuLabel>
						{teams.map((team) => (
							<DropdownMenuItem
								key={team.name}
								onClick={() => setActiveTeam(team)}
								className="gap-2 p-2"
							>
								<div className="flex size-6 items-center justify-center rounded-sm text-xs border">
									{activeTeam.name.split(' ').map(w => w[0]).join('').substring(0, 2)}
								</div>
								{team.name}
							</DropdownMenuItem>
						))}
						<DropdownMenuSeparator />
						<DropdownMenuItem className="gap-2 p-2">
							<div className="flex size-6 items-center justify-center rounded-md border bg-background">
								<Plus className="size-4" />
							</div>
							<div className="font-medium text-muted-foreground">Add team</div>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
