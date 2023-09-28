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

//Crida a la barra de reproducció
document.getElementById('progress-bar').addEventListener('click', progress);

//Crida al audio
audio = document.getElementById("audio");

// Actualitzar la barra mentres sona la canço
audio.addEventListener('timeupdate', updateProgress);

// Reprodueix la seguent canço
audio.addEventListener('ended', playNextSong);

// Variables per la caratula
var cover_img = document.getElementById("cover");
var cover_txt = document.getElementById("cover_txt");

// Index de la canço actual
var currentSongIndex = 0;

// Ordre original
var originalSongOrder = [];

// Retrocedeix
function backwardAudio() {
    currentSongIndex--;
    document.getElementById('forward').src = "../assets/img/forward.png";
    if (currentSongIndex < 0) {
        currentSongIndex++;
        document.getElementById('backward').src = "../assets/img/backward_off.png";
    }
    playSongAtIndex(currentSongIndex);
}

// Activa el random
function randomAudio() {
    if (originalSongOrder.length === 0) {
        for (var i = 0; i < cançons.length; i++) {
            originalSongOrder.push(i);
        }
    }

    // Barreja l'ordre de les cançons
    shuffleArray(originalSongOrder);

    playSongAtIndex(originalSongOrder[currentSongIndex]);
    equalizer.style.display = "flex";
}

//Reprodueix la canço y mostra el boto de pause
function playAudio(){
    audio.play();
    document.getElementById('play').src="../assets/img/pause.png";
    document.getElementById('play').removeEventListener('click', playAudio, true);
    document.getElementById('play').addEventListener('click', pauseAudio, true);
    equalizer.style.display = "flex";
    document.getElementById('random').src = "../assets/img/random.png";
    document.getElementById('backward').src = "../assets/img/backward.png";
    document.getElementById('forward').src = "../assets/img/forward.png";
    document.getElementById('stop').src = "../assets/img/stop.png";
    document.getElementById('progress-bar').style.backgroundColor = "#222222"
}

//Pausa la canço y mostra el boto de play
function pauseAudio(){
    audio.pause();
    document.getElementById('play').src="../assets/img/play.png";
    document.getElementById('play').removeEventListener('click', pauseAudio, true);
    document.getElementById('play').addEventListener('click', playAudio, true);
    equalizer.style.display = "none";
}

// Avanza
function forwardAudio() {
    currentSongIndex++;
    document.getElementById('backward').src = "../assets/img/backward.png";
    if (currentSongIndex >= cançons.length) {
        currentSongIndex--;
        document.getElementById('forward').src = "../assets/img/forward_off.png";

    }
    playSongAtIndex(currentSongIndex);
}

//Para y reinicia la canço, mostra boto de play
function stopAudio(){
    audio.pause();
    audio.currentTime = 0;
    document.getElementById('play').src="../assets/img/play.png";
    document.getElementById('play').removeEventListener('click', pauseAudio, true);
    document.getElementById('play').addEventListener('click', playAudio, true);
    equalizer.style.display = "none";
}

// Barreja la playlist
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Reproduir la canço en el index
function playSongAtIndex(index) {
    var song = cançons[index];
    audio.src = song.url;
    audio.play();
    document.getElementById('play').src = "../assets/img/pause.png";

    // Actualitza la caratula
    cover_img.src = song.cover;
    cover_txt.textContent = song.title + " / " + song.artist;

    // Actualitza el index
    currentSongIndex = index;
}

// Reprodueix la primera canço, afegeix les cancçons a la llista y modifica la caratula
function playAudioLlista(url, title, cover, artist) {
    audio.src = url;
    audio.play();
    document.getElementById('progress-bar').style.backgroundColor = "#222222"
    document.getElementById('play').src = "../assets/img/pause.png";
    document.getElementById('random').src = "../assets/img/random.png";
    document.getElementById('backward').src = "../assets/img/backward.png";
    document.getElementById('forward').src = "../assets/img/forward.png";
    document.getElementById('stop').src = "../assets/img/stop.png";

    // Actualitza la caratula y el titol
    cover_img.src = cover;
    cover_txt.textContent = title + " / " + artist;
    equalizer.style.display = "flex";
}

// Funció per moure la barra de temps
function progress(event) {
    const progressBar = document.getElementById('progress-bar');
    const audio = document.getElementById('audio');

    // Obtenir la posició
    const clickX = event.clientX - progressBar.getBoundingClientRect().left;
    const progressBarWidth = progressBar.clientWidth;
    const progressPosition = (clickX / progressBarWidth) * audio.duration;

    // Establir la nova posició
    audio.currentTime = progressPosition;
}

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

// Función per reproduir la seguent canço
function playNextSong() {
    currentSongIndex++;
    /*if (currentSongIndex >= cançons.length) {
        currentSongIndex = 0;
    }*/
    playSongAtIndex(currentSongIndex);
}

if (audio.src == ""){
    equalizer.style.display = "none";
    document.getElementById('random').src = "../assets/img/random_off.png";
    document.getElementById('backward').src = "../assets/img/backward_off.png";
    document.getElementById('play').src = "../assets/img/play_off.png";
    document.getElementById('forward').src = "../assets/img/forward_off.png";
    document.getElementById('stop').src = "../assets/img/stop_off.png";
}