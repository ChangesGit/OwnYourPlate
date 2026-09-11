<?php require_once('./vendor/autoload.php');

session_start();

use View\View;
use View\ViewFooter;
use View\ViewHeader;
use Model\ModelRecipe;
use Model\ModelUser;
use Controller\ControllerUser;


    // if (session_status() === PHP_SESSION_NONE) {
    //     session_start();
    // };
    // require_once(__DIR__ . '/db_connect.php');
    // require_once(__DIR__ . '/variables.php');
    // require_once(__DIR__ . '/functions.php');


$view = new View("test", "./styles/style.css");
$view->displayAll();
?>