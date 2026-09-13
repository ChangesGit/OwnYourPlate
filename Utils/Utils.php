<?php
namespace Utils;

use PDO;

class Utils {
    public static function connect():PDO{
        try
            {
                $mysqlClient = new PDO (
                'mysql:host='.DB_HOST.';dbname='.DB_NAME.';charset=utf8',
                DB_USERNAME,
                DB_PASSWORD,
                [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
                return $mysqlClient;
            
            }
            catch (EXCEPTION $error)
            {
                die('Erreur : ' . $error->getMessage());
            }
        
    }

    public static function passwordHash(?string $password):array{
        if(empty($password)){
            return ['message' => "Mot de passe invalide", 'code' => 'invalide'];
        }
        return ['message' => password_hash($password,PASSWORD_DEFAULT), 'code' => 'correct'];
    }

     public static function sanitize(string $data):string{
        return trim($data);
    }

}