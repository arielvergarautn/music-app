import React, { useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faAngleLeft, faAngleRight, faPause } from '@fortawesome/free-solid-svg-icons'

const Player = ({ currentSong, isPlaying, setIsPlaying }) => {

    //Ref
    const audioRef = useRef(null);

    //Event handler
    const playSongHandler = () => {
        if (isPlaying) {
            audioRef.current.pause();
        }
        else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    }

    return (
        <div className='player'>
            <div className="time-control">
                <p>Start time</p>
                <input type="range" />
                <p>End time</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon className='skip-back' icon={faAngleLeft} />
                <FontAwesomeIcon className='play' icon={faPlay} onClick={playSongHandler} />
                <FontAwesomeIcon className='skip-forward' icon={faAngleRight} />
            </div>
            <audio ref={audioRef} src={currentSong.audio}></audio>
        </div>
    )
}

export default Player
