import Link from 'next/link';

export default function FeaturesHighlights () {
	return (
		<div className="container flex flex-col gap-10 mx-auto px-10">
			<div className="flex flex-col gap-5">
				<div className="text-6xl font-medium tracking-tight">
					Move faster with your tools in one place
				</div>
				<div className="text-xl text-stone-700">
					Automate away routine tasks with the power of generative AI and simplify your workflow with all your
					favorite apps ready to go in Novel. Automate away routine tasks with the power of generative AI and
					simplify your workflow with all your favorite apps ready to go in Novel.
				</div>
			</div>
			<div className="grid grid-cols-4 gap-5">
				<div className="border border-stone-200 rounded-xl bg-stone-50 p-10 h-80"></div>
				<div className="border border-stone-200 rounded-xl bg-stone-50 p-10 h-80"></div>
				<div className="border border-stone-200 rounded-xl bg-stone-50 p-10 h-80"></div>
				<div className="border border-stone-200 rounded-xl bg-stone-50 p-10 h-80"></div>
			</div>
			<div>
				<Link href="/">Learn more →</Link>
			</div>
		</div>
	);
}
