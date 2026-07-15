<?php
    require_once(__DIR__ . '/db_connect.php');
    require_once(__DIR__ . '/variables.php');
    require_once(__DIR__ . '/functions.php');

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OwnYourPlate - S'inscrire</title>
    <link rel="stylesheet" href="./styles/style.css">
    <link rel="icon" type="image/x-icon" href="./assets/images/ico.svg">
</head>
<body>
    <?php require_once __DIR__.'/header.php'; ?>
    <main>
        <h1>Créez un compte</h1>
        <section id = "sign-up-form" class = "soft-border soft-radius">
            <form action="./submit_sign_up.php" method="POST">
                <label for="name">Nom utilisateur : </label>
                <input type="text" id="name" name="name" placeholder="superRoxxor99" required>
                <label for="email">Email : </label>
                <input type="email" id="email" name="email" placeholder="you@exemple.com" required>
                <label for="password">Mot de passe : </label>
                <input type="password" id="password" name="password" placeholder="p@ssw0rd" required>
                <label for="confirm-password">Confirmer votre mot de passe : </label>
                <input type="password" name="confirm-password" id="confirm-password" placeholder="p@ssw0rd" required>
                <button type="submit" class="small-button soft-border soft-shadow">Envoyer</button>
            </form>
        </section>
    </main>
    <?php require_once __DIR__.'/footer.php'; ?>
</body>
</html>