<?php namespace Controller;

use Controller\Controller;
use Model\Model;
use View\View;
use Utils\Utils;


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
        if(isset($_SESSION['userId'])) {
            $data = $this->modelRecipe->setUserId($_SESSION['userId'])->findAllRecipesOfUserId();
            $this->getView()->setData($data);
            $this->getView()->displayAll();
        }else {
            Utils::redirectToUrl('/sign_up');
        }

        
    }

    public function searchFunction() {
        $userInput = $_GET['q'] ?? '';

        //TODO : Ajouter la recherche sur les keywords en plus du nom
        $this->modelRecipe->findSearchedInput($userInput);
    }

    public function addRecipe() {
        $rawData = file_get_contents('php://input');
        $jsonDecode = json_decode($rawData, true);
        $products = $jsonDecode[0];
        $recipeName = $jsonDecode[1];
        $this->modelRecipe->addRecipe($products, $recipeName);
    }

}