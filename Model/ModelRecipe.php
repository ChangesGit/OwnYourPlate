<?php namespace Model;

use Model\Model;

class ModelRecipe extends Model {
    private ?int $recipe_id;
    private ?int $user_id;
    private ?string $userName;
    private ?string $recipeName;
    private ?string $imgurl;
    private ?string $createdAt;
    private ?string $updatedAt;

    //GETTER AND SETTERS


    //METHODS
    public function findAllRecipes():?array{
        try {
            $db = $this->getDb()->prepare('SELECT r.recipes_id, r.user_id, r.user_name, r.recipe_name, r.imgurl, r.created_at, r.updated_at FROM recipes r');
            $db->execute();
            return $db->fetchAll(PDO::FETCH_ASSOC);
        }catch(ERROR $error) {
            die($error->getMessage());
        }
    }
    public function findAllRecipesLimit(int $limit):?array{
        try {
            $db = $this->getDb()->prepare('SELECT r.recipes_id, r.user_id, r.user_name, r.recipe_name, r.imgurl, r.created_at, r.updated_at FROM recipes r LIMIT ?');
            $db->bindParam(1, $limit, PDO::PARAM_INT);
            $db->execute();
            return $db->fetchAll(PDO::FETCH_ASSOC);
        }catch(ERROR $error) {
            die($error->getMessage());
        }
    }
    public function findRecipeById(int $recipe_id):?array{
        try {
            $db = $this->getDb()->prepare('SELECT r.recipe_id, r.user_id, r.user_name, r.recipe_name, r.imgurl, r.created_at, r.updated_at FROM recipes r WHERE r.recipe_id = ?');
            $db->bindParam(1, $recipe_id, PDO::PARAM_INT);
            $db->execute();
            return $db->fetch(PDO::FETCH_ASSOC);
        }catch(ERROR $error) {
            die($error->getMessage());
        }
    }

    public function recipeCreate(array $recipe):string {
        try {
            $emailStmt = $mysqlClient->prepare('SELECT user_id FROM users WHERE email = ?');
            $emailStmt->execute([$_SESSION['email']]);
            $userId = $emailStmt->fetch()['user_id'];
        }catch(ERROR $error) {
            die($error->getMessage());
        }
    }
}