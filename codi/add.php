<?php
$files = glob("*.json");

$playlistId = 0;
if (isset($_POST["playlist_id"])) {
    $playlistId = (int)$_POST["playlist_id"];
}

$data = file_get_contents($files[$playlistId]);
$playlist = json_decode($data, true);

$songs = $playlist["cançons"];

// Comprueba si se ha enviado un archivo
if (isset($_FILES["song"]) && $_FILES["song"]["error"] === UPLOAD_ERR_OK) {
    // Obtiene información sobre el archivo de la canción
    $songTitle = $_POST["title"];
    $songAuthor = $_POST["author"];
    $songCover = $_POST["cover"];
    $tempFilePath = $_FILES["song"]["tmp_name"];

    // Genera un nombre único para el archivo de la canción
    $fileName = uniqid() . ".mp3";
    
    // Mueve el archivo de la canción a la ubicación deseada
    move_uploaded_file($tempFilePath, "../assets/music/" . $fileName);

    // Crea un nuevo objeto de canción
    $newSong = [
        "title" => $songTitle,
        "artist" => $songAuthor,
        "url" => "../assets/music/" . $fileName,
        "cover" => $songCover,
    ];

    // Añade la nueva canción al array de canciones
    $songs[] = $newSong;

    // Actualiza el array de canciones en el archivo JSON
    $playlist["cançons"] = $songs;
    $cançonsJSON = json_encode($playlist);

    // Guarda los cambios en el archivo JSON
    file_put_contents($files[$playlistId], $cançonsJSON);
}

header("Location: index.php?playlist_id={$playlistId}");
?>