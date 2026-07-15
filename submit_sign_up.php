<?php session_start();    
    require_once(__DIR__ . '/db_connect.php');
    require_once(__DIR__ . '/variables.php');
    require_once(__DIR__ . '/functions.php');

    $postData = $_POST;


    if(isset($postData['name']) && isset($postData['email']) && isset($postData['password'])) {
        if(!emailExists($mysqlClient, $postData['email'])) {
            if(!filter_var($postData['email'], FILTER_VALIDATE_EMAIL)) {
                $_SESSION['LOGIN_ERROR_MESSAGE'] = "Il faut un email valide pour s'inscrire";
            }
            else {
                insertSignUp($mysqlClient, $postData['name'], $postData['email'], $postData['password']);
                echo 'Inscription réussie';
                echo "<br/>";
                echo '<a href="./index.php">Retour sur la page d\'accueil</a>';
            }
        }
        else {
            echo "Un compte existe déjà pour cet email<br/>";
            echo '<a href="./sign_up.php">Réessayer</a><br/>';
            echo '<a href="./index.php">Retourner à l\'accueil</a>';
            }
    }