CREATE DATABASE ng_products_db;

USE ng_products_db;

CREATE TABLE products(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    description TEXT,
    image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    price int(6),
    typeof char(1)
);

CREATE TABLE register(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email varchar(255),
    password char(16)
);

