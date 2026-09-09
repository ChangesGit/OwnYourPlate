<?php namespace Model;

use Model;

class ModelUser extends Model {
    private ?int $user_id;
    private ?string $name;
    private ?string $email;
    private ?string $password;
    private ?int $type_id;

    public function findByEmail(string $email):array | bool {
        $db = $this->model->getDb();
        $db->prepare('SELECT u.user_id, u.')
    }
}