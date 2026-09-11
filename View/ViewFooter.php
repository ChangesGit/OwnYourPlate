<?php namespace View;

use View\View;

class ViewFooter{
    private ?string $buffer = "";


    //METHODS
    public function launchBuffer():self {
        ob_start();
?>
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
<?php
        $this->buffer = ob_get_clean();
        return $this;
    }

}