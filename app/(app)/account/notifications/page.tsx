// if invite is in the url, and not authenticated, redirect to signup
import getSession from 'components/hooks/get-session';

export default async function Page () {
	const session = await getSession();
	return (
		<main className="flex flex-1 flex-col gap-4 p-4 pt-0">
			{JSON.stringify(session)}
		</main>
	);
}
