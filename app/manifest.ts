import { MetadataRoute } from 'next';

import { NOVEL } from './constants';

export default function manifest (): MetadataRoute.Manifest {
	return {
		name: NOVEL.title,
		short_name: NOVEL.title,
		description: NOVEL.description,
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
