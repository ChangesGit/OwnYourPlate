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
    public function getImgurl()
    {
        return $this->imgurl;
    }

    public function setImgurl($imgurl)
    {
        $this->imgurl = $imgurl;

        return $this;
    }
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUpdatedAt()
    {
        return $this->updatedAt;
    }

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

    public function addRecipe(array $products, string $recipeName):void {
        try {
            if(isset($_SESSION['userId'])) {
                $userId = $_SESSION['userId'];
                $recipeStmt = $this->getDb()->prepare('INSERT INTO recipes(user_id, `user_name`, `recipe_name`) VALUES(?, ?, ?)');
                $recipeStmt->execute([$userId, $_SESSION['name'], $recipeName]);

                $recipeId = $this->getDb()->lastInsertId();

                $productInsertStmt = $this->getDb()->prepare('INSERT INTO to_compose(recipe_id, product_id, recipe_name, product_name, quantity) VALUES (?, ?, ?, ?, ?)');

                foreach($products as $product) {
                    $productInsertStmt->execute([$recipeId, $product['product_id'], $recipeName, $product['name'], $product['grams']]);
                    }
            }
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
            $db = $this->getDb()->prepare(
                'SELECT
                    r.recipe_id,
                    r.recipe_name,
                    r.imgurl,
                    r.created_at,
                    r.updated_at,

                    COUNT(tc.product_id) AS ingredient_count,
                    COALESCE(SUM(tc.quantity), 0) AS total_grams,

                    COALESCE(SUM(p.kj * tc.quantity / 100), 0) AS total_kj,
                    COALESCE(SUM(p.kcal * tc.quantity / 100), 0) AS total_kcal,
                    COALESCE(SUM(p.proteins * tc.quantity / 100), 0) AS total_proteins,
                    COALESCE(SUM(p.carbs * tc.quantity / 100), 0) AS total_carbs,
                    COALESCE(SUM(p.fat * tc.quantity / 100), 0) AS total_fat,
                    COALESCE(SUM(p.saturated_fat * tc.quantity / 100), 0) AS total_saturated_fat,
                    COALESCE(SUM(p.fibers * tc.quantity / 100), 0) AS total_fibers,
                    COALESCE(SUM(p.salt * tc.quantity / 100), 0) AS total_salt

                FROM recipes r

                LEFT JOIN to_compose tc
                    ON tc.recipe_id = r.recipe_id

                LEFT JOIN products p
                    ON p.product_id = tc.product_id

                WHERE r.user_id = ?

                GROUP BY
                    r.recipe_id,
                    r.recipe_name,
                    r.imgurl,
                    r.created_at,
                    r.updated_at

                ORDER BY r.updated_at DESC'
            );

            $db->bindValue(1, $this->userId, PDO::PARAM_INT);
            $db->execute();
            return $db->fetchAll(PDO::FETCH_ASSOC);
        }catch(\Throwable $error) {
            die($error->getMessage());
        }
    }
    // public function findAllRecipesOfUserId():array | bool {
    //     try {
    //         $db = $this->getDb()->prepare('SELECT r.recipe_id, r.user_id, r.user_name, r.recipe_name, r.imgurl, r.created_at, r.updated_at FROM recipes r WHERE r.user_id = ?');
    //         $db->bindParam(1, $this->userId, PDO::PARAM_INT);
    //         $db->execute();
    //         return $db->fetchAll(PDO::FETCH_ASSOC);
    //     }catch(\Throwable $error) {
    //         die($error->getMessage());
    //     }
    // }


    public function findSearchedInput(string $userInput): void {
        $stmt = $this->getDb()->prepare('SELECT product_id, `name`, imgurl, kj, kcal, proteins, carbs, fat, saturated_fat, fibers, salt FROM products WHERE `name` LIKE ? OR keywords LIKE ? LIMIT 10');
        $stmt->execute([$userInput."%", $userInput."%"]);

        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    }
}