<?php
    require_once(__DIR__ . '/db_connect.php');
    require_once(__DIR__ . '/variables.php');
    require_once(__DIR__ . '/functions.php');

    $rawData = file_get_contents('php://input');
    $jsonDecode = json_decode($rawData, true);
    $recipeIngredients = $jsonDecode;

    print_r($recipeIngredients);

    if(isset($_SESSION['email'])) {


        $updateStmt = $mysqlClient->prepare('UPDATE to_compose SET quantity = ? WHERE recipe_id = ? and product_id = ?');
        $deleteStmt = $mysqlClient->prepare('DELETE FROM to_compose WHERE recipe_id = ? AND product_id = ?');

        foreach($recipeIngredients as $ingredient) {
            if($ingredient['quantity']!==0) {
                $updateStmt->execute([$ingredient['quantity'], $ingredient['recipe_id'], $ingredient['product_id']]);
            }
            elseif($ingredient['quantity'] === 0) {
                $deleteStmt->execute([$ingredient['recipe_id'], $ingredient['product_id']]);
            }
        }
    }