<?php namespace Controller;

use Controller\Controller;
use Model\Model;
use View\View;


class ControllerRecipe extends Controller {
    private ?Model $modelRecipe;

    
    public function __construct(Model $model, ?Model $modelRecipe, View $view)
    {
        $this->modelRecipe = $modelRecipe;
        parent::__construct($model, $view);
    }

    //METHODS
    public function renderHome():void {
        $data = $this->modelRecipe->findAllIngredientsLimit(10);
        $this->getView()->setData($data);
        $this->getView()->displayAll();
    }

    public function renderRecipes():void {
        $data = $this->modelRecipe->findAllRecipesOfUserId($_SESSION[])
    }
}