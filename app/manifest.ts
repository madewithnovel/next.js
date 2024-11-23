import { MetadataRoute } from 'next';

export default function manifest (): MetadataRoute.Manifest {
	return {
		name: 'Novel',
		short_name: 'Novel',
		description: 'Novel',
		start_url: '/',
		display: 'standalone',
		background_color: '#fff',
		theme_color: '#fff',
		icons: [
			{
				src: '/favicon.ico',
				sizes: 'any',
				type: 'image/x-icon',
			},
		],
	};
}
