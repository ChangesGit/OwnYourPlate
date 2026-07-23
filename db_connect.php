<?php 
include(__DIR__.'/env.php');

try
{
    $mysqlClient = new PDO (
    'mysql:host='.DB_HOST.';dbname='.DB_NAME.';charset=utf8',
    DB_USERNAME,
    DB_PASSWORD
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