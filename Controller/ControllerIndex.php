<?php namespace Controller;

use Controller\Controller;

class ControllerIndex extends Controller {


    //METHODS
    public function render():void {
        $data = $this->getModel()->findAllIngredientsLimit(10);
        $this->getView()->setData($data);
        $this->getView()->displayAll();
    }
}