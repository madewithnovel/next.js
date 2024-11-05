export default function FeatureFocus () {
	return (
		<div className="container flex flex-col gap-10 mx-auto p-5 md:p-10">
			<div className="w-3/4 flex flex-col gap-5">
				<div className="text-2xl md:text-6xl font-medium tracking-tight">
					Novel for Enterprise
				</div>
				<div className="text-normal md:text-xl">
					Get better insights and compliance with our easy-to-use enterprise tools and onboarding flows. You will never need to look for a different one.
				</div>
				<div>
					<button className="button">Enterprise →</button>
				</div>
			</div>
			<div className="w-full rounded-3xl bg-zinc-900 h-96"></div>
		</div>
	);
}
