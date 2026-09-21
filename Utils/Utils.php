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
        return htmlentities(htmlspecialchars(strip_tags(trim($input))));
    }

    public static function redirectToUrl(string $url):void {
        header("Location: {$url}");
        exit();
    }

    public static function logOut():void {
        session_destroy();
        Utils::redirectToUrl('/');
    }

    public static function escapeHtml(string|int|float|null $data):string {
        return htmlspecialchars((string) $data, ENT_QUOTES, 'UTF-8');
    }

}