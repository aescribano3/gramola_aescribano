<?php
session_start();
//Elimina el nom d'usuari y torna al index
unset($_SESSION["username"]);

header("Location: index.php");
?>