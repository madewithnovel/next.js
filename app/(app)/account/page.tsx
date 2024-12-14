import getAccountProfileRequest from 'app/api/requests/getAccountProfile';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from 'components/ui/breadcrumb';
import { Separator } from 'components/ui/separator';
import { SidebarTrigger } from 'components/ui/sidebar';

import LanguageSection from './language';
import NameSection from './name';
import NotificationSection from './notifications';
import PictureSection from './picture';
import Tabs from './tabs';
import ThemeSection from './theme';
import TimezoneSection from './timezone';
import WebsiteSection from './website';

async function getPage () {
	const response = await getAccountProfileRequest();
	if (response.ok) {
		return response.json();
	}
}

export default async function Page () {
	const { profile, settings } = await getPage();
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
								<BreadcrumbPage>Manage</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</div>
			</header>
			<div className="p-4 flex flex-col gap-10 pb-20 container mx-auto">
				<header>
					<h1 className="text-xl md:text-2xl font-medium tracking-tight mb-5">Account</h1>
					<Tabs selected="account"/>
				</header>
				<div className="flex flex-col gap-10">
					<NameSection profile={profile}/>
					<PictureSection profile={profile}/>
					<WebsiteSection profile={profile}/>
					<ThemeSection settings={settings}/>
					<TimezoneSection settings={settings}/>
					<LanguageSection settings={settings}/>
					<hr/>
					<NotificationSection settings={settings}/>
				</div>
			</div>
		</main>
	);
}
