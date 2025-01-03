import * as novel from '@novel/next/sdk';

export async function GET () {
	return Response.redirect(novel.path('/session/end'));
}
