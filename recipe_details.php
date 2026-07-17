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
    <title>Document</title>
    <link rel="stylesheet" href="./styles/style.css">
</head>
<body>
    <?php require_once(__DIR__.'/header.php');?>

    <main>
        <h1>Mes recettes</h1>
        <?php echo '<h2>'.$_GET['name'].'</h2>'; ?>
        <hr>
        <section id = "recipe-box" class ="soft-shadow soft-border content-box"> <!--Toutes mes recettes-->

        </section>
    </main>


    <footer>
        <img class = "mobile-logo" src="./assets/images/mobile-logo.png" alt="Logo mobile OwnYourPlate">
        <nav>
            <ul>
                <div>
                    <a href=""><li>Mentions légales & gestion de données</li></a>
                    <a href=""><li>Notre base de données</li></a>
                </div>
                <div>
                    <a href=""><li>Nous contacter</li></a>
                    <a href=""><li>A propos</li></a>
                    <a href=""><li>FAQ</li></a>
                </div>
            </ul>
        </nav>
    </footer>

    <script src="./scripts/variables.js"></script>
    <script src="./scripts/functions.js"></script>
    <!-- <script src="./scripts/main.js"></script>   -->
    <script src="./scripts/recipe_details.js"></script>
</body>
</html>