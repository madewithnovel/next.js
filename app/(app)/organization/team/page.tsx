import getOrganizationMembersRequest from 'app/api/requests/getOrganizationMembers';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from 'components/ui/breadcrumb';
import { Separator } from 'components/ui/separator';
import { SidebarTrigger } from 'components/ui/sidebar';

import Tabs from '../tabs';
import MembersSection from './members';

async function getPage () {
	const response = await getOrganizationMembersRequest();
	if (response.ok) {
		const data = await response.json();
		return data.members;
	}
}

export default async function Page () {
	const members = await getPage();
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
									Organization
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator className="hidden md:block"/>
							<BreadcrumbItem>
								<BreadcrumbPage>Team</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</div>
			</header>
			<div className="p-4 flex flex-col gap-10 pb-20 container mx-auto">
				<header>
					<h1 className="text-xl md:text-2xl font-medium tracking-tight mb-5">Organization</h1>
					<Tabs selected="team"/>
				</header>
				<MembersSection members={members} />
			</div>
		</main>
	);
}
