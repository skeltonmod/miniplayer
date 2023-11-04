<script>
  // @ts-nocheck
  // Default binding doesn't fucking work
  import Amplitude from "amplitudejs";
  import { onMount } from "svelte";

  Amplitude.init({
    bindings: {
      37: "prev",
      39: "next",
      32: "play_pause",
    },
    songs: [
      {
        name: "Risin' High (feat Raashan Ahmad)",
        artist: "Ancient Astronauts",
        album: "We Are to Answer",
        url: "https://ytd-lemon.vercel.app/api/ytdl/download?v=jE28lE992d8&type=audio",
        cover_art_url:
          "https://i.ytimg.com/vi/Zk-nheLN0j8/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLATE9J6n4wvYkk6eY7mWiJMcl6_8Q",
      },
    ],
    debug: true,
  });
  console.log(Amplitude);
</script>

<div
  class="min-h-screen bg-gray-100 flex flex-col items-center my-10"
  id="player"
>
  <div class="max-w-xl bg-white rounded-lg shadow-lg overflow-hidden">
    <div class="relative" id="amplitude-album-art">
      <img
        src="https://images.unsplash.com/photo-1500099817043-86d46000d58f?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&h=250&q=80"
        alt="photo"
        class="object-cover"
        id="amplitude-album-art"
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
      <div><span class="amplitude-current-minutes"></span>:<span class="amplitude-current-seconds"></span></div>
      <div class="flex space-x-3 p-2">
        <button class="focus:outline-none">
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
        <button
          class="rounded-full w-8 h-8 flex items-center justify-center pl-0.5 ring-2 ring-gray-100 focus:outline-none amplitude-play-pause"
          id="play-pause"
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
        <button class="focus:outline-none">
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
      <div><span id="amplitude-audio-duration" class="amplitude-duration-minutes"> 0 </span> : <span class="amplitude-duration-seconds"></span></div>
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
