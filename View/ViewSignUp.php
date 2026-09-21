<?php namespace View;

use View\View;

class ViewSignUp extends View {
    private ?string $message = "";


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
        <h1>Créez un compte</h1>
        <section id = "sign-up-form" class = "soft-border soft-radius">
            <form action="/sign_up" method="POST">
                <label for="name">Nom utilisateur : </label>
                <input type="text" id="name" name="name" placeholder="superRoxxor99" required>
                <label for="email">Email : </label>
                <input type="email" id="email" name="email" placeholder="you@exemple.com" required>
                <label for="password">Mot de passe : </label>
                <input type="password" id="password" name="password" placeholder="p@ssw0rd" required>
                <label for="confirm-password">Confirmer votre mot de passe : </label>
                <input type="password" name="confirm-password" id="confirm-password" placeholder="p@ssw0rd" required>
                <button type="submit" name = "submitSignUp" class="small-button soft-border soft-shadow">Envoyer</button>
                <?= $this->message ?>
            </form>
        </section>
    </main>
<?php
        $this->setBuffer(ob_get_clean());
        return $this;
    }
}