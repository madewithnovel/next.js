import getSession from 'components/hooks/get-session';
import { ArrowUpRightIcon } from 'lucide-react';
import Link from 'next/link';

export default async function Page () {
	const session = await getSession();
	return (
		<main className="flex flex-1 flex-col gap-4 p-4 pt-0">
			<div className="p-4 flex flex-col gap-10 pb-20 container mx-auto">
				<div className="pt-10">
					<h1 className="text-3xl font-medium">Welcome back, {session.user.display_name ?? session.user.email}</h1>
					<p className="text-muted-foreground text-xl">Browse our <a href="https://novel.dev/docs" target="_blank" className="underline decoration-muted-foreground underline-offset-2">documentation</a> to start using Novel.</p>
				</div>
				<h4 className="font-medium">Next Steps</h4>
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
