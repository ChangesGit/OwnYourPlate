<?php
    require_once(__DIR__ . '/db_connect.php');
    require_once(__DIR__ . '/variables.php');
    require_once(__DIR__ . '/functions.php');

    $rawData = file_get_contents('php://input');
    $jsonDecode = json_decode($rawData, true);
    $products = $jsonDecode[0];
    $recipeName = $jsonDecode[1];

    print_r($products);
    echo $recipeName;

    if(isset($_SESSION['email'])) {
        $emailStmt = $mysqlClient->prepare('SELECT user_id FROM users WHERE email = ?');
        $emailStmt->execute([$_SESSION['email']]);
        $userId = $emailStmt->fetch()['user_id'];
        
        $recipeStmt = $mysqlClient->prepare('INSERT INTO recipes(user_id, `user_name`, `recipe_name`) VALUES(?, ?, ?)');
        $recipeStmt->execute([$userId, $_SESSION['name'], $recipeName]);

        $recipeId = $mysqlClient->lastInsertId();

        $productInsertStmt = $mysqlClient->prepare('INSERT INTO to_compose(recipe_id, product_id, recipe_name, product_name, quantity) VALUES (?, ?, ?, ?, ?)');

        foreach($products as $product) {
            $productInsertStmt->execute([$recipeId, $product['product_id'], $recipeName, $product['name'], $product['grams']]);
        }
    }