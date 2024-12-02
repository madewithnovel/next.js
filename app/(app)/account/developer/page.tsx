import * as novel from '@novel/next/sdk';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from 'components/ui/breadcrumb';
import { Separator } from 'components/ui/separator';
import { SidebarTrigger } from 'components/ui/sidebar';

import Tabs from '../tabs';
import EventsSection from './events';
import ListSection from './list';

async function getPage () {
	const list = await novel.rpc.ApiKeyList();
	const events = await novel.rpc.ApiKeyAccess();
	if (list.ok) {
		return Promise.all([
			list.json(),
			events.json(),
		]);
	}
}

export default async function Page () {
	const [{ keys }, { events }] = await getPage();
	return (
		<main className="flex flex-1 flex-col gap-4 p-4 pt-0">
			<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
				<div className="flex items-center gap-2 px-4 container mx-auto">
					<SidebarTrigger className="-ml-1"/>
					<Separator orientation="vertical" className="mr-2 h-4"/>
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem className="hidden md:block">
								<BreadcrumbLink href="/organization">
									Account
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator className="hidden md:block"/>
							<BreadcrumbItem>
								<BreadcrumbPage>Developer</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</div>
			</header>
			<div className="p-4 flex flex-col gap-10 pb-20 container mx-auto">
				<header>
					<h1 className="text-xl md:text-2xl font-medium tracking-tight mb-5">Account</h1>
					<Tabs selected="developer"/>
				</header>
				<ListSection keys={keys}/>
				<EventsSection events={events}/>
			</div>
		</main>
	);
}
