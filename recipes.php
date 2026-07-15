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
    <?php require_once __DIR__.'/header.php';?>

    <main>
        <h1>Mes recettes</h1>
        <hr>
        <section id = "search-results" class ="soft-shadow soft-border content-box"> <!--Toutes mes recettes-->
            <article class = "result-product"> <!--Une recette-->
                <div class = "name-img-flex">
                    <img src="./assets/images/Blanquette.png" alt="Image d'un produit">
                    <h3>Blanquette de veau maison</h3>
                </div>
                <div class = "text-number">
                    <p>Poids total : </p>
                    <div class = "number-box soft-border">
                        <p>560 g</p>
                    </div>
                </div>
                <div class = "text-number">
                    <p>Calories : </p>
                    <div class = "number-box soft-border">
                        <p>2200 kJ</p>
                        <p>500 kCal</p>
                    </div>
                </div>
                <div class = "text-number">
                    <p>Ajoutée le :  </p>
                    <div class = "number-box soft-border">
                        <p>26/05/2026</p>
                    </div>
                </div>
                <div class = "text-number">
                    <p>Dernières modifications : </p>
                    <div class = "number-box soft-border">
                        <p>29/05/2026</p>
                    </div>
                </div>
                <div>
                    <button class = "small-button soft-border soft-shadow">Voir</button>
                </div>
                <hr class = "box-bar">
            </article>
        </section>
    </main>

    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro doloribus ut, rem consequuntur quis quia assumenda quos ratione sapiente, earum iste fugit eveniet illum. Animi.</p>
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro doloribus ut, rem consequuntur quis quia assumenda quos ratione sapiente, earum iste fugit eveniet illum. Animi.</p>
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro doloribus ut, rem consequuntur quis quia assumenda quos ratione sapiente, earum iste fugit eveniet illum. Animi.</p>
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro doloribus ut, rem consequuntur quis quia assumenda quos ratione sapiente, earum iste fugit eveniet illum. Animi.</p>
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro doloribus ut, rem consequuntur quis quia assumenda quos ratione sapiente, earum iste fugit eveniet illum. Animi.</p>
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro doloribus ut, rem consequuntur quis quia assumenda quos ratione sapiente, earum iste fugit eveniet illum. Animi.</p>
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro doloribus ut, rem consequuntur quis quia assumenda quos ratione sapiente, earum iste fugit eveniet illum. Animi.</p>
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro doloribus ut, rem consequuntur quis quia assumenda quos ratione sapiente, earum iste fugit eveniet illum. Animi.</p>
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro doloribus ut, rem consequuntur quis quia assumenda quos ratione sapiente, earum iste fugit eveniet illum. Animi.</p>
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro doloribus ut, rem consequuntur quis quia assumenda quos ratione sapiente, earum iste fugit eveniet illum. Animi.</p>
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro doloribus ut, rem consequuntur quis quia assumenda quos ratione sapiente, earum iste fugit eveniet illum. Animi.</p>

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

    <script src="./scripts/main.js"></script>
</body>
</html>