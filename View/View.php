<?php namespace View;

class View{
    private ?array $data;
    private ViewFooter $viewFooter;
    private ViewHeader $viewHeader;
    private ?string $buffer = '';


    public function __construct(?string $title = "", ?string $link ="") {
        $this->viewFooter = new ViewFooter();
        $this->viewHeader = new ViewHeader($title, $link);
    }

    //METHODS
    public function display():void {
        echo $this->buffer;
    }

    public function displayAll():void {
        $this->viewHeader->launchBuffer()->display();
        $this->display();
        $this->viewFooter->launchBuffer()->display();
    }
}