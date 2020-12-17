import React from 'react'
import { playAudio } from '../util'
const LibrarySong = ({ song, songs, setSongs, setCurrentSong, audioRef, isPlaying }) => {

    //Handlers
    const selectSongHandler = async (e) => {
        //set current  
        await setCurrentSong(song);

        //Add active state
        const newSongs = songs.map((s) => {
            if (s.id === song.id) {
                return {
                    ...s,
                    active: true
                }
            }
            else {
                return {
                    ...s,
                    active: false
                }
            }
        });
        setSongs(newSongs);

        //Play if it's playing
        playAudio(isPlaying, audioRef);
    }

    return (
        <div onClick={selectSongHandler} className={`library-song ${song.active ? 'selected' : ''}`}>
            <img alt={song.name} src={song.cover} />
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    )
}

export default LibrarySong
