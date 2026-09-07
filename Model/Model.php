<?php namespace Model;

use PDO;

class Model {
    private PDO $db;
    
    public function __construct(PDO $db) {
        $this->db = $db;
    }
}