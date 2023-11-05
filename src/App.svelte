<script>
  // @ts-nocheck
  // Default binding doesn't fucking work
  import Amplitude from "amplitudejs";
  import { onMount } from "svelte";
  let playing = false;
  // Song list
  const playlist = [
    {
      name: "【Vocaloid】ENISHI【Drumstep】",
      artist: "Kuroneko Lounge",
      album: "Tohou Collection Vol. 1",
      url: "https://ytd-lemon.vercel.app/api/ytdl/download?v=jE28lE992d8&type=audio",
      cover_art_url:
        "https://i.ytimg.com/vi/Zk-nheLN0j8/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLATE9J6n4wvYkk6eY7mWiJMcl6_8Q",
    },
    {
      name: "Rebel Path (Cello Version)",
      artist: "OST Station",
      album: "Cyberpunk 2077 OST",
      url: "https://ytd-lemon.vercel.app/api/ytdl/download?v=AGsjA1pXajk&type=audio",
      cover_art_url:
        "https://i.ytimg.com/vi/js0GubNFQE0/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAhzPk90ArIwrDt72ggYpfoW40a6w",
    },
  ];

  onMount(() => {
    Amplitude.init({
      bindings: {
        37: "prev",
        39: "next",
        32: "play_pause",
      },
      songs: playlist,
      debug: true,
    });
  });
  console.log(`amplitude: ${Amplitude}`);
</script>

<div
  class="min-h-screen bg-gray-100 flex flex-col items-center py-10"
  id="player"
>
  <div class="max-w-xl bg-white rounded-lg shadow-lg overflow-hidden">
    <div class="relative" id="amplitude-album-art">
      <img
        src="https://i.ytimg.com/vi/Zk-nheLN0j8/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLATE9J6n4wvYkk6eY7mWiJMcl6_8Q"
        alt="photo"
        class="object-contain"
        id="amplitude-album-art"
        width="390"
        height="121"
      />
      <div
        class="absolute p-4 inset-0 flex flex-col justify-end bg-gradient-to-b from-transparent to-gray-900 backdrop backdrop-blur-5 text-white"
      >
        <h3 class="font-bold">【Vocaloid】ENISHI【Drumstep】</h3>
        <span class="opacity-70">Tohou Collection Vol. 1</span>
      </div>
    </div>
    <!-- <div>
      <div class="relative h-1 bg-gray-200">
        <div
          class="absolute h-full w-1/2 bg-green-500 flex items-center justify-end"
        >
          <div class="rounded-full w-3 h-3 bg-white shadow" />
        </div>
      </div>
    </div> -->
    <div class="relative h-1 bg-gray-200">
      <progress
        id="song-played-progress"
        class="absolute h-full w-full bg-green-500 flex items-center justify-end amplitude-song-played-progress"
      />
    </div>
    <div
      class="flex justify-between text-xs font-semibold text-gray-500 px-4 py-2"
    >
      <div>
        <span class="amplitude-current-minutes" />:<span
          class="amplitude-current-seconds"
        />
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
            ><polygon points="19 20 9 12 19 4 19 20" /><line
              x1="5"
              y1="19"
              x2="5"
              y2="5"
            /></svg
          >
        </button>
        <!-- PLAY BUTTON -->
        <button
          class="rounded-full w-8 h-8 flex items-center justify-center pl-0.5 ring-2 ring-gray-100 focus:outline-none amplitude-play-pause"
          id="play-pause"
          on:click={() => {
            playing = !playing;
            console.log(console.log(Amplitude.player_state));
          }}
        >
          <svg
            class="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3" /></svg
          >
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
            ><polygon points="5 4 15 12 5 20 5 4" /><line
              x1="19"
              y1="5"
              x2="19"
              y2="19"
            /></svg
          >
        </button>
      </div>
      <div>
        <span id="amplitude-audio-duration" class="amplitude-duration-minutes">
          0
        </span>
        : <span class="amplitude-duration-seconds" />
      </div>
    </div>
    <div class="flex items-center pb-2.5 px-2.5">
      <label for="voice-search" class="sr-only">Search</label>
      <div class="relative w-full">
        <input
          type="text"
          id="voice-search"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 rounded-md"
          placeholder="Search for music"
          required=""
        />
      </div>
      <button
        type="submit"
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
    <ul class="text-xs sm:text-base divide-y border-t cursor-default">
      <li class="flex items-center space-x-3 hover:bg-gray-100">
        <button class="p-3 hover:bg-green-500 group focus:outline-none">
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
        <div class="flex-1">Frizk - ALL MY FELLAS</div>
        <div class="text-xs text-gray-400">2:21</div>
        <button class="focus:outline-none pr-4 group">
          <svg
            class="w-4 h-4 group-hover:text-green-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            ><path
              d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 12.8V2.5"
            /></svg
          >
        </button>
      </li>
      <li class="flex items-center space-x-3 hover:bg-gray-100">
        <button class="p-3 hover:bg-green-500 group focus:outline-none">
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
        <div class="flex-1">Lil Darkie - MUSIC FOR NIGGAS</div>
        <div class="text-xs text-gray-400">3:58</div>
        <button class="focus:outline-none pr-4 group">
          <svg
            class="w-4 h-4 group-hover:text-green-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            ><path
              d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 12.8V2.5"
            /></svg
          >
        </button>
      </li>
    </ul>
  </div>
</div>
