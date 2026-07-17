<?php require_once(__DIR__ . '/db_connect.php');
    require_once(__DIR__ . '/variables.php');
    require_once(__DIR__ . '/functions.php');

    //TODO : Sécuriser le GET

    if(isset($_SESSION['user_id'])) {
        // echo($_SESSION['user_id']);
        // var_dump($_GET);        
        $stmt = $mysqlClient->prepare('SELECT r.recipe_id, r.recipe_name, r.created_at, r.updated_at, tc.product_id, tc.quantity, p.name, p.imgurl, p.kj, p.kcal, p.proteins, p.carbs, p.fat, p.saturated_fat, p.fibers, p.salt
        FROM recipes AS r
        JOIN to_compose AS tc ON r.recipe_id = tc.recipe_id
        JOIN products AS p ON tc.product_id = p.product_id
        WHERE md5(r.user_id) = ? AND r.recipe_id = ?
        ORDER BY r.recipe_id');

        $stmt->execute([$_SESSION['user_id'], $_GET['id']]);
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    }