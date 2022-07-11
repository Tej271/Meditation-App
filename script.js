const song = document.querySelector(".song");
const play = document.querySelector(".play");
const replay = document.querySelector(".replay");
const outline = document.querySelector(".track-outline circle");
const video = document.querySelector(".vid-container video");
// sounds
const sounds = document.querySelectorAll(".sound-picker button");
// Displays
const timeDisplay = document.querySelector(".time-display");
const outlineLength = outline.getTotalLength();
// Duration
const timeSelect = document.querySelectorAll(".time-select button");
let fakeDuration = 600;

outline.style.strokeDashoffset = outlineLength;
outline.style.strokeDasharray = outlineLength;
//0:00
timeDisplay.textContent = `${Math.floor(fakeDuration/60).toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false
  })}:${Math.floor(fakeDuration%60).toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false
  })
}`;

sounds.forEach(sound =>{
    sound.addEventListener("click", function(){
        song.src = this.getAttribute("data-sound");
        video.src = this.getAttribute("data-video");
        checkPlaying(song);
    })
})

play.addEventListener("click", function(){
    checkPlaying(song);
})

replay.addEventListener("click", function(){
    restartSong(song);
})

const restartSong = song => {
    let currentTime = song.currentTime;
    song.currentTime = 0;
    console.log("Ready to restart");
}

timeSelect.forEach(option => {
    option.addEventListener("click",function(){
        fakeDuration = this.getAttribute("data-Time");
        timeDisplay.textContent = `${Math.floor(fakeDuration/60).toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
          })}:${Math.floor(fakeDuration%60).toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
          })
        }`;
    })
})

const checkPlaying = song => {
    if(song.paused){
        song.play();
        video.play();
        play.src = "./svg/pause.svg"
    }
    else{
        song.pause();
        video.pause();
        play.src = "./svg/play.svg"
    }
}

song.ontimeupdate = function() {updateTime()};


function updateTime(){
    let currentTime = song.currentTime;
    let elapsed = fakeDuration - currentTime;
    let seconds = Math.floor(elapsed%60);
    let minutes = Math.floor(elapsed/60);
    timeDisplay.textContent = `${minutes}:${seconds}`;
    let progress = outlineLength - (currentTime/fakeDuration) * outlineLength;
    console.log(progress);
    outline.style.strokeDashoffset = progress;
    outline.style.strokeDasharray = outlineLength-progress;

    if(currentTime >= fakeDuration){
        song.pause();
        song.currentTime = 0;
        play.src = "./svg/play.svg";
        video.pause();
    }
}

