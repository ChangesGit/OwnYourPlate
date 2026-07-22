<?php require_once(__DIR__ . '/db_connect.php');
    require_once(__DIR__ . '/variables.php');
    require_once(__DIR__ . '/functions.php');

    if(isset($_SESSION['user_id'])) {        
        $stmt = $mysqlClient->prepare("SELECT r.recipe_id, r.recipe_name, DATE(r.created_at) AS created_at, DATE(r.updated_at) AS updated_at, tc.product_id, tc.quantity, p.kj, p.kcal 
        FROM recipes AS r
        JOIN to_compose AS tc ON r.recipe_id = tc.recipe_id
        JOIN products AS p ON tc.product_id = p.product_id
        WHERE md5(r.user_id) = ?
        ORDER BY r.recipe_id");

        $stmt->execute([$_SESSION['user_id']]);
        
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    }