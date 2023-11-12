<script lang="js">
	// @ts-nocheck

	import {
		addToPlaylist,
		checkMusic,
		playMusic,
		removeFromPlaylist
	} from '../../methods/music_controller';
	import { current_song_store, is_dark_theme, playlist_store } from '../../util/store';
	import includes from 'lodash/includes';
	// @ts-nocheck
	let search_query = '';
	let suggestions = [];
	let search_results = [];

	async function search_suggestion(value) {
		const query = value;
		if (!query) return;

		const response = await fetch(`/api/suggestions?q=${query}`, {
			method: 'GET',
			headers: {
				'content-type': 'application/json'
			}
		});

		suggestions = await response.json();
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

		const results = await response.json();

		search_results = results.map((item) => {
			return {
				id: item.videoId,
				name: item.title,
				artist: item.author.name,
				album: item.author.name,
				// https://youtube-service-ejrf.onrender.com/fetch-video/${item.videoId}
				url: `${window.location.protocol}//${window.location.hostname}/api/download?v=${item.videoId}&type=audio`,
				cover_art_url: item.thumbnail.url,
				duration: item.duration,
				playing: item.videoId == $current_song_store.id
			};
		});
	}
</script>

<div class="flex items-center pb-1 px-2">
	<label for="voice-search" class="sr-only">Search</label>
	<div class="relative w-full">
		<input
			type="text"
			id="voice-search"
			class={`${$is_dark_theme ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'} border border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 rounded-md`}
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
		class="rounded-md inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-gray border hover:border-gray-300 focus:ring-2 focus:outline-none focus:ring-white"
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
			<div class={`shadow menu dropdown-content z-[40] rounded-box px-4 ${$is_dark_theme ? 'text-white' : 'text-gray-900'}`}>
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
					<li
						class={`flex items-center space-x-3 hover:bg-gray-100 ${
							checkMusic(item.id, $playlist_store) ? 'bg-blue-300' : ''
						}`}
					>
						<button
							class="p-3 hover:bg-green-500 group focus:outline-none"
							on:click={() => {
								playMusic(item, Amplitude);
							}}
						>
							{#if $current_song_store.id == item.id}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									stroke-width="2"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									class="w-4 h-4 group-hover:text-white"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M15.75 5.25v13.5m-7.5-13.5v13.5"
									/>
								</svg>
							{:else}
								<svg
									class="w-4 h-4 group-hover:text-white"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3" /></svg
								>
							{/if}
						</button>
						<div class="flex-1">{item.name}</div>
						<div class="text-xs text-gray-400 px-1.5">{item.duration}</div>

						<button
							class="focus:outline-none pr-4 group"
							on:click={() => {
								if (!checkMusic(item.id, $playlist_store)) {
									addToPlaylist(item, Amplitude);
								} else {
									removeFromPlaylist(item, Amplitude);
								}
							}}
						>
							{#if !checkMusic(item.id, $playlist_store)}
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
							{:else}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-6 h-6"
								>
									<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
								</svg>
							{/if}
						</button>
					</li>
				</ul>
			</div>
		{/each}
	</div>
{/if}
