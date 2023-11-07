<script lang="js">
	// @ts-nocheck
	// Default binding doesn't fucking work
	import TabbedComponent from '$lib/TabbedComponent.svelte';
	import Amplitude from 'amplitudejs';
	import { onDestroy, onMount } from 'svelte';
	import { current_song_store, playlist_store } from '../util/store';
	import Image from '../asset/Elijah.png';
	import uniqBy from "lodash/uniqBy";

	let player_state = 'stopped';
	let audio_element = null;
	let current_song = {};
	let playlist = [];
	// Song list
	onMount(() => {
		Amplitude.init({
			songs: playlist.length ? playlist : [],
			callbacks: {
				// Dogshit coding practice
				pause: function () {
					console.log('Paused');
					player_state = 'paused';
				},
				playing: function () {
					console.log('Playing');
					player_state = 'playing';
				}
			}
		});

		audio_element = Amplitude.getAudio();

		audio_element.addEventListener('playing', function (e) {
			player_state = 'playing';
		});

		audio_element.addEventListener('loadeddata', function(e){
			this.play()
		});

		audio_element.addEventListener('pause', function (e) {
			player_state = 'paused';
		});
	});

	const current_song_sub = current_song_store.subscribe((data) => {
		if (!Object.keys(data).length) {
			console.error('Empty Data');
			return {};
		}
		current_song = data;
		Amplitude.stop();
		Amplitude.playNow(data);
		return data;
	});

	const playlist_sub = playlist_store.subscribe((data) => {
		const last_song = data[data.length - 1];
		//
		if (last_song == undefined) {
			return [];
		}
		if (data == undefined) {
			return [];
		}
		
		if(Amplitude.getSongs().length > 0){
			Amplitude.addSong(last_song);
		}else{
			data.forEach(item => {
				Amplitude.addSong(item);
			});
		}

		console.log(Amplitude.getSongs());

		// Clear the previous song stack to prevent duplicate playlist
		playlist = [...data];

		return [...data];
	});

	onDestroy(current_song_sub);
	onDestroy(playlist_sub);
</script>

<main>
	<div class="min-h-screen bg-gray-100 flex flex-col items-center lg:py-10" id="player">
		<div class="max-w-xl bg-white lg:rounded-lg shadow-lg overflow-hidden">
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
					<span id="amplitude-audio-duration" class="amplitude-duration-minutes" />
					: <span class="amplitude-duration-seconds" />
				</div>
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
