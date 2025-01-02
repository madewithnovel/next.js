export default async function Route () {
	return Response.redirect(process.env.NEXT_PUBLIC_API_HOST + '/session/end');
}
