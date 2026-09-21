<?php namespace View;

use View\View;

class ViewRecipes extends View {
    private ?string $message = "";


    //GETTERS AND SETTERS
    public function getMessage():string {
        return $this->message;
    }

    public function setMessage(string $message):self {
        $this->message = $message;
        return $this;
    }
    //METHODS
    public function launchBuffer():self {
        ob_start();
?>
    <main>
        <p><?= $this->message ?></p>
        <h1>Mes recettes</h1>
        <hr>
        <section id = "recipes-box" class ="soft-shadow soft-border content-box"> <!--Toutes mes recettes-->
            <?php foreach($this->getData() as $recipe) { ?>
                <article class = "recipe"> <!--Une recette-->
                    <div class = "name-img-flex">
                        <img src=<?= $recipe['imgurl'] ?> alt="Image d'un produit">
                        <h3>${name}</h3>
                    </div>
                    <div class = "text-number">
                        <p>Poids total : </p>
                        <div class = "number-box soft-border">
                            <p>${grams} g</p>
                        </div>
                    </div>
                    <div class = "text-number">
                        <p>Calories : </p>
                        <div class = "number-box soft-border">
                            <p>${kj} kJ</p>
                            <p>${kcal} kCal</p>
                        </div>
                    </div>
                    <div class = "text-number">
                        <p>Ajoutée le :  </p>
                        <div class = "date-box soft-border">
                            <p>${createdAt}</p>
                        </div>
                    </div>
                    <div class = "text-number">
                        <p>Dernières modifications : </p>
                        <div class = "date-box soft-border">
                            <p>${updatedAt}</p>
                        </div>
                    </div>
                    <div>
                        <form action="./recipe_details.php" method = "GET">
                            <input type="hidden" name="id" value="${recipeId}">
                            <input type="hidden" name="name" value="${name}">
                            <button class = "small-button soft-border soft-shadow">Voir détails</button>
                        </form>
                    </div>
                    <hr class = "box-bar">
                </article>
            <?php } ?>
        </section>
    </main>
<?php
        $this->setBuffer(ob_get_clean());
        return $this;
    }
}




