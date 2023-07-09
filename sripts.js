console.log("Hello");
var songIndex = 0;
var audio=new Audio("songs/1.mp3") ;
var audioElement = document.getElementById("masterplay");
var myProgressBar = document.getElementById("myProgressBar");
var gif = document.getElementById("gif");
let masterSongName = document.getElementById('masterSongName');
var songsList=[
  {songName:"Blinding-Lights",filePath:"songs/1.mp3",coverPath:"covers/1.jpg"},
  {songName:"295",filePath:"songs/2.mp3",coverPath:"covers/2.jpg"},
  {songName:"Big Scene",filePath:"songs/3.mp3",coverPath:"covers/3.jpg"},
  {songName:"California Love",filePath:"songs/4.mp3",coverPath:"covers/4.jpg"},
  {songName:"Dance Monkey",filePath:"songs/5.mp3",coverPath:"covers/5.jpg"},
  {songName:"Do You Know",filePath:"songs/6.mp3",coverPath:"covers/6.jpg"},
  {songName:"Heat Waves",filePath:"songs/7.mp3",coverPath:"covers/7.jpg"},
  {songName:"Parshawan",filePath:"songs/8.mp3",coverPath:"covers/8.jpg"},
  {songName:"Rabb Jane",filePath:"songs/9.mp3",coverPath:"covers/9.jpg"},
  {songName:"Showstopper",filePath:"songs/10.mp3",coverPath:"covers/10.jpg"}
]
var i=0;
var number=document.querySelectorAll(".songItem");
//giving all songs names and files etc.->
for(i;i<document.querySelectorAll(".songItem").length;i++){
  number[i].getElementsByTagName("img")[0].src=songsList[i].coverPath;
  number[i].getElementsByTagName("span")[0].innerText=songsList[i].songName;
  var tempAudio = new Audio(songsList[i].filePath);
  // Set the onloadedmetadata event handler to get the duration
  tempAudio.onloadedmetadata = (function (index, audio) {
    return function () {
      number[index].getElementsByTagName("span")[1].innerText = formatTime(audio.duration);
    };
    })(i, tempAudio);


}
//-------


// Audio play/pause at bottom button->
audioElement.addEventListener("click", function () {
  if (audio.paused) {
    audio.play();
    audioElement.classList.remove("fa-play");
    audioElement.classList.add("fa-pause");
    gif.style.opacity = 1;
  } else {
    audio.pause();
    audioElement.classList.remove("fa-pause");
    audioElement.classList.add("fa-play");
    gif.style.opacity = 0;
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === " ") {
    if (audio.paused) {
      audio.play();
      audioElement.classList.remove("fa-play");
      audioElement.classList.add("fa-pause");
      gif.style.opacity = 1;
      setInterval(updateProgress, 50);
    } else {
      audio.pause();
      audioElement.classList.remove("fa-pause");
      audioElement.classList.add("fa-play");
      gif.style.opacity = 0;
      makeAllPlays();
    }
  }
});
//--------


// Update progress bar and time progress
function updateProgress() {
  if (!audio.paused) {
    var progress = (audio.currentTime / audio.duration) * 100;
    myProgressBar.value = progress;

    var currentTime = formatTime(audio.currentTime);
    var duration = formatTime(audio.duration);
    document.querySelector(".audiotime").innerHTML = currentTime + ' / ' + duration;
  }
}

// Format time in MM:SS format
function formatTime(time) {
  var minutes = Math.floor(time / 60);
  var seconds = Math.floor(time % 60);
  return ('0' + minutes).slice(-2) + ':' + ('0' + seconds).slice(-2);
}

// Smooth progress update
var progressUpdateInterval = setInterval(updateProgress, 50); // Update every 50 milliseconds

// Clear interval when audio is paused or ended
audio.addEventListener('pause', function () {
  clearInterval(progressUpdateInterval);
});
audio.addEventListener('ended', function () {
  clearInterval(progressUpdateInterval);
});

myProgressBar.addEventListener('input', function () {
  var seekTime = (myProgressBar.value * audio.duration) / 100;
  audio.currentTime = seekTime;
});

//-------
const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
    })
}
Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
  element.addEventListener("click",function(event){
    if(event.target.classList.contains("fa-play")){
      makeAllPlays();
      songIndex=parseInt(event.target.id);
      event.target.classList.remove("fa-play");
      event.target.classList.add("fa-pause");
      masterSongName.innerText = songsList[songIndex].songName;
      audio.src = `songs/${songIndex+1}.mp3`;
      audio.currentTime=0;
      audio.play();
      masterplay.classList.remove("fa-play");
      masterplay.classList.add("fa-pause");
      gif.style.opacity = 1;
    }
    else{
      makeAllPlays();
      songIndex=parseInt(event.target.id);
      masterSongName.innerText = songsList[songIndex].songName;
      audio.pause();
      masterplay.classList.add("fa-play");
      masterplay.classList.remove("fa-pause");
      gif.style.opacity = 0;
    }
  })
})
document.querySelector(".fa-forward-step").addEventListener('click',function(){
  if(songIndex>=9){
      songIndex = 0
  }
  else{
      songIndex += 1;
  }
  makeAllPlays();
  audio.src = `songs/${songIndex+1}.mp3`;
  document.getElementById(songIndex).classList.add("fa-pause");
  document.getElementById(songIndex).classList.remove("fa-play");
  audio.currentTime=0
  audio.play();
  masterSongName.innerText = songsList[songIndex].songName;
  masterplay.classList.remove("fa-play");
  masterplay.classList.add("fa-pause");
  gif.style.opacity = 1;
})
document.querySelector(".fa-backward-step").addEventListener('click',function(){
  if(songIndex<=9){
      songIndex = 9
  }
  else{
      songIndex -= 1;
  }
  makeAllPlays();
  audio.src = `songs/${songIndex+1}.mp3`;
  document.getElementById(songIndex).classList.add("fa-pause");
  document.getElementById(songIndex).classList.remove("fa-play");
  audio.currentTime=0
  audio.play();
  masterSongName.innerText = songsList[songIndex].songName;
  masterplay.classList.remove("fa-play");
  masterplay.classList.add("fa-pause");
  gif.style.opacity = 1;
})
