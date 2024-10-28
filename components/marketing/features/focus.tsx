export default function FeaturesFocus () {
	return (
		<div className="container flex flex-col gap-10 mx-auto p-10">
			<div className="w-3/4 flex flex-col gap-5">
				<div className="text-6xl font-medium tracking-tight">
					Novel for Enterprise
				</div>
				<div className="text-xl">
					Gain the tools to protect enterprises of any scale with automated user onboarding, SSH
					session recording, and audit log streaming.
				</div>
				<div>
					<button className="button">Enterprise →</button>
				</div>
			</div>
			<div className="w-full rounded-3xl bg-stone-900 h-96"></div>
		</div>
	);
}
