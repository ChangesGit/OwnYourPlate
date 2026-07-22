<?php 
include(__DIR__.'/env.php');

try
{
    $mysqlClient = new PDO (
    'mysql:host='.BDD_HOST.';dbname='.BDD_NAME.';charset=utf8',
    BDD_USERNAME,
    BDD_PASSWORD
);
}
catch (Exception $e)
{
    die('Erreur : ' . $e->getMessage());
}

$fetchProducts = $mysqlClient->prepare('SELECT * FROM products');
$fetchProducts->execute();
$products = $fetchProducts->fetchAll();
?>