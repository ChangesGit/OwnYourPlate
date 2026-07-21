<?php 
try
{
    $mysqlClient = new PDO (
    'mysql:host=localhost;dbname=ownyourplate;charset=utf8',
    'root',
    ''
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