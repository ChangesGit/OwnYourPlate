<?php namespace View;

use View\View;

class ViewHeader{
    private ?string $title;
    private ?string $link;
    private ?string $buffer = "";

    public function __construct(?string $title, ?string $link) {
        $this->title = $title;
        $this->link = $link;
    }

    //METHODS
    public function launchBuffer():self {
        ob_start();
?>
<!DOCTYPE html>
<html lang="en">
    
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $this->title ?></title>
    <link rel="stylesheet" href=<?= $this->link ?>>
    <link rel="icon" type="image/x-icon" href="./assets/images/ico.svg">
</head>

    <header>
        <div id = "burger-menu">
            <button id = "menu-toggle"><img src="./assets/images/burger-menu.svg" alt="Navigation button"></button>
            <nav class = "soft-shadow">
                <ul>
                    <a href="./index.php">
                        <li>Accueil</li>
                    </a>
                    <a href="./recipes.php">
                        <li>Mes Recettes</li>
                    </a>
                    <a href="">
                        <li>Mes Aliments</li>
                    </a>
                    <a href="">
                        <li>Mes Journées</li>
                    </a>
                    <a href="">
                        <li>Nous Contacter</li>
                    </a>
                </ul>
            </nav>
        </div>
        <img class = "mobile-logo" src="./assets/images/mobile-logo.png" alt="Logo OwnYourPlate mobile">
        <img class = "desktop-logo mobile-hidden-flex" src="./assets/images/desktop-logo.svg" alt="Logo OwnYourPlate desktop">
        <nav class = "desktop-nav mobile-hidden-flex">
            <ul>
                <a href="./index.php">
                    <li>Accueil</li>
                </a>
                <li>|</li>
                <a href="./recipes.php">
                    <li>Mes Recettes</li>
                </a>
                <li>|</li>
                <a href="">
                    <li>Mes Aliments</li>
                </a>
                <li>|</li>
                <a href="">
                    <li>Mes Journées</li>
                </a>
                <li>|</li>
                <a href="">
                    <li>Nous Contacter</li>
                </a>
            </ul>
        </nav>
        <div>
            <img class = "header-icon" src="./assets/images/language-icon.svg" alt="Icône langue">
            <img id = "login-button" class = "header-icon header-icon-right" src="./assets/images/user-icon.svg" alt="Icône Utilisateur">
            <?php if(!isset($_SESSION['name'])) {
                require_once __DIR__.'/login.php';
            }
            else {
                require_once __DIR__.'/profile.php';
            }
            ?>

        </div>
    </header>

<?php

        $this->buffer = ob_get_clean();
        return $this;
    }


}