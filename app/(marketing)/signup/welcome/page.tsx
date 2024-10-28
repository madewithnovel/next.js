import Footer from '../../footer';
import Header from '../../header';

export default async function Page () {
	return (
		<>
			<Header/>
			<main className="flex flex-col gap-20 py-10">
				Thanks for signing up
			</main>
			<Footer/>
		</>
	);
}
