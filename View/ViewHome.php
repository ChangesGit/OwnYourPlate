<?php namespace View;

use View\View;

class ViewHome extends View {



    //METHODS
    public function launchBuffer():self {
        ob_start();

?>
    <main>
        <h1>Approprie toi ton assiette !</h1>
        <?php if(isset($_SESSION['name'])) {
            echo '<h2>Bonjour, '. $_SESSION['name'] .'.</h2>';
        }
        ?>
        <hr> <!--barre de séparation-->

        <section> <!--Barre de recherche-->
            <form action="" method = "POST">
                <div id = "search-bar" class = "soft-shadow">
                    <div>
                        <img class = "icon-img" src="./assets/images/search-icon.svg" alt="Search Icon">
                    </div>
                    <input type="search" name = "searchBar" id = "searchBar" placeholder="Rechercher">
                </div>
                <p>Cherchez 1 objet à la fois</p>
                <button id = "search-button" class = "small-button soft-shadow soft-border" type = "submit">Rechercher</button>
                <button class = "small-button soft-shadow soft-border reset-search-bar" type = "reset">Effacer</button>
            </form>
        </section>

        <section id = "search-results" class ="soft-shadow soft-border content-box"> <!--Résultat recherche-->
            <h2 style="margin-top: 0px;margin-bottom: 0px;">Résultats</h2>
            <hr>
            <?php foreach($this->getData() as $ingredient) {
                $viewIngredient = new ViewIngredient($ingredient['name'], $ingredient['kj'], $ingredient['kcal'], $ingredient['proteins'], $ingredient['carbs'], $ingredient['imgurl']);
                $viewIngredient->launchBuffer()->display();
            } ?>
        </section>
        <button class = "soft-border soft-shadow large-button" type = "POST">Work In Progress</button>
        <?php if(!isset($_SESSION['name'])) {
            echo '<a class = "guest-link" href="sign_up">Créez un compte pour enregistrer des aliments personnalisés</a>';
        }
        ?>

        <section id = "pending-food-box" class = "soft-border soft-shadow content-box"> <!--Aliments choisis-->
            <h2 style="margin-top: 0px;margin-bottom: 0px;">Aliments choisis</h2>
            <hr>
            <div class = "pending-food-box-buttons">
                <div>
                    <button class="small-button soft-border soft-shadow">Work In Progress</button>
                    <button class="small-button soft-border soft-shadow reset-pending">Effacer</button>
                </div>
                <button id = "create-recipe-button" class = "large-button soft-border soft-shadow">Enregistrer recette</button>
                <?php if(!isset($_SESSION['name'])) {
                    echo '<a class = "guest-link" href="/sign_up">Créez un compte pour enregistrer des recettes</a>';
                }
                ?>
                <dialog id = "create-recipe-form">
                    <button>x</button>
                    <form  action = "/recipe_create" method="POST">
                        <label for="recipe-name">Nom de la recette :</label>
                        <input id = "recipe-name" type="text" placeholder="Blanquette de veau">
                        <button id = "send-recipe-button" class = "small-button soft-shadow soft-border" type = "button">Enregistrer</button>
                    </form>
                </dialog>
            </div>
        </section>


        <section class = "summary-box soft-border soft-shadow content-box"> <!--Total Nutritionnel-->
            <h2>Total :</h2>
            <div class = "text-number">
                <p>Poids total : </p>
                <div class = "number-box soft-border">
                    <p id = "total-mass">0 g</p>
                </div>
            </div>
            <h3>Caractéristiques nutritives :</h3>

            <div class="item-infos-grid">

                <div class = "item-infos-grid-element">
                    <p>Calories</p>
                    <div class = "number-box soft-border">
                        <p id = "total-kj">0 kJ</p>
                        <p id = "total-kcal">0 kCal</p>
                    </div>
                </div>
                <div class = "item-infos-grid-element">
                    <p>Protéines</p>
                    <div class = "number-box soft-border">
                        <p id = "total-proteins">0 g</p>
                    </div>
                </div>
                <div class = "item-infos-grid-element">
                    <p>Glucides</p>
                    <div class = "number-box soft-border">
                        <p id = "total-carbs">0 g</p>
                    </div>
                </div>
                <div class = "item-infos-grid-element">
                    <p>Fibres</p>
                    <div class = "number-box soft-border">
                        <p id = "total-fibers">0 g</p>
                    </div>
                </div>
                <div>
                    <div class = "item-infos-grid-element">
                        <p>Matières grasses</p>
                        <div class = "number-box soft-border">
                            <p id = "total-fat">0 g</p>
                        </div>
                    </div>
                    <div class = "item-infos-grid-element">
                        <p>Dont Acides gras saturés</p>
                        <div class = "number-box soft-border">
                            <p id = "total-saturated-fat">0 g</p>
                        </div>
                    </div>
                </div>
                <div class = "item-infos-grid-element">
                    <p>Sel</p>
                    <div class = "number-box soft-border">
                        <p id = "total-salt">0 g</p>
                    </div>
                </div>
            </div>
        </section>
    </main>

<?php

        $this->setBuffer(ob_get_clean());
        return $this;
    }
}