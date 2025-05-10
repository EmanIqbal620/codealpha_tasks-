const trackList = [
  {
    name: "Falling down",
    artist: "Wid Cards",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    art: "music1.jpg", 
  },
  {
    name: "Faded",
    artist: "Alan Walker",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", 
    art: "music2.jpg", 
  },
  {
    name: "Rather Be",
    artist: "Jr Stit Mashup",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    art: "music3.jpg", 
  },
];


let currentTrackIndex = 0;
let isPlaying = false;
let audio = new Audio(trackList[currentTrackIndex].src);

function updateTrackInfo() {
    const track = trackList[currentTrackIndex];
    document.getElementById('track-name').innerText = track.name;
    document.getElementById('track-artist').innerText = track.artist;
    document.getElementById('track-art').style.backgroundImage = `url(${track.art})`;
}

function playPauseTrack() {
    if (isPlaying) {
        audio.pause();
        document.getElementById('playpause-icon').classList.replace('fa-pause-circle', 'fa-play-circle');
    } else {
        audio.play();
        document.getElementById('playpause-icon').classList.replace('fa-play-circle', 'fa-pause-circle');
    }
    isPlaying = !isPlaying;
}

function seekTo() {
    const seekSlider = document.getElementById('seek_slider');
    audio.currentTime = (audio.duration / 100) * seekSlider.value;
}

function setVolume() {
    const volumeSlider = document.getElementById('volume-slider');
    audio.volume = volumeSlider.value / 100;
}

function updateProgress() {
    const seekSlider = document.getElementById('seek_slider');
    const currentTime = document.getElementById('current-time');
    const duration = document.getElementById('duration');

    const currentMinutes = Math.floor(audio.currentTime / 60);
    const currentSeconds = Math.floor(audio.currentTime % 60);
    currentTime.innerText = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;

    const durationMinutes = Math.floor(audio.duration / 60);
    const durationSeconds = Math.floor(audio.duration % 60);
    duration.innerText = `${durationMinutes}:${durationSeconds < 10 ? '0' : ''}${durationSeconds}`;

    seekSlider.value = (audio.currentTime / audio.duration) * 100;
}

function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % trackList.length;
    audio.src = trackList[currentTrackIndex].src;
    updateTrackInfo();
    if (isPlaying) {
        audio.play();
    }
}

function prevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + trackList.length) % trackList.length;
    audio.src = trackList[currentTrackIndex].src;
    updateTrackInfo();
    if (isPlaying) {
        audio.play();
    }
}

function shuffle() {
    const randomIndex = Math.floor(Math.random() * trackList.length);
    currentTrackIndex = randomIndex;
    audio.src = trackList[currentTrackIndex].src;
    updateTrackInfo();
    if (isPlaying) {
        audio.play();
    }
}

function randomTrack() {
    shuffle();
}

audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', nextTrack);
updateTrackInfo();
