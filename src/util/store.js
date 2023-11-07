import { persist, createIndexedDBStorage } from "@macfja/svelte-persistent-store"
import {writable} from 'svelte/store';

// Empty object, will be used when listening for changes for amplitude
export const current_song_store = writable({});
export const playlist_store = persist(writable([]), createIndexedDBStorage(), "playlist");
