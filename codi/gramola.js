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

//Activa la opció de aeatori
function randomAudio(){

}

//Avança a la seguent canço
function backwardAudio(){

}

//Retrocedir una canço
function forwardAudio(){
    
}

//Crida al play
document.getElementById('play').addEventListener('click', pauseAudio, true);

//Crida al stop
document.getElementById("stop").addEventListener('click', stopAudio, true);

//Crida al random
document.getElementById("random").addEventListener('click', randomAudio, true);

//Crida al backward
document.getElementById("backward").addEventListener('click', backwardAudio, true);

//Crida al forward
document.getElementById("forward").addEventListener('click', forwardAudio, true);

//Barra de progres
audio.addEventListener('timeupdate', updateProgress);

//Mou la barra de temps de la musica
function updateProgress() {
    const duration = audio.duration;
    const currentTime = audio.currentTime;
    const progressWidth = (currentTime / duration) * 100;
    document.getElementById('progress').style.width = `${progressWidth}%`;
}

//Durada de la canço
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

// Variables para la carátula y el título
var cover_img = document.getElementById("cover");
var cover_txt = document.getElementById("cover_txt");

// Función para reproducir una canción en el elemento de audio y actualizar la carátula y el título
function playAudioLlista(url, title, cover, artist) {
    var audio = document.getElementById("audio");
    audio.src = url;
    audio.play();
    document.getElementById('play').src="../assets/img/pause.png";

    // Actualiza la carátula y el título
    cover_img.src = cover;
    cover_txt.textContent = title + " / " + artist;
}