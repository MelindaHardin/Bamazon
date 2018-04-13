-- create database bamazon;
DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price FLOAT NOT NULL,
    stock_quantity INTEGER(10) NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Chair', 'Seating', 35.00, 300);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Table', 'Tables', 102.00, 200);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Light', 'Lighting', 8.00, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Plate', 'Dining', 12.00, 500);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Wine Glasses', 'Dining', 8.00, 500);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Champagne Glasses', 'Dining', 8.00, 500);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Table Cloth', 'Linens', 10.00, 300);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Napkins', 'Linens', 4.00, 500);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Fork', 'Dining', 6.00, 600);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Spoon', 'Dining', 6.00, 600);
