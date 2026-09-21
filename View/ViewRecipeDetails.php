<?php namespace View;

use View\View;

class ViewRecipeDetails extends View {



    //METHODS
    public function launchBuffer():self {
        ob_start();
?>
    <main>
        <h1>Mes recettes</h1>
        <?php echo '<h2>'.$_GET['name'].'</h2>'; ?>
        <hr>
        <section id = "recipe-box" class ="soft-shadow soft-border content-box"> <!--Toutes mes recettes-->
            <button id = "cancel-recipe-details" class="large-button soft-shadow soft-border">Annuler modifications</button>
            <dialog id = "cancel-confirmation-modal">
                <p>Êtes-vous sûr de vouloir annuler les modifications ?</p>
                <button id = "cancel-confirmation-button">Je confirme</button>
            </dialog>
            <button id = "save-recipe-details" class="large-button soft-shadow soft-border">Enregistrer modifications</button>
            <dialog id = "save-confirmation-modal">
                <p>Êtes-vous sûr de vouloir enregistrer les modifications ?</p>
                <button id = "save-confirmation-button">Je confirme</button>
            </dialog>
        </section>
    </main>
<?php
        $this->setBuffer(ob_get_clean());
        return $this;
    }
}