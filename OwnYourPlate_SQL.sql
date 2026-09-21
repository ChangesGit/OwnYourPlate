CREATE DATABASE IF NOT EXISTS OwnYourPlate;

USE OwnYourPlate;

CREATE TABLE IF NOT EXISTS user_types(
type_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
`type` VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS users(
user_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
`name` VARCHAR(50),
email VARCHAR(100),
`password` VARCHAR(100),
created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
updated_at DATETIME,
type_id INT
);

CREATE TABLE IF NOT EXISTS products(
product_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
`name` VARCHAR(100),
imgurl VARCHAR(255),
keywords VARCHAR(2000),
kj FLOAT(7,2),
kcal FLOAT(6,2),
proteins FLOAT(5,2),
carbs FLOAT(5,2),
fat FLOAT(5,2),
saturated_fat FLOAT(5,2),
fibers FLOAT(5,2),
salt FLOAT(5,2),
user_id INT
);

CREATE TABLE IF NOT EXISTS recipes(
recipe_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
recipe_name VARCHAR(100),
imgurl VARCHAR(255),
created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
updated_at DATETIME,
user_id INT
);

CREATE TABLE IF NOT EXISTS to_compose(
recipe_id INT,
product_id INT,
PRIMARY KEY (recipe_id, product_id),
quantity FLOAT(8,2)
);

ALTER TABLE recipes
ADD CONSTRAINT fk_to_belong_users
FOREIGN KEY (user_id) REFERENCES users(user_id);

ALTER TABLE products
ADD CONSTRAINT fk_to_customize_users
FOREIGN KEY(user_id) REFERENCES users(user_id);

ALTER TABLE to_compose
ADD CONSTRAINT fk_to_compose_products
FOREIGN KEY (product_id) REFERENCES products(product_id),
ADD CONSTRAINT fk_to_compose_recipes
FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id);

ALTER TABLE users
ADD CONSTRAINT fk_to_define_user_types
FOREIGN KEY (type_id) REFERENCES user_types(type_id);