<?php
    require_once(__DIR__ . '/db_connect.php');
    require_once(__DIR__ . '/variables.php');
    require_once(__DIR__ . '/functions.php');

    $rawData = file_get_contents('php://input');
    $jsonDecode = json_decode($rawData, true);
    $toDelete = $jsonDecode;

    print_r($toDelete);

    if(isset($_SESSION['email'])) {

        $deleteStmt = $mysqlClient->prepare('DELETE FROM to_compose WHERE recipe_id = ? AND product_id = ?');

        $product_id = $toDelete[0];
        $recipe_id = $toDelete[1];

        $deleteStmt->execute([$recipe_id, $product_id]);
        redirectToUrl('./recipe_details.php');
    }