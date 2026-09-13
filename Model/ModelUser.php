<?php namespace Model;

use Model;

class ModelUser extends Model {
    private ?int $user_id;
    private ?string $name;
    private ?string $email;
    private ?string $password;
    private ?int $type_id;

    public function findByEmail(string $email):?array {
        try {
            $db = $this->getDb();
            $stmt = $db->prepare('SELECT u.user_id, u.name, u.email, u.password, ut.type FROM users u INNER JOIN user_types ut ON u.type_id = ut.type_id WHERE u.email = ?');
            $stmt->bindValue(1, $email, PDO::PARAM_STR);
            $stmt->execute();
            return $stmt->fetch(PDO::FETCH_ASSOC);
        } catch(EXCEPTION $error) {
            die($error->getMessage());
        }
    }

    public function addUser():void {
        try{
            $db = $this->getDb();
            $stmt = $db->prepare('INSERT INTO users(`name`, email, `password`, type_id) VALUES(?, ?, ?, ?)');
            $stmt->bindValue(1, $this->name, PDO::PARAM_STR);
            $stmt->bindValue(2, $this->email, PDO::PARAM_STR);
            $stmt->bindValue(3, $this->password, PDO::PARAM_STR);
            $stmt->bindValue(4, $this->type_id, PDO::PARAM_INT);
            $stmt->execute();
        }catch(EXCEPTION $error) {
            die("Error : ". $error->getMessage());
        }
        
    }

}