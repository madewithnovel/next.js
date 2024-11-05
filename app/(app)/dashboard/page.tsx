import getSession from 'components/hooks/get-session';

export default async function Page () {
	const session = await getSession();
	return (
		<main className="flex flex-1 flex-col gap-4 p-4 pt-0">
			- number of projects
			- get started guides
			- get started checklist
			- articles - deploying to prod
			- articles - marketing
			- articles - pricing strategies
		</main>
	);
}
