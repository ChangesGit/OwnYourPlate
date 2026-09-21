<?php require_once('./vendor/autoload.php');

session_start();

use Utils\Utils;
use View\View;
use View\ViewHome;
use View\ViewFooter;
use View\ViewHeader;
use View\ViewRecipes;
use View\ViewSignUp;
use Model\ModelRecipe;
use Model\ModelUser;
use Controller\ControllerUser;
use Controller\ControllerHome;
use Controller\ControllerRecipe;


    // if (session_status() === PHP_SESSION_NONE) {
    //     session_start();
    // };
    // require_once(__DIR__ . '/db_connect.php');
    // require_once(__DIR__ . '/variables.php');
    // require_once(__DIR__ . '/functions.php');



$url = parse_url($_SERVER['REQUEST_URI']);
$path = isset($url['path']) ? $url['path'] : '/';



switch ($path) {
    case '/':
        $view = new ViewHome('test','./styles/style.css');
        $modelUser = new ModelUser(Utils::connect());
        $modelRecipe = new ModelRecipe(Utils::connect());
        $controller = new ControllerHome($modelUser, $modelRecipe, $view);
        $controller->renderHome();
        break;
    case '/recipes':
        $view = new ViewRecipes('Recettes', './styles/style.css');
        $modelUser = new ModelUser(Utils::connect());
        $modelRecipe = new ModelRecipe(Utils::connect());
        $controller = new ControllerRecipe($modelUser, $modelRecipe, $view);
        $controller->renderRecipes();
        break;
    case '/sign_up':
        $view = new ViewSignUp("S'inscrire", './styles/style.css');
        $modelUser = new ModelUser(Utils::connect());
        $controller = new ControllerUser($modelUser, $view);
        $controller->renderSignUp();
        break;
    case '/sign_in':
        
        break;
    case '/log_out':
        $view = new ViewHome('OwnYourPlate', './styles/style.css');
        $modelUser = new ModelUser(Utils::connect());
        $modelRecipe = new ModelRecipe(Utils::connect());
        $controller = new ControllerHome($modelUser, $modelRecipe, $view);
        $controller->logOut();
        
        break;
    default:
        echo "erreur 404";
        break;
}



?>