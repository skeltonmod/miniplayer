<script lang="js">
	// @ts-nocheck
	let search_query = '';
	let suggestions = [];
	let search_results = '';
	let open_dropdown = false;
	import { current_song_store, playlist_store } from '../../util/store';

	function add_to_playlist(song) {
		playlist_store.update(data => {
			return [...data, song];
		});
	}

	async function search_suggestion(value) {
		const query = value;
		if (!query) return;

		const response = await fetch(`/api/suggestions?q=${query}`, {
			method: 'GET',
			headers: {
				'content-type': 'application/json'
			}
		});

		if (response.status !== 200) {
			open_dropdown = false;
			return;
		}
		suggestions = await response.json();
		open_dropdown = true;
	}

	async function search_video(value) {
		const query = value;
		const response = await fetch(`/api/search?q=${query}`, {
			method: 'GET',
			headers: {
				'content-type': 'application/json'
			}
		});

		if (response.status !== 200) {
			return console.error(response.status, response);
		}

		search_results = await response.json();
	}

	$: search_results, console.log('search results', search_results);
</script>

<div class="flex items-center pb-1 px-2">
	<label for="voice-search" class="sr-only">Search</label>
	<div class="relative w-full">
		<input
			type="text"
			id="voice-search"
			class="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 rounded-md"
			placeholder="Search for music"
			required=""
			on:input={(e) => search_suggestion(e.target.value)}
			on:change={(e) => search_suggestion(e.target.value)}
			bind:value={search_query}
		/>
	</div>

	<button
		type="button"
		on:click={() => {
			search_video(search_query);
			search_query = '';
		}}
		class="rounded-md inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-gray border hover:border-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
	>
		<svg
			aria-hidden="true"
			class="mr-2 -ml-1 w-5 h-5"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			><path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
			/></svg
		>Search
	</button>
</div>
<div hidden={search_query.length == 0}>
	{#if suggestions.length > 0}
		<div class="h-40 overflow-y-scroll w-full">
			<div class="shadow menu dropdown-content z-[40] bg-base-100 rounded-box px-4">
				<ul class="menu menu-compact">
					{#each suggestions as item, index}
						<li key={index} class="border-b border-b-base-content/10 w-full">
							<button
								on:click={(e) => {
									search_video(e.target.innerText);
									search_query = '';
								}}>{item}</button
							>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	{/if}
</div>

{#if search_results.length > 0}
	<div class="h-52 overflow-y-scroll w-full">
		{#each search_results as item}
			<div>
				<ul class="text-xs sm:text-base divide-y border-t cursor-default">
					<li class="flex items-center space-x-3 hover:bg-gray-100">
						<button
							class="p-3 hover:bg-green-500 group focus:outline-none"
							on:click={() => {
								current_song_store.update((data) => {
									const song_info = {
										id: item.videoId,
										name: item.title,
										artist: item.author.name,
										album: item.author.name,
										url: `https://ytd-lemon.vercel.app/api/ytdl/download?v=${item.videoId}&type=audio`,
										cover_art_url: item.thumbnail.url
									};

									return song_info;
								});
							}}
						>
							<svg
								class="w-4 h-4 group-hover:text-white"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3" /></svg
							>
						</button>
						<div class="flex-1">{item.title}</div>
						<div class="text-xs text-gray-400 px-1.5">{item.duration}</div>
						<button
							class="focus:outline-none pr-4 group"
							on:click={() => {
								add_to_playlist({
									id: item.videoId,
									name: item.title,
									artist: item.author.name,
									album: item.author.name,
									url: `https://ytd-lemon.vercel.app/api/ytdl/download?v=${item.videoId}&type=audio`,
									cover_art_url: item.thumbnail.url,
									duration:  item.duration
								});
							}}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="w-6 h-6"
							>
								<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
							</svg>
						</button>
					</li>
				</ul>
			</div>
		{/each}
	</div>
{/if}
