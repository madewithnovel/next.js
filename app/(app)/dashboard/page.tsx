import getSession from 'components/hooks/get-session';
import { ArrowUpRightIcon, ChevronRightIcon, EllipsisIcon } from 'lucide-react';
import Link from 'next/link';

export default async function Page () {
	const session = await getSession();
	return (
		<main className="flex flex-1 flex-col gap-4 p-4 pt-0">
			<div className="p-4 flex flex-col gap-5 pb-20 container mx-auto">
				<div className="pt-10">
					<h1 className="text-3xl font-medium">Welcome back, {session.user.display_name ?? session.user.email}</h1>
					<p className="text-muted-foreground text-xl">Browse our <a href="https://novel.dev/docs" target="_blank" className="underline decoration-muted-foreground underline-offset-2">documentation</a> to start using Novel.</p>
				</div>
				<h4 className="font-medium">Next Steps</h4>
				<div className="border border-zinc-200 rounded-md">
					<div className="p-6">
						<div>
							<div className="text-xl font-medium">Getting Started</div>
							<div className="py-1">You have already saved 400+ hours by using Novel, now let's ship!</div>
							<div className="flex flex-col">
								<div className="py-5">
									<div className="flex gap-5">
										<div className="mt-0.5 h-6 w-6 font-medium shrink-0 text-sm flex items-center justify-center bg-zinc-200 rounded">
											<div>1</div>
										</div>
										<div className="flex flex-col gap-2 w-full">
											<div className="font-medium">Describe your Feature</div>
											<p>The first thing you should do is create a starting point for you to start writing features.</p>
											<p>The CLI helper below will create migrations, endpoints, models, services, and UI for you.</p>
											<div className="bg-black text-white px-3 py-2 flex flex-col w-3/4 rounded-md">
												<code><span className="text-green-500">~</span> novel new feature feature-1 feature-2</code>
												<code className="text-zinc-500">creating feature templates...</code>
											</div>
											<p>Learn more about <a href="https://novel.dev/guides/feature-templates" className="text-blue-600 inline-flex items-center">Feature Templates <ArrowUpRightIcon size={17}/></a></p>
										</div>
									</div>
								</div>
								<div className="py-5">
									<div className="flex gap-5">
										<div className="mt-0.5 h-6 w-6 font-medium shrink-0 text-sm flex items-center justify-center bg-zinc-200 rounded">
											<div>2</div>
										</div>
										<div className="flex flex-col gap-2">
											<div className="font-medium">Design a new Page</div>
											<p>Novel comes with a prebuilt interface for both marketing and application layers. These are written in JSX and use tailwindcss for styling.</p>
											<p>There are plenty of UI templates out there that you can use, both free or paid</p>
											<div className="grid grid-cols-2 gap-5 py-5 w-2/3">
												<div className="h-32 border border-zinc-200 rounded">

												</div>
												<div className="h-32 border border-zinc-200 rounded">

												</div>
											</div>
											<p>If you require custom design work, Novel offers this service at a custom fixed price. Send us a note at hello@novel.dev if you are interested.</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="bg-white border border-zinc-200 rounded-md">
					<div className="p-6 relative">
						<div className="w-2/3">
							<div className="text-xl font-medium">Join the Novel Community</div>
							<p className="mt-2 mb-5">Connect with fellow solopreneurs and bootstrappers and share insight and findings with the community.</p>
							<div>
								<a href="https://novel.dev/dashboard" className="button">Join Community</a>
							</div>
						</div>
					</div>
				</div>
				<h4 className="font-medium">Going to Production</h4>
				<Link href="https://novel.dev/guides/preparing-to-go-to-production" className="bg-white border border-zinc-200 rounded-md">
					<div className="flex gap-10">
						<div className="flex-1 p-6 flex flex-col gap-1">
							<div className="text-xl font-medium">Preparing to go to Production</div>
							<p className="flex-1">Ready to go live? Make sure you have everything in place. Let Novel get you there!</p>
							<div className="text-zinc-500 flex gap-1 items-center">4 mins read <ArrowUpRightIcon size={18}/></div>
						</div>
						<div className="p-6">
							<div className="bg-black h-32 w-48 rounded-md"></div>
						</div>
					</div>
				</Link>
				<Link href="https://novel.dev/guides/getting-your-project-in-front-of-people" target="_blank" className="border border-zinc-200 rounded-md">
					<div className="flex gap-10">
						<div className="flex-1 p-6 flex flex-col gap-1">
							<div className="text-xl font-medium">Getting your Project in front of People</div>
							<p className="flex-1">Learn more about ways to get your project seen. Common tips and tricks to get your first subscriber.</p>
							<div className="text-zinc-500 flex gap-1 items-center">6 mins read <ArrowUpRightIcon size={18}/></div>
						</div>
						<div className="p-6">
							<div className="bg-black h-32 w-48 rounded-md"></div>
						</div>
					</div>
				</Link>
				<Link href="https://novel.dev/guides/pricing-your-saas" className="block bg-white border border-zinc-200 rounded-md">
					<div className="flex gap-10">
						<div className="flex-1 p-6 flex flex-col gap-1">
							<div className="text-xl font-medium">Pricing your SaaS 101</div>
							<p className="flex-1">Don't know how to price your project? Learn more about the common practices successful SaaS use to price their offerings.</p>
							<div className="text-zinc-500 flex gap-1 items-center">3 mins read <ArrowUpRightIcon size={18}/></div>
						</div>
						<div className="p-6">
							<div className="bg-black h-32 w-48 rounded-md"></div>
						</div>
					</div>
				</Link>
			</div>
		</main>
	);
}
