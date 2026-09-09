<?php namespace Model;

use Model;

class ModelUser extends Model {
    private ?int $user_id;
    private ?string $name;
    private ?string $email;
    private ?string $password;
    private ?int $type_id;

    public function findByEmail(string $email):array | bool {
        try {
            $db = $this->model->getDb();
            $db->prepare('SELECT u.user_id, u.name, u.email, u.password, ut.type FROM users u INNER JOIN user_types ut ON u.type_id = ut.type_id WHERE u.email = ?');
            $db->bindValue(1, $email, PDO::PARAM_STR);
            return $db->execute();
        } catch(ERROR $error) {
            die($error);
        }
    }
}