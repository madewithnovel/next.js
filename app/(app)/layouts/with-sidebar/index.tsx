import { SidebarInset, SidebarProvider } from 'components/ui/sidebar';

import { AppSidebar } from './app-sidebar';

export default function Layout (props) {
	return (
		<SidebarProvider>
			<AppSidebar/>
			<SidebarInset>
				{props.children}
			</SidebarInset>
		</SidebarProvider>
	);
}
