export default function Index () {
	return (
		<div className="py-10">
			<div className="container mx-auto px-10">
				<div className="text-center w-2/3 mx-auto">
					<div className="flex justify-center mb-5">
						<div
							className="border border-stone-200 rounded-full px-3 py-1 5 text-stone-800 text-sm">
							Announcing our next round of funding.
							{' '}
							<a href="#">Read more →</a>
						</div>
					</div>
					<div className="text-7xl tracking-tight font-bold">Ship in hours, MVP in minutes</div>
					<p className="text-xl text-stone-700 mt-5">
						With Novel, you’ve got all the flexibility to work when, where and how it’s best for you. You
						can easily chat, send audio and video clips, or hop on a huddle to talk things out live.
					</p>

					<div className="flex-center-center gap-5 my-5">
						<button className="button action wide">Try for free</button>
						<button className="button">See documentation →</button>
					</div>

					<div className="flex-center-between flex-col mt-32 gap-5">
						<div className="text-2xl font-medium">Trusted by thousands of businesses, agencies, and
							startups.
						</div>
					</div>
				</div>

				<div
					className="h-96 w-full border-x border-t bg-stone-50 border-stone-200 rounded-t-3xl mt-10"></div>

			</div>
			<hr/>
		</div>
	);
}
