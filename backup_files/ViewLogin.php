<?php namespace View;

use View\View;

class ViewLogin{
    private ?string $buffer = "";
    private ?string $message = "";
    


    //METHODS
    public function launchBuffer():self {
        ob_start();
?>

<!--   Si utilisateur/trice est non identifié(e), on affiche le formulaire -->
<?php if (!isset($_SESSION['name'])) : ?>
    <div id = "login-form" class = "soft-border soft-shadow">
        <form action="./submit_login.php" method="POST">
            <label for="email">Email : </label>
            <input type="email" id="email" name="email" placeholder="you@exemple.com">
            <label for="password">Mot de passe : </label>
            <input type="password" id="password" name="password">
            <a href="./sign_up.php">Pas encore de compte ? En créer un.</a>
            <button name = "submitLogin" type="submit" class="small-button soft-border soft-shadow">Connexion</button>
            <p><?= $this->message ?></p>
        </form>
    </div>
    <!-- Si utilisateur/trice bien connectée on affiche un message de succès -->
<?php else : ?>
    <h1>Bonjour <?php echo $_SESSION['name']; ?> et bienvenue sur OwnYourPlate !</h1>
    <a href="./index.php">Retourner à l'accueil</a>
<?php endif; ?>

<?php
        $this->buffer = ob_get_clean();
        return $this;
    }

    public function display():void {
        echo $this->buffer;
    }

}

