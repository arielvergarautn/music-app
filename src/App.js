import { useState, useRef } from 'react'
//Import Styles
import './styles/app.scss'
//Import Components
import Player from './components/Player'
import Song from './components/Song'
import Library from './components/Library'
import Nav from './components/Nav'

//Import data.js
import data from './data'

//Import util.js
import { playAudio } from './util'

//Main function
function App() {

  //States
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0
  })
  const [libraryStatus, setLibraryStatus] = useState(false)

  //Ref
  const audioRef = useRef(null);

  //Handlers
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;

    //Calculate percentage
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animationPercentage = Math.round((roundedCurrent / roundedDuration) * 100);

    setSongInfo({ ...songInfo, currentTime: current, duration, animationPercentage });
  }

  const songEndHandler = async () => {
    //Find current song
    let currentIndex = songs.findIndex((s) => s.id === currentSong.id);
    //Skip track
    currentIndex++;
    await setCurrentSong(songs[(currentIndex < songs.length ? currentIndex : 0)]);
    //Play if it's playing
    playAudio(isPlaying, audioRef);
  }


  return (
    <div className={`App ${libraryStatus ? 'library-active' : ''}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} />
      <Player songs={songs} setSongs={setSongs} isPlaying={isPlaying} setIsPlaying={setIsPlaying} currentSong={currentSong} setCurrentSong={setCurrentSong} songInfo={songInfo} setSongInfo={setSongInfo} audioRef={audioRef} />
      <Library libraryStatus={libraryStatus} songs={songs} setSongs={setSongs} currentSong={currentSong} setCurrentSong={setCurrentSong} isPlaying={isPlaying} audioRef={audioRef} setSongInfo={setSongInfo} songInfo={songInfo} />
      <audio onEnded={songEndHandler} onTimeUpdate={timeUpdateHandler} onLoadedMetadata={timeUpdateHandler} ref={audioRef} src={currentSong.audio}></audio>
    </div>
  );
}

export default App;
