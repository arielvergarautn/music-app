export function playAudio(isPlaying, audioRef) {
    //Play if it's playing
    if (isPlaying) {
        audioRef.current.play();
    }
}