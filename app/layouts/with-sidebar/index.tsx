import { SidebarInset, SidebarProvider } from 'components/ui/sidebar';
import { cookies } from 'next/headers';

import { AppSidebar } from './app-sidebar';

export default async function Layout (props) {
	const cookieStore = await cookies();
	const defaultOpen = cookieStore.get('sidebar:state')?.value === 'true';

	return (
		<SidebarProvider defaultOpen={defaultOpen}>
			<AppSidebar/>
			<SidebarInset>
				{props.children}
			</SidebarInset>
		</SidebarProvider>
	);
}
