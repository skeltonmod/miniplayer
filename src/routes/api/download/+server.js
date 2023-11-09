import { json } from '@sveltejs/kit';
import { get } from 'svelte/store';
import { Innertube } from 'youtubei.js';
const yt = await Innertube.create();

export const GET = async ({ url }) => {
	const id = new URL(url).searchParams.get('v');
	const type = new URL(url).searchParams.get('type');
	if (!id) throw new Error('Invalid Id');
	const ios = get(device_store);
	try {
		if (type === 'audio') {
			const audioStream = await yt.download(id, {
				type: 'video+audio',
				quality: 'best',
				format: 'mp4',
				client: 'ANDROID'
			});

			return new Response(audioStream, {
				headers: {
					'Content-Type': 'audio/mpeg', // Use a standard MIME type for audio files
				}
			});
		}
	} catch (error) {
		console.error(error);
		return json(
			{
				error: 'Internal Server Error',
				errorobj: error
			},
			{
				status: 500
			}
		);
	}
};