<?php namespace Model;

use Model\Model;
use Exception;
use PDO;

class ModelRecipe extends Model {
    private ?int $recipeId;
    private ?int $userId;
    private ?string $userName;
    private ?string $recipeName;
    private ?string $imgurl;
    private ?string $createdAt;
    private ?string $updatedAt;

    //GETTER AND SETTERS
    public function getRecipeId()
    {
        return $this->recipeId;
    }

    public function setRecipeId(int $recipeId):self
    {
        $this->recipeId = $recipeId;
        return $this;
    }

    public function getUserId():int
    {
        return $this->userId;
    }

    public function setUserId(int $userId):self
    {
        $this->userId = $userId;
        return $this;
    }

    public function getRecipeName():string
    {
        return $this->recipeName;
    }

    public function setRecipeName(string $recipeName):self
    {
        $this->recipeName = $recipeName;
        return $this;
    }

    /**
     * Get the value of imgurl
     */ 
    public function getImgurl()
    {
        return $this->imgurl;
    }

    /**
     * Set the value of imgurl
     *
     * @return  self
     */ 
    public function setImgurl($imgurl)
    {
        $this->imgurl = $imgurl;

        return $this;
    }

    /**
     * Get the value of createdAt
     */ 
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * Set the value of createdAt
     *
     * @return  self
     */ 
    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    /**
     * Get the value of updatedAt
     */ 
    public function getUpdatedAt()
    {
        return $this->updatedAt;
    }

    /**
     * Set the value of updatedAt
     *
     * @return  self
     */ 
    public function setUpdatedAt($updatedAt)
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    //METHODS
    public function findAllRecipes():array | bool{
        try {
            $db = $this->getDb()->prepare('SELECT r.recipes_id, r.user_id, r.user_name, r.recipe_name, r.imgurl, r.created_at, r.updated_at FROM recipes r');
            $db->execute();
            return $db->fetchAll(PDO::FETCH_ASSOC);
        }catch(\Throwable $error) {
            die($error->getMessage());
        }
    }
    public function findAllRecipesLimit(int $limit):array | bool{
        try {
            $db = $this->getDb()->prepare('SELECT r.recipes_id, r.user_id, r.user_name, r.recipe_name, r.imgurl, r.created_at, r.updated_at FROM recipes r LIMIT ?');
            $db->bindParam(1, $limit, PDO::PARAM_INT);
            $db->execute();
            return $db->fetchAll(PDO::FETCH_ASSOC);
        }catch(\Throwable $error) {
            die($error->getMessage());
        }
    }
    public function findRecipeById(int $recipeId):array | bool{
        try {
            $db = $this->getDb()->prepare('SELECT r.recipe_id, r.user_id, r.user_name, r.recipe_name, r.imgurl, r.created_at, r.updated_at FROM recipes r WHERE r.recipe_id = ?');
            $db->bindParam(1, $recipeId, PDO::PARAM_INT);
            $db->execute();
            return $db->fetch(PDO::FETCH_ASSOC);
        }catch(\Throwable $error) {
            die($error->getMessage());
        }
    }

    public function addRecipe(array $recipe):void {
        try {
            $emailStmt = $this->getDb()->prepare('SELECT user_id FROM users WHERE email = ?');
            $emailStmt->execute([$_SESSION['email']]);
            $userId = $emailStmt->fetch()['user_id'];
        }catch(\Throwable $error) {
            die($error->getMessage());
        }
    }

    public function findAllIngredientsLimit(int $limit):array | bool{
        try {
            $db = $this->getDb()->prepare('SELECT p.product_id, p.name, p.imgurl, p.keywords, p.kj, p.kcal, p.proteins, p.carbs, p.fat, p.saturated_fat, p.fibers, p.salt FROM products p LIMIT ?');
            $db->bindParam(1, $limit, PDO::PARAM_INT);
            $db->execute();
            return $db->fetchAll(PDO::FETCH_ASSOC);
        }catch(\Throwable $error) {
            die($error->getMessage());
        }
    }

    public function findAllRecipesOfUserId():array | bool {
        try {
            $db = $this->getDb()->prepare('SELECT r.recipe_id, r.user_id, r.user_name, r.recipe_name, r.imgurl, r.created_at, r.updated_at FROM recipes r WHERE r.user_id = ?');
            $db->bindParam(1, $this->userId, PDO::PARAM_INT);
            $db->execute();
            return $db->fetchAll(PDO::FETCH_ASSOC);
        }catch(\Throwable $error) {
            die($error->getMessage());
        }
    }

    
}