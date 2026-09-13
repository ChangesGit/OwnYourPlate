<?php namespace View;

use View\View;

class ViewIngredient {
    private ?string $buffer = "";
    private ?string $name;
    private ?float $kJ;
    private ?float $kCal;
    private ?float $proteins;
    private ?float $carbs;
    private ?string $imgUrl;
    private ?string $imgAlt;

    public function __construct(?string $name = "", ?float $kJ = 0, ?float $kCal = 0, ?float $proteins = 0, ?float $carbs = 0, ?string $imgUrl = "", ?string $imgAlt = "") {
        $this->name = $name;
        $this->kJ = $kJ;
        $this->kCal = $kCal;
        $this->proteins = $proteins;
        $this->carbs = $carbs;
        $this->imgUrl = $imgUrl;
        $this->imgAlt = $imgAlt;
    }


    public function launchBuffer():self {
        ob_start();
?>
    <article class = "result-product"> <!--Produit-->
                <div class = "name-img-flex">
                    <img src=<?= $this->imgUrl ?> alt=<?= $this->imgAlt ?>>
                    <h3><?= $this->name ?></h3>
                    <div class = "number-buttons-box">
                        <button class = "amount-button minus-button" data-product-name = <?= $this->name ?>>-</button> <!--Signe moins-->
                        <div class = "number-box soft-border">
                            <input class = "grams-count" type = "number" min = "0" value = "100"></input>
                            <span>g</span>
                        </div>
                        <button class = "amount-button plus-button" data-product-name = <?= $this->name ?>>+</button> <!--Signe plus-->
                    </div>
                </div>
                <div class = "result-nutri">
                    <div class = "text-number">
                        <p>Calories : </p>
                        <div class = "number-box soft-border calories-box">
                            <p><?= $this->kJ ?> kJ</p>
                            <p><?= $this->kCal ?> kCal</p>
                        </div>
                    </div>
                    <div class = "text-number mobile-hidden-flex">
                        <p>Protéines : </p>
                        <div class = "number-box soft-border proteins-box">
                            <p><?= $this->proteins ?> g</p>
                        </div>
                    </div>
                    <div class = "text-number mobile-hidden-flex">
                        <p>Glucides : </p>
                        <div class = "number-box soft-border carbs-box">
                            <p><?= $this->carbs ?> g</p>
                        </div>
                    </div>
                </div>
                <div>
                    <p>...</p>
                    <div>
                        <button class = "small-button soft-border soft-shadow" data-product-name = <?= $this->name ?>>Ajouter</button>
                    </div>
                </div>
                <hr class = "box-bar">
        </article>
<?php
        $this->buffer = ob_get_clean();
        return $this;
    }

    public function display():void {
        echo $this->buffer;
    }
}