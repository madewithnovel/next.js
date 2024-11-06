import Copybox from 'components/elements/copybox';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from 'components/ui/breadcrumb';
import { Separator } from 'components/ui/separator';
import { SidebarTrigger } from 'components/ui/sidebar';
import * as novel from 'novel/sdk';

import Deactivate from '../components/deactivate';
import MfaSection from '../components/mfa';
import PasswordSection from '../components/password';
import SessionsSection from '../components/sessions';
import Tabs from '../tabs';

async function getPage () {
	const response = await novel.rpc.AccountSecurity();
	if (response.ok) {
		return response.json();
	}
}

export default async function Page () {
	const { profile, mfa, sessions } = await getPage();
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
								<BreadcrumbPage>Security</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</div>
			</header>
			<div className="p-4 flex flex-col gap-10 pb-20 container mx-auto">
				<header>
					<h1 className="text-xl md:text-2xl font-medium tracking-tight mb-5">Account</h1>
					<Tabs selected="security"/>
				</header>
				<div className="flex flex-col gap-10">
					<section className="section">
						<header>
							<h3 className="font-medium">Email</h3>
						</header>
						<div>
							<div className="flex items-center gap-2 w-full md:w-72">
								<Copybox className="font-mono">{profile.email}</Copybox>
							</div>
							{profile.verified && (<p className="text-muted-foreground mt-2">Your email is verified</p>)}
							{!profile.verified && (<p className="text-destructive underline underline-offset-2 mt-2">Your email is not verified</p>)}
						</div>
					</section>
					{profile.password && <PasswordSection />}
					<hr/>
					<MfaSection mfa={mfa} profile={profile}/>
					<hr/>
					<SessionsSection sessions={sessions}/>
					<hr/>
					<Deactivate/>
				</div>
			</div>
		</main>
	);
}
