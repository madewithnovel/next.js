'use client';

import useSession from '@novel/next/hooks/use-session';
import { Avatar, AvatarFallback, AvatarImage } from 'components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from 'components/ui/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from 'components/ui/sidebar';
import { BellIcon, ChevronsUpDown, CreditCardIcon, LogOutIcon, SquareTerminalIcon, UserIcon } from 'lucide-react';
import Link from 'next/link';

export function NavUser () {
	const { isMobile } = useSidebar();
	const session = useSession();
	const user = session.user;

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<Avatar className="h-8 w-8 rounded-lg">
								<AvatarImage src={user.picture} alt={user.display_name?.length > 0 ? user.display_name : user.email} />
								<AvatarFallback className="rounded-lg uppercase">{(user.display_name?.length > 0 ? user.display_name : user.email).substring(0, 2)}</AvatarFallback>
							</Avatar>
							<div className="grid flex-1 text-left leading-tight">
								<span className="truncate font-medium">{user.display_name?.length > 0 ? user.display_name : user.email}</span>
								<span className="truncate text-xs">{user.email}</span>
							</div>
							<ChevronsUpDown className="ml-auto size-4" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
						side={isMobile ? 'bottom' : 'right'}
						align="end"
						sideOffset={4}
					>
						<DropdownMenuLabel className="p-0 font-normal">
							<div className="flex items-center gap-2 px-1 py-1.5 text-left">
								<Avatar className="h-8 w-8 rounded-lg">
									<AvatarImage src={user.picture} alt={user.display_name ?? user.email} />
									<AvatarFallback className="rounded-lg uppercase">{(user.display_name ?? user.email).substring(0, 2)}</AvatarFallback>
								</Avatar>
								<div className="grid flex-1 text-left leading-tight">
									<span className="truncate font-medium">{user.display_name ?? user.email}</span>
									<span className="truncate text-xs">{user.email}</span>
								</div>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<Link href="/organization/subscription">
								<DropdownMenuItem>
									<CreditCardIcon />
									Manage Subscription
								</DropdownMenuItem>
							</Link>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<Link href="/account">
								<DropdownMenuItem>
									<UserIcon />
									Account
								</DropdownMenuItem>
							</Link>
							<Link href="/account/developer">
								<DropdownMenuItem>
									<SquareTerminalIcon />
									Developer
								</DropdownMenuItem>
							</Link>
							<Link href="/account/notifications">
								<DropdownMenuItem>
									<BellIcon />
									Notifications
								</DropdownMenuItem>
							</Link>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<Link href="/session/end">
							<DropdownMenuItem>
								<LogOutIcon />
								Log out
							</DropdownMenuItem>
						</Link>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
