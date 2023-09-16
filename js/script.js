const content = document.querySelector(".content"),
  Playimage = content.querySelector(".music-image img"),
  musicName = content.querySelector(".music-titles .name"),
  musicArtist = content.querySelector(".music-titles .artist"),
  audio = document.getElementById("myAudio"),
  playBtn = content.querySelector(".play-pause"),
  playBtnIcon = content.querySelector(".play-pause span"),
  prevBtn = content.querySelector("#prev"),
  nextBtn = content.querySelector("#next"),
  progressBar = content.querySelector(".progress-bar"),
  progressDetails = content.querySelector(".progress-details"),
  repeatBtn = content.querySelector("#repeat"),
  shuffle = content.querySelector("#shuffle");

let index = 1;
window.addEventListener("load", () => {
  loadData(index);
});
function loadData(indexValue) {
  musicName.innerHTML = songs[indexValue - 1].name;
  musicArtist.innerHTML = songs[indexValue - 1].artist;
  Playimage.src = "images/" + songs[indexValue - 1].img + ".jpg";
  audio.src = "music/" + songs[indexValue - 1].audio + ".mp3";
}

playBtn.addEventListener("click", () => {
  const isMusicPaused = content.classList.contains("paused");
  if (isMusicPaused) {
    pauseSong();
  } else {
    playSong();
  }
});
function playSong() {
  content.classList.add("paused");
  playBtnIcon.innerHTML = "pause";
  audio.play();
}
function pauseSong() {
  content.classList.remove("paused");
  playBtnIcon.innerHTML = "play_arrow";
  audio.pause();
}

nextBtn.addEventListener("click", () => {
  nextSong();
});
prevBtn.addEventListener("click", () => {
  prevSong();
});

function nextSong() {
  index++;
  if (index > songs.length) {
    index = 1;
  }

  loadData(index);
  playSong();
}
function prevSong() {
  index--;
  if (index <= 0) {
    index = songs.length;
  }

  loadData(index);
  playSong();
}
audio.addEventListener("timeupdate", (e) => {
  const initialTime = e.target.currentTime; //Get current music time
  const finalTime = e.target.duration; //Get music duration
  let BarWidth = (initialTime / finalTime) * 100;
  progressBar.style.width = BarWidth + "%";

  progressDetails.addEventListener("click", (e) => {
    console.log(e);
    let progressValue = progressDetails.clientWidth; // Get width of Progress
    let clickedOffsetX = e.offsetX; // Get offset x value
    console.log(progressValue);
    let musicDuration = audio.duration; //get total music duration

    audio.currentTime = (clickedOffsetX / progressValue) * musicDuration;
  });
  //Timer Logic
  audio.addEventListener("loadeddata", () => {
    let finalTimeData = content.querySelector(".final");

    //Update finalDuration
    let audioDuration = audio.duration;
    let finalMinutes = Math.floor(audioDuration / 60);
    let finalSeconds = Math.floor(audioDuration % 60);

    if (finalSeconds < 10) {
      finalSeconds = "0" + finalSeconds;
    }
    finalTimeData.innerText = finalMinutes + ":" + finalSeconds;
  });

  //Update Current Duration
  let currentTimeData = content.querySelector(".current");
  let CurrentTime = audio.currentTime;
  let currentMinutes = Math.floor(CurrentTime / 60);
  let currentSeconds = Math.floor(CurrentTime % 60);
  if (currentSeconds < 10) {
    currentSeconds = "0" + currentSeconds;
  }
  currentTimeData.innerText = currentMinutes + ":" + currentSeconds;

  //repeat button logic
  repeatBtn.addEventListener("click", () => {
    audio.currentTime = 0;
  });
});

//Shuffle Logic
shuffle.addEventListener("click", () => {
  let randIndex = Math.floor(Math.random() * songs.length) + 1; //Select random between 1 and song array length
  loadData(randIndex);
  playSong();
});

audio.addEventListener("ended", () => {
  index++;
  if (index > songs.length) {
    index = 1;
  }
  loadData(index);
  playSong();
});
