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

    public function findRecipeById(int $recipe_id):array | bool {
        try {
            $db = $this->getDb();
            $db->prepare('SELECT r.recipe_id, r.user_id, r.user_name, r.recipe_name, r.imgurl, r.created_at, r.updated_at FROM recipes r WHERE r.recipe_id = ?');
            $db->bindParam(1, $recipe_id, PDO::PARAM_INT);
            $db->execute();
            return $db->fetch(PDO::FETCH_ASSOC);
        }catch(ERROR $error) {

        }
    }
}