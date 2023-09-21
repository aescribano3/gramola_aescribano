//Slider casetes

var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
showDivs(slideIndex += n);
}

function showDivs(n) {
var i;
var x = document.getElementsByClassName("Slider");
if (n > x.length) {slideIndex = 1}
if (n < 1) {slideIndex = x.length} ;
for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
}
x[slideIndex-1].style.display = "block";
}

//Reprodueix la canço y mostra el boto de pause
function playAudio(){
    audio.play();
    document.getElementById('play').src="../assets/img/pause.png";
    document.getElementById('play').removeEventListener('click', playAudio, true);
    document.getElementById('play').addEventListener('click', pauseAudio, true);
}

//Para y reinicia la canço, mostra boto de play
function stopAudio(){
    audio.pause();
    audio.currentTime = 0;
    document.getElementById('play').src="../assets/img/play.png";
    document.getElementById('play').removeEventListener('click', pauseAudio, true);
    document.getElementById('play').addEventListener('click', playAudio, true);
}

//Pausa la canço y mostra el boto de play
function pauseAudio(){
    audio.pause();
    document.getElementById('play').src="../assets/img/play.png";
    document.getElementById('play').removeEventListener('click', pauseAudio, true);
    document.getElementById('play').addEventListener('click', playAudio, true);
}
audio = document.getElementById("audio");

//Crida al play
document.getElementById('play').addEventListener('click', playAudio, true);

//Crida al stop
document.getElementById("stop").addEventListener('click', stopAudio, true);

//Mou la barra de temps de la musica
audio.addEventListener('timeupdate', updateProgress);
function updateProgress() {
    const duration = audio.duration;
    const currentTime = audio.currentTime;
    const progressWidth = (currentTime / duration) * 100;
    progress.style.width = `${progressWidth}%`;
}

function updateTimeDisplay(player) {
    var currentTime = player.currentTime;
    var duration = player.duration;

    var currentMinutes = Math.floor(currentTime / 60);
    var currentSeconds = Math.floor(currentTime % 60);

    var durationMinutes = Math.floor(duration / 60);
    var durationSeconds = Math.floor(duration % 60);

    var currentTimeString = currentMinutes + ":" + (currentSeconds < 10 ? "0" : "") + currentSeconds;
    var durationTimeString = durationMinutes + ":" + (durationSeconds < 10 ? "0" : "") + durationSeconds;

    document.getElementById('duration').innerHTML = currentTimeString + ' / ' + durationTimeString;
}