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
//Afegir les funcions
//Reprodueix la canço y mostra e boto de pause
function playAudio(){
    myAudio.play();
    document.getElementById('play').src = "../assets/img/pause.png";
    document.getElementById('play').id = "pause";
    document.getElementById("pause").addEventListener('click', pausarAudio, true);
}
function stopAudio(){
    myAudio.pause();
    myAudio.currentTime = 0;
    document.getElementById('pause').src = "../assets/img/play.png";
    document.getElementById('pause').id = "play";
}
//Pausa la canço y mostra el boto de play
function pausarAudio(){
    myAudio.pause();
    document.getElementById('pause').src = "../assets/img/play.png";
    document.getElementById('pause').id = "play";
}
myAudio = document.getElementById("myAudio");
//Afegir controls als botons
document.getElementById("play").addEventListener('click', playAudio, true);
document.getElementById("stop").addEventListener("click", stopAudio, true);