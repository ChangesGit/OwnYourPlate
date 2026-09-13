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

    public function getBuffer():string {
        return $this->buffer;
    }

    public function setBuffer(?string $buffer):self {
        $this->buffer = $buffer;
        return $this;
    }

    public function getData():array {
        return $this->data;
    }

    public function setData(array $data):self {
        $this->data = $data;
        return $this;
    }
    //METHODS
    public function display():void {
        echo $this->buffer;
    }

    public function displayAll():void {
        $this->viewHeader->launchBuffer()->display();
        $this->launchBuffer()->display();
        $this->viewFooter->launchBuffer()->display();
    }
}