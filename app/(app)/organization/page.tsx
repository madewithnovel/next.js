import Copybox from 'components/elements/copybox';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from 'components/ui/breadcrumb';
import { Separator } from 'components/ui/separator';
import { SidebarTrigger } from 'components/ui/sidebar';
import * as novel from 'novel/sdk';

import DeactivateSection from './deactivate';
import EmailSection from './email';
import NameSection from './name';
import Tabs from './tabs';

async function getPage () {
	const response = await novel.rpc.OrganizationDetail();
	if (response.ok) {
		const data = await response.json();
		return data.organization;
	}
}

export default async function Page () {
	const org = await getPage();
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
								<BreadcrumbPage>Manage</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</div>
			</header>
			<div className="p-4 flex flex-col gap-10 pb-20 container mx-auto">
				<header>
					<h1 className="text-xl md:text-2xl font-medium tracking-tight mb-5">Organization</h1>
					<Tabs selected="organization"/>
				</header>
				<div className="flex flex-col gap-10">
					<section className="section">
						<header>
							<h3 className="font-medium">Organization ID</h3>
							<p className="text-zinc-500">This is the public name you can see to distinguish your organization.</p>
						</header>
						<div>
							<div className="flex items-center gap-2 w-full md:w-72">
								<Copybox className="font-mono">{org.id}</Copybox>
							</div>
						</div>
					</section>
					<NameSection org={org}/>
					<EmailSection org={org}/>
					<hr/>
					<DeactivateSection/>
				</div>
			</div>
		</main>
	);
}
