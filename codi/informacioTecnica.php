<?php



?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Wavefont">
    <link rel="stylesheet" href="gramola.css">
    <title>Informació Tecnica</title>
</head>
<body>
    <div id="cookies">
        <h3> Usuari: 
            <?php
                echo $_COOKIE["username"];
            ?>
        </h3>
        <h3> Id ultima playlist escoltada: 
            <?php
                echo $_COOKIE["playlist_id"];
            ?>
        </h3>
        <h3> Data utima playlist escoltada: 
            <?php
                echo $_COOKIE["playlist_time"];
            ?>
        </h3>
    </div>
    <script src="gramola.js"></script>
</body>
</html>