<script lang="js">
	// @ts-nocheck
	// Default binding doesn't fucking work
	import TabbedComponent from '$lib/TabbedComponent.svelte';
	import { onMount } from 'svelte';
	import Image from '../asset/Elijah.png';
	import { changeCurrentSong, initialize, playMusic, seek } from '../methods/music_controller';
	import { get } from 'svelte/store';
	import { current_song_store, device_store, playlist_store, title } from '../util/store';
	let player_state = 'stopped';
	let audio_element = null;
	let playlist = [];

	onMount(() => {
		function iOS() {
			return (
				['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].includes(
					navigator.platform
				) ||
				// iPad on iOS 13 detection
				(navigator.userAgent.includes('Mac') && 'ontouchend' in document)
			);
		}

		Amplitude.init({
			songs: playlist.length ? playlist : [],
			callbacks: {
				// Dogshit coding practice
				pause: function () {
					player_state = 'paused';
				},
				playing: function () {
					player_state = 'playing';
				}
			}
		});

		audio_element = Amplitude.getAudio();

		audio_element.addEventListener('playing', function (e) {
			// Amplitude.bindNewElements();
			$current_song_store = Amplitude.getActiveSongMetadata();
			
			changeCurrentSong(Amplitude.getActiveSongMetadata())
			$title = Amplitude.getActiveSongMetadata().name;
			player_state = 'playing';
		});

		audio_element.addEventListener('loadeddata', function (e) {
			console.log("Loaded");
			this.play();
		});

		audio_element.addEventListener('pause', function (e) {
			player_state = 'paused';
			playMusic({}, Amplitude);
		});

		// audio_element.addEventListener('ended', function(e) {
			
		// });

		initialize(Amplitude);

		$device_store = iOS();
	});

	current_song_store.subscribe((item) => {
		if (Object.keys(item).length > 0) {
			if ('mediaSession' in navigator) {
				const current_song = get(current_song_store);

				navigator.mediaSession.metadata = new MediaMetadata({
					title: current_song.name,
					artist: current_song.artist,
					album: current_song.album,
					artwork: [
						{
							src: current_song.cover_art_url
						}
					]
				});
			}
		}
	});
</script>

<main>
	<div class="min-h-screen linear-gradient(to right, rgb(55, 65, 81), rgb(17, 24, 39), rgb(0, 0, 0)) flex flex-col items-center lg:py-10" id="player">
		<div class="max-w-xl bg-black lg:rounded-lg shadow-lg overflow-hidden">
			<div class="relative" id="amplitude-album-art">
				<!-- svelte-ignore a11y-img-redundant-alt -->
				<img
					data-amplitude-song-info="cover_art_url"
					alt="photo"
					class="object-cover"
					id="amplitude-album-art"
					src={Image}
				/>
				<div
					class="absolute p-4 inset-0 flex flex-col justify-end bg-gradient-to-b from-transparent to-gray-900 backdrop backdrop-blur-5 text-white"
				>
					<h3 class="font-bold song-name" data-amplitude-song-info="name">Song Name</h3>
					<span class="opacity-70" data-amplitude-song-info="artist">Artist</span>
				</div>
			</div>
			<div class="relative h-1 bg-gray-200">
				<progress
					id="song-played-progress"
					class="absolute h-full w-full bg-green-500 progress-success flex items-center justify-end amplitude-song-played-progress"
				/>
			</div>

			<div class="flex justify-between text-xs font-semibold text-gray-500 px-4 py-2">
				<div>
					<span class="amplitude-current-minutes" />:<span class="amplitude-current-seconds" />
				</div>
				<div class="flex space-x-3 p-2">
					<!-- PREVIOUS BUTTON -->
					<button class="focus:outline-none amplitude-prev">
						<svg
							class="w-4 h-4"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							><polygon points="19 20 9 12 19 4 19 20" /><line x1="5" y1="19" x2="5" y2="5" /></svg
						>
					</button>
					<!-- PLAY BUTTON -->

					<button
						class="w-8 h-8 flex items-center justify-center focus:outline-none amplitude-play-pause"
						id="play-pause"
						on:click={() => {
							console.log(Amplitude.getSongsState());
							if (Object.keys(Amplitude.getActiveSongMetadata()).length == 0) {
								if ($playlist_store.length > 0) {
									playMusic({...$playlist_store[0], playing: false}, Amplitude);
								}
							}
						}}
					>
						{#if player_state == 'playing'}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								stroke-width="2"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								class="w-5 h-5"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M15.75 5.25v13.5m-7.5-13.5v13.5"
								/>
							</svg>
						{:else}
							<svg
								class="w-5 h-5"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3" /></svg
							>
						{/if}
					</button>
					<!-- NEXT BUTTON -->
					<button class="focus:outline-none amplitude-next">
						<svg
							class="w-4 h-4"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							><polygon points="5 4 15 12 5 20 5 4" /><line x1="19" y1="5" x2="19" y2="19" /></svg
						>
					</button>
				</div>
				<div>
					{#if Object.keys($current_song_store).length > 0}
						{$current_song_store.duration}
					{:else}
						0:00
					{/if}
				</div>
			</div>
			<div
				class="flex text-xs font-semibold text-gray-500 px-4 py-1 justify-center items-center content-center"
			>
				<svg
					class="w-5 h-5"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="w-6 h-6"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
					/>
				</svg>

				<input
					type="range"
					class="amplitude-volume-slider range range-xs h-4 w-1/4 range-info px-4 mx-2"
				/>
			</div>
			<TabbedComponent />
		</div>
		<footer class="footer items-end justify-center p-4 text-neutral-content">
			<aside class="items-end grid-flow-col">
				<p>Created by Elijah Abgao © {new Date().getFullYear()}; Powered by DepressionTM.</p>
			</aside>
		</footer>
	</div>
</main>
