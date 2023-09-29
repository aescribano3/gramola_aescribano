<?php
session_start();

$files = glob("*.json");

$playlistId = 0;
if (isset($_GET["playlist_id"])) {
    $playlistId = (int)$_GET["playlist_id"];
}

$data = file_get_contents($files[$playlistId]);
$playlist = json_decode($data, true);
$cançons = $playlist["cançons"];

// Verifica si s'ha iniciat sessio
$loggedIn = false;

if (isset($_POST["name"]) && isset($_POST["pwd"])) {
    $username = $_POST["name"];
    $password = $_POST["pwd"];
    $loggedIn = true;
    $_SESSION["username"] = $username;
}

//Guarda el nom d'usuari a la cookie
if (isset($_SESSION["username"])) {
    $username = $_SESSION["username"];
    $loggedIn = true;
}

// Nom de les playlists
$playlist_names = ["Classic", "Pop", "Rock", "Tecno"];

// Guarda la id, data y nom de l'ultima playlist seleccionada
if (isset($_GET["playlist_id"])) {
    $playlistId_last = (int)$_GET["playlist_id"];
    $data_seleccio = gmdate('Y-m-d h:i:s \G\M\T', time());
    $playlist_name_last = $playlist_names[$playlistId_last];
}

if (isset($playlistId_last)) {
    setcookie("playlist_id", $playlistId_last, strtotime("1 day"), "/");
    setcookie("playlist_time", $data_seleccio, strtotime("1 day"), "/");
    setcookie("playlist_name", $playlist_name_last, strtotime("1 day"), "/");
} elseif (isset($_COOKIE["playlist_id"])) {
    $playlistId_last = $_COOKIE["playlist_id"];
    $data_seleccio = $_COOKIE["playlist_time"];
    $playlist_name_last = $_COOKIE["playlist_name"];
}
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="icon" type="image/png" href="../assets/img/icono.PNG">
        <!--Link de l'estil css-->
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Wavefont">
        <link rel="stylesheet" href="gramola.css">
        <title>GRAMOLA / AESCRIBANO</title>
    </head>
    <body>
    <header>
        <!-- Icone de la pagina -->
        <img id="icono" src="../assets/img/icono.PNG" alt="icono">
        <?php if ($loggedIn): ?>
            <!-- Mostra el nom y el logout si s'ha iniciat sessió -->
            <div id="user-info">
                <h2 id="nom"><?= $username ?></h2>
                <a href="logout.php"><h4 id="logout">Log Out</h4></a>
            </div>
        <?php else: ?>
            <!-- Monstra formulari si no s'ha iniciat sessió -->
            <form id="login-form" action="#" method="post">
                <div class="form-group">
                    <label for="name">Nom d'Usuari:</label>
                    <input type="text" id="name" name="name" placeholder="Insereix el nom d'usuri" required>
                </div>
                <div class="form-group">
                    <label for="pwd">Contrasenya:</label>
                    <input type="password" id="pwd" name="pwd" placeholder="Insereix la contrasenya" required>
                </div>
                <div class="form-group">
                    <input type="submit" value="Inici Sesió">
                </div>
            </form>
        <?php endif; ?>
        <?php if($loggedIn): ?>
                <a href="informacioTecnica.php"><p>Informació Tecnica</p></a>
            <?php endif; ?>
    </header>
        <div id="casete">
        <!-- Afegeix un enllaç a les imatges -->
        <a href="index.php?playlist_id=0"><img id='Classic' class="Slider" src="../assets/img/Classic.png"></a>
        <a href="index.php?playlist_id=1"><img id='Pop' class="Slider" src="../assets/img/Pop.png"></a>
        <a href="index.php?playlist_id=2"><img id='Rock' class="Slider" src="../assets/img/Rock.png"></a>
        <a href="index.php?playlist_id=3"><img id='Tecno' class="Slider" src="../assets/img/Tecno.png"></a>
        <button class="w3-button w3-display-left" id="botI" onclick="plusDivs(-1)">&#10094;</button>
        <button class="w3-button w3-display-right" id="botD" onclick="plusDivs(+1)">&#10095;</button>
    </div>
    <div id="div_2">
        <!-- Llista de reproducció-->
        <div id="Llista">
        <?php if (isset($_GET["playlist_id"]) && is_numeric($_GET["playlist_id"]) && $_GET["playlist_id"] >= 0 && $_GET["playlist_id"] < count($files)): ?>
            <ul>
            <?php
                // Genera la llista de les cançons de la playlist seleccionada
                foreach ($cançons as $canço) {
                    echo "<li onclick=\"playAudioLlista(
                        '{$canço['url']}',
                        '{$canço['title']}',
                        '{$canço['cover']}',
                        '{$canço['artist']}')\">
                        {$canço['title']}
                        </li>";
                }
                ?>
            </ul>
        <?php endif; ?>
        </div>
        <div id="Caratula">
            <img id="cover" src="" alt="">
            <p id="cover_txt"></p>
        </div>
    </div>
        <footer>
            <!--Creació del control d'audio-->
            <div class="equalizer" id="equalizer">
                <div class="equalizer__bar"></div>
                <div class="equalizer__bar"></div>
                <div class="equalizer__bar"></div>
                <div class="equalizer__bar"></div>
                <div class="equalizer__bar"></div>
                <div class="equalizer__bar"></div>
                <div class="equalizer__bar"></div>
                <div class="equalizer__bar"></div>
            </div>
            <img id="random" src="../assets/img/random.png">
            <img id="backward" src="../assets/img/backward.png">
            <img id="play" src="../assets/img/play.png">
            <img id="forward" src="../assets/img/forward.png">
            <img id="stop" src="../assets/img/stop.png">
            <audio id="audio" ontimeupdate="updateTimeDisplay(this)">
                <source src="" type="audio/mp3">
            </audio>
            <div id="progress-bar" onclick="progress(event)">
                <div id="progress"></div>
            </div>
            <div id="duration">0:00 / 0:00</div>
            <div>
                <a href="upload.php"><p>Upload Song</p></a>
            </div>
            <script src="gramola.js"></script>
        </footer>
        <script>
            // Verifica si s'ha especificat playlist_id a la URL
            const urlParams = new URLSearchParams(window.location.search);
            const playlistId = urlParams.get("playlist_id");

            // Si playlist_id esta definit, reprodueix la primera canço de la llista
            if (playlistId !== null && !isNaN(playlistId) && playlistId >= 0 && playlistId < <?php echo count($files); ?>) {
                const firstSong = <?php echo json_encode($playlist["cançons"][0]); ?>;
                playAudioLlista(firstSong.url, firstSong.title, firstSong.cover, firstSong.artist);
            }

            var cançons = <?php echo json_encode($cançons); ?>;
        </script>
    </body>
</html>