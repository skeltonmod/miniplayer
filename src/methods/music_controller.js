// @ts-nocheck
import { get } from "svelte/store";
import { playlist_store, current_song_store } from "../util/store";
import { isEqual } from "lodash";


export const addToPlaylist = (song_object, _amplitude) => {
    
    playlist_store.update(song => {
        return [...song, song_object];
    });

    _amplitude.addSong(song_object);
}


export const removeFromPlaylist = (song_object, _amplitude) => {
    playlist_store.update(song => {
        return song.filter(item => item.id !== song_object.id);
    });

    
    const song_index = _amplitude.getSongs().findIndex(item => item.id == song_object.id);

    _amplitude.removeSong(song_index);
}

export const initialize = (_amplitude) => {
    const playlist = get(playlist_store);
    new Set(playlist).forEach(item => {
        _amplitude.addSong(item);
    })
    
    playlist_store.update(item => {
        return item.map(data => {
            return {
                ...data,
                playing: false
            }
        });
    });
}

export const playMusic = (song_object, _amplitude) => {
    if(Object.keys(song_object).length > 0){
        _amplitude.playNow(song_object);
    }
}

export const seek = (value, _amplitude) => {
    
    _amplitude.setSongPlayedPercentage(96.26736111111111);
}

export const checkMusic = (id, playlist) => {
    return playlist.filter(item => item.id == id).length > 0;
}

export const changeCurrentSong = (song_object) =>{
    playlist_store.update(data => {
        return data.map(item => {
            return {
                ...item,
                playing: (isEqual(song_object, item))
            }
        })
    });

    current_song_store.update((item) => {
        if(Object.keys(song_object).length > 0){
            return song_object
        }
        return {...item, playing: false};
    });
}