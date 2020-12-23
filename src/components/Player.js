import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faAngleLeft, faAngleRight, faPause } from '@fortawesome/free-solid-svg-icons'
import { playAudio } from '../util'

const Player = ({ currentSong, songs, setSongs, isPlaying, setIsPlaying, audioRef, setSongInfo, songInfo, setCurrentSong }) => {

    //Event handler
    const activeLibraryHandler = (nextPrev) => {
        //Add active state
        const newSongs = songs.map((s) => {
            if (s.id === nextPrev.id) {
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
    }
    const playSongHandler = () => {
        if (isPlaying) {
            audioRef.current.pause();
        }
        else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    }

    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({ ...songInfo, currentTime: e.target.value });
    }

    //Function
    const getTime = (time) => {
        return Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2);
    }

    const skipTrackHandler = async (direction) => {
        //Find current song
        let currentIndex = songs.findIndex((s) => s.id === currentSong.id);

        //Skip track
        if (direction === 'skip-forward') {
            currentIndex++;
            const next = songs[(currentIndex < songs.length ? currentIndex : 0)];
            await setCurrentSong(next);
            activeLibraryHandler(next);

        }
        else {
            currentIndex--;
            const prev = songs[(currentIndex >= 0 ? currentIndex : songs.length - 1)]
            await setCurrentSong(prev);
            activeLibraryHandler(prev);
        }


        //Play if it's playing
        playAudio(isPlaying, audioRef);

    }

    //Add styles
    const trackAnim = {
        transform: `translateX(${songInfo.animationPercentage}%)`
    }


    return (
        <div className='player'>
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <div style={{ background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})` }} className="track">
                    <input onChange={dragHandler} min={0} max={songInfo.duration || 0} value={songInfo.currentTime} type="range" />
                    <div className="animate-track" style={trackAnim}></div>
                </div>
                <p>{getTime(songInfo.duration || 0)}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon size='2x' className='skip-back' icon={faAngleLeft} onClick={() => { skipTrackHandler('skip-back') }} />
                <FontAwesomeIcon size='2x' className='play' icon={(isPlaying ? faPause : faPlay)} onClick={playSongHandler} />
                <FontAwesomeIcon size='2x' className='skip-forward' icon={faAngleRight} onClick={() => { skipTrackHandler('skip-forward') }} />
            </div>

        </div>
    )
}

export default Player
