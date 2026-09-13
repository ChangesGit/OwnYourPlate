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


$utils = new Utils();
$db = $utils->connect();
$view = new ViewIndex("test", "./styles/style.css");
$model = new ModelRecipe($db);
$controller = new ControllerIndex($model, $view);

$controller->render();
?>