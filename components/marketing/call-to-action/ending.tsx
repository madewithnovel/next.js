export default function CallToActionEnding () {
	return (
		<div className="container grid grid-cols-1 md:grid-cols-2 gap-5 mx-auto px-5 md:px-10">
			<div className="bg-zinc-100 rounded-xl p-10">
				<div className="text-3xl md:text-6xl font-medium mb-5">See all you can accomplish with Novel</div>
				<button className="button wide">Try for free</button>
			</div>
			<div className="bg-zinc-100 rounded-xl">
				<div className="pt-20 flex flex-col items-center justify-end">
					<div className="h-96 border-t-8 border-x-8 border-black bg-white rounded-t-3xl w-80"></div>
				</div>
			</div>
		</div>
	);
}
