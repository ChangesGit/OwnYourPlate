<?php require_once(__DIR__ . '/db_connect.php');
    require_once(__DIR__ . '/variables.php');
    require_once(__DIR__ . '/functions.php');

    $postData = $_POST;

    if(isset($postData['email']) && isset($postData['password'])) {
        if(!filter_var($postData['email'], FILTER_VALIDATE_EMAIL)) {
            $_SESSION['LOGIN_ERROR_MESSAGE'] = 'Il faut un email valide pour soumettre le formulaire.';
        }
        else {
            if(loginVerification($mysqlClient, $postData['email'], $postData['password'])) {
                redirectToUrl('./index.php');
            }
            else {
                echo "Email ou mot de passe invalide";
            }
        }
    }