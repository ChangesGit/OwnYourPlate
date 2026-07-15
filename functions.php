<?php require_once __DIR__.'/db_connect.php';

    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    };

    function redirectToUrl(string $url): never
    {
        header("Location: {$url}");
        exit();
    }


    function insertSignUp(PDO $mysqlClient, string $userName, string $userEmail, string $userPassword) {
        $signUpSQL = $mysqlClient->prepare("INSERT INTO users (`name`, email, `password`) VALUES
        (?, ?, ?)");
        $signUpSQL->execute([$userName, $userEmail, password_hash($userPassword, PASSWORD_DEFAULT)]);
    }

    function emailExists(PDO $mysqlClient, string $userEmail) {
        $fetchEmailsNames = $mysqlClient->prepare('SELECT email FROM users WHERE email=?');
        $fetchEmailsNames->execute([$userEmail]);

        return $fetchEmailsNames->fetch() !== false; //Si cet email existe déjà dans la base de donnée, renvoie true;
    }


    //Si l'email et le mot de passe correspondent -> stock le nom dans la session et renvoie true, sinon, renvoie false.
    function loginVerification(PDO $mysqlClient, string $userEmail, string $userPassword) {
        $fetchUsers = $mysqlClient->prepare('SELECT `name`, email, `password` FROM users WHERE email = ?');
        $fetchUsers->execute([$userEmail]);
        $userData = $fetchUsers->fetch();
        if($userData !== false && password_verify($userPassword, $userData['password'])) {
            $_SESSION['name'] = $userData['name'];
            return true;
        }
        elseif($userData === false) {
            return false;
        }
    }
?>