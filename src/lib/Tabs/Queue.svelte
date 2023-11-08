<script>
	// @ts-nocheck
	import { playMusic, removeFromPlaylist } from '../../methods/music_controller';
	import { playlist_store } from '../../util/store';
</script>

<div class="scrollable-content h-auto max-h-52 overflow-y-scroll w-full">
	{#if $playlist_store.length > 0}
		<ul class="text-xs sm:text-base divide-y border-t cursor-default">
			{#each $playlist_store as item}
				<li class="flex items-center space-x-3 hover:bg-gray-100">
					<button
						on:click={() => {
							playMusic(item, true, Amplitude);
						}}
						class="p-4 hover:bg-green-500 group focus:outline-none"
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
					<button
						on:click={() => {
							removeFromPlaylist(item, Amplitude);
						}}
						class="p-3 hover:bg-red-300 group focus:outline-none"
					>
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
					</button>
				</li>
			{/each}
		</ul>
	{:else}
		<div class="text-xs sm:text-base divide-y border-t cursor-default">
			<div class="flex items-center space-x-3 hover:bg-gray-100">
				<span class="p-3 group focus:outline-none"
					>Empty Playlist use the Search tab to add music</span
				>
			</div>
		</div>
	{/if}
</div>

<style>
	.scrollable-content::-webkit-scrollbar {
		display: none;
	}
	.scrollable-content {
		-ms-overflow-style: none;
	}

	.scrollable-content {
		scrollbar-width: none;
	}
</style>
