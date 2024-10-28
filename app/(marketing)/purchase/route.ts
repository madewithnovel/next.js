import { redirect } from 'next/navigation';
import * as novel from 'novel/sdk';

export async function GET () {
	const pricing = await novel.app.pricing();
	return redirect(novel.api(`/api/purchase?plan=${pricing[0].id}`));
}
