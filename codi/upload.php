<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Wavefont">
        <link rel="stylesheet" href="gramola.css">
        <title>Document</title>
    </head>
    <body>
    <form action="add.php" method="post" enctype="multipart/form-data">
        <label for="playlist">Selecciona la Playlist:</label>
        <select id="playlist" name="playlist_id">
            <option value="0">Classic</option>
            <option value="1">Pop</option>
            <option value="2">Rock</option>
            <option value="3">Tecno</option>
        </select>
        <input type="file" name="song">
        <label for="title">Título de la canción:</label>
        <input type="text" name="title" id="title" required>
        <label for="author">Autor:</label>
        <input type="text" name="author" id="author" required>
        <label for="cover">Portada (URL):</label>
        <input type="text" name="cover" id="cover" required>
        <button type="submit">Pujar canción</button>
    </form>
        <script src="gramola.js"></script>
    </body>
</html>