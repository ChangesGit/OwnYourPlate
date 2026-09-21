<?php namespace Model;

use Model\Model;
use Exception;
use PDO;

class ModelUser extends Model {
    private ?int $userId;
    private ?string $name;
    private ?string $email;
    private ?string $password;
    private ?int $typeId = 2;


    //GETTER AND SETTERS
    public function getUserId():string {
        return $this->userId;
    }

    public function setUserId(int $userId):self {
        $this->userId = $userId;
        return $this;
    }

    public function getName():string {
        return $this->name;
    }

    public function setName(string $name):self {
        $this->name = $name;
        return $this;
    }
    public function getEmail():string {
        return $this->name;
    }
    public function setEmail(string $email):self {
        $this->email = $email;
        return $this;
    }
    public function getPassword():string {
        return $this->password;
    }

    public function setPassword(string $password):self {
        $this->password = $password;
        return $this;
    }
    public function getTypeId():int {
        return $this->typeId;
    }

    public function setTypeId(int $typeId):self {
        $this->typeId = $typeId;
        return $this;
    }

    //METHODS
    public function findByEmail():array | bool {
        try {
            $db = $this->getDb();
            $stmt = $db->prepare('SELECT u.user_id, u.name, u.email, u.password, ut.type FROM users u INNER JOIN user_types ut ON u.type_id = ut.type_id WHERE u.email = ?');
            $stmt->bindParam(1, $this->email, PDO::PARAM_STR);
            $stmt->execute();
            return $stmt->fetch(PDO::FETCH_ASSOC);
        } catch(\Throwable $error) {
            die($error->getMessage());
        }
    }

    public function addUser():void {
        try{
            $db = $this->getDb();
            $stmt = $db->prepare('INSERT INTO users(`name`, email, `password`, type_id) VALUES(?, ?, ?, ?)');
            $stmt->bindParam(1, $this->name, PDO::PARAM_STR);
            $stmt->bindParam(2, $this->email, PDO::PARAM_STR);
            $stmt->bindParam(3, $this->password, PDO::PARAM_STR);
            $stmt->bindParam(4, $this->typeId, PDO::PARAM_INT);
            $stmt->execute();
        }catch(\Throwable $error) {
            die("Error : ". $error->getMessage());
        }
        
    }

}