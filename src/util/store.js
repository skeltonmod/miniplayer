import { persist, createLocalStorage  } from "@macfja/svelte-persistent-store"
import {writable} from 'svelte/store';


// Empty object, will be used when listening for changes for amplitude
export const current_song_store = writable({});
export const playlist_store = persist(writable([]), createLocalStorage(), "playlist");
export const amplitude_store = writable(undefined);
export const device_store = writable(false);
export const is_dark_theme = writable(false);

function createTitle() {
	const {subscribe, set, update} = writable('');
	
	return {
		subscribe,
		set: (value) => {
			set(`${value} • WebSite`)
		},
		clear: () => {
			set('Website • Home suffix');
		}
	}
}

export const title = createTitle();