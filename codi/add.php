<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$files = glob("*.json");

$playlistId = 0;
if (isset($_POST["playlist_id"])) {
    $playlistId = (int)$_POST["playlist_id"];
}

$data = file_get_contents($files[$playlistId]);
$playlist = json_decode($data, true);

$songs = $playlist["cançons"];

//echo "File path: " . $files[$playlistId];

//echo "Upload error code: " . $_FILES["url"]["error"];

// Comprova si s'ha enviat un arxiu
if (isset($_FILES["url"]) && $_FILES["url"]["error"] === UPLOAD_ERR_OK) {
    // Obtenir informació
    $songTitle = $_POST["title"];
    $songArtist = $_POST["artist"];
    $tempFilePath = $_FILES["url"]["tmp_name"];
    $songCover = $_POST["cover"];

    $fileName = uniqid() . ".mp3";

    //echo "Temp file path: " . $tempFilePath;

    //echo "New file path: " . "../assets/music/" . $fileName;

    // Mou la canço a la carpeta de les cançons
    move_uploaded_file($tempFilePath, "../assets/music/" . $fileName);

    // Crea un objecte per la nova canço
    $newSong = [
        "title" => $songTitle,
        "artist" => $songArtist,
        "url" => "../assets/music/" . $fileName,
        "cover" => $songCover,
    ];

    // Afegeix la nova cancço al array
    $songs[] = $newSong;

    // Actualitza l'arxiu JSON
    $playlist["cançons"] = $songs;
    $cançonsJSON = json_encode($playlist);

    // Desa els canvis al JSON
    file_put_contents($files[$playlistId], $cançonsJSON);
}

header("Location: ../index.php?playlist_id={$playlistId}");
?>