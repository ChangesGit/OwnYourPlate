<?php namespace View;

use View\View;

class ViewProfile{
    private ?string $buffer = "";


    //METHODS
    public function launchBuffer():self {
        ob_start();
?>
<div id = "profile-box">
    <a href="./logout.php">Se déconnecter</a>
</div>

<?php
        $this->buffer = ob_get_clean();
        return $this;
    }

    public function display():void {
        echo $this->buffer;
    }

}

