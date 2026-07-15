<?php require_once(__DIR__ . '/db_connect.php');
    require_once(__DIR__ . '/variables.php');
    require_once(__DIR__ . '/functions.php');

    $userInput = $_GET['q'] ?? '';

    //TODO : Ajouter la recherche sur les keywords en plus du nom
    $stmt = $mysqlClient->prepare('SELECT `name`, imgurl, kj, kcal, proteins, carbs, fat, saturated_fat, fibers, salt FROM products WHERE `name` LIKE ? OR keywords LIKE ? LIMIT 10');
    $stmt->execute(["%".$userInput."%", "%".$userInput."%"]);

    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
