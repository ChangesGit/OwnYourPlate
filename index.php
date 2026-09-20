<?php require_once('./vendor/autoload.php');

session_start();

use Utils\Utils;
use View\View;
use View\ViewIndex;
use View\ViewFooter;
use View\ViewHeader;
use Model\ModelRecipe;
use Model\ModelUser;
use Controller\ControllerUser;
use Controller\ControllerIndex;


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
        $view = new ViewIndex('test','./styles/style.css');
        $model = new ModelRecipe(Utils::connect());
        $controller = new ControllerIndex($model, $view);
        $controller->render();
        break;
        
    default:
        echo "erreur 404";
        break;
}


$db = Utils::connect();
$view = new ViewIndex("test", "./styles/style.css");
$model = new ModelRecipe($db);
$controller = new ControllerIndex($model, $view);

$controller->render();
?>