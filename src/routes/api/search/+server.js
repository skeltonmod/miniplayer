// @ts-ignore
import { json } from '@sveltejs/kit';
import { Innertube } from 'youtubei.js';

// @ts-ignore
const yt = await Innertube.create();

// @ts-ignore
function recursive(obj) {
	if (typeof obj === 'object' && obj !== null) {
		if (Array.isArray(obj)) {
			// @ts-ignore
			return obj.map((item) => recursive(item));
		} else {
			const result = {};
			for (const [key, value] of Object.entries(obj)) {
				// @ts-ignore
				result[key] = recursive(value);
			}
			// @ts-ignore
			return result;
		}
	}
	return obj;
}

export const GET = async ({ url }) => {
	const query = new URL(url).searchParams.get('q');

	if (!query) throw new Error('No query');

	try {
		const searchResults = await yt.search(query, {
			type: 'video'
		});

		if (!searchResults)
			return json(
				{
					error: 'results not found'
				},
				{
					status: 404
				}
			);

		const searchResult = searchResults.results?.map((result) => recursive(result));
		const info = searchResult?.map((entry) => {
			return {
				videoId: entry.id,
				title: entry.title.text,
				thumbnail: {
					url: entry.thumbnails?.[0].url,
					width: entry.thumbnails?.[0].width,
					height: entry.thumbnails?.[0].height
				},
				author: {
					id: entry.author?.url,
					name: entry.author?.name,
					thumbnail: {
						url: entry.thumbnails?.[0].url,
						width: entry.thumbnails?.[0].width,
						height: entry.thumbnails?.[0].height
					}
				},
				published: entry.published?.text,
				viewCount: entry.view_count?.text,
				duration: entry.duration?.text
			};
		});

		return new Response(JSON.stringify(info), {
			headers: {
				'Content-Type': 'application/json'
			}
		});
	} catch (error) {
		console.error(error);
		return json(
			{
				error: 'Internal Server Error'
			},
			{
				status: 500
			}
		);
	}
};