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
            
        </section>
    </main>
<?php
        $this->setBuffer(ob_get_clean());
        return $this;
    }
}




