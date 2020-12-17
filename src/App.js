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
import util from './util'

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

  return (
    <div className="App">
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} />
      <Player songs={songs} setSongs={setSongs} isPlaying={isPlaying} setIsPlaying={setIsPlaying} currentSong={currentSong} setCurrentSong={setCurrentSong} songInfo={songInfo} setSongInfo={setSongInfo} audioRef={audioRef} />
      <Library libraryStatus={libraryStatus} songs={songs} setSongs={setSongs} currentSong={currentSong} setCurrentSong={setCurrentSong} isPlaying={isPlaying} audioRef={audioRef} setSongInfo={setSongInfo} songInfo={songInfo} />
      <audio onTimeUpdate={timeUpdateHandler} onLoadedMetadata={timeUpdateHandler} ref={audioRef} src={currentSong.audio}></audio>
    </div>
  );
}

export default App;
