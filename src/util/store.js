import {writable} from 'svelte/store';

// Empty object, will be used when listening for changes for amplitude
export const current_song_store = writable({});

