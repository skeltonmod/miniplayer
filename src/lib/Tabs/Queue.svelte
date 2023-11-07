<script>
	import { onDestroy } from 'svelte';
	import { playlist_store, current_song_store } from '../../util/store';
	/**
	 * @type {string | any[]}
	 */
	let playlist = [];
	let current_song = {};
	const playlist_sub = playlist_store.subscribe((data) => {
		playlist = data;
	});

	const current_song_sub = current_song_store.subscribe((data) => {
		current_song = data;
	});

	onDestroy(playlist_sub);
	onDestroy(current_song_sub);
</script>

<div>
	{#if playlist.length > 0}
		<ul class="text-xs sm:text-base divide-y border-t cursor-default">
			{#each playlist as item}
				<li class="flex items-center space-x-3 hover:bg-gray-100">
					<button
						on:click={() => {
							current_song_store.update((data) => {
								return item;
							});
						}}
						class="p-3 hover:bg-green-500 group focus:outline-none"
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
					<div class="flex-1">{item.name}</div>
					<div class="text-xs text-gray-400 px-1.5">{item.duration}</div>
					<!-- <button class="focus:outline-none pr-4 group">
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
            </button> -->
				</li>
			{/each}
		</ul>
	{:else}
		<div class="text-xs sm:text-base divide-y border-t cursor-default">
			<div class="flex items-center space-x-3 hover:bg-gray-100">
				<span class="p-3 group focus:outline-none">Empty Playlist</span>
			</div>
		</div>
	{/if}
</div>
