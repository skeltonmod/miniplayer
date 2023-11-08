// @ts-nocheck
import { get } from "svelte/store";
import { playlist_store, current_song_store } from "../util/store";


export const addToPlaylist = (song_object, _amplitude) => {
    console.log(_amplitude);
    playlist_store.update(song => {
        return [...song, song_object];
    });

    _amplitude.addSong(song_object);
}


export const removeFromPlaylist = (song_object, _amplitude) => {
    playlist_store.update(song => {
        return song.filter(item => item.id !== song_object.id);
    });

    console.log(_amplitude.getSongs());
    const song_index = _amplitude.getSongs().findIndex(item => item.id == song_object.id);

    _amplitude.removeSong(song_index);
}

export const initialize = (_amplitude) => {
    const playlist = get(playlist_store);
    playlist.forEach(item => {
        _amplitude.addSong(item);
    })
    console.log(playlist);
    console.log(_amplitude.getSongs());
}

export const playMusic = (song_object, fromQueue = false, _amplitude) => {
    current_song_store.update(() => {
        return song_object
    });
    // Check if you're playing via the search tab
    _amplitude.playNow(song_object);
}