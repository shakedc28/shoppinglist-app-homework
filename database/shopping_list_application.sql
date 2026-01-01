-- ===============================
-- Shopping List Application Database
-- ===============================

-- Drop tables if they already exist (safe rerun)
DROP TABLE IF EXISTS ListItem;
DROP TABLE IF EXISTS ShoppingList;
DROP TABLE IF EXISTS Product;
DROP TABLE IF EXISTS User;

-- ===============================
-- TABLES
-- ===============================

CREATE TABLE User (
    userId INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE ShoppingList (
    shoppingListId INT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    createdAt DATE NOT NULL,
    userId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES User(userId)
);

CREATE TABLE Product (
    productId INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50),
    price DECIMAL(10,2) NOT NULL
);

CREATE TABLE ListItem (
    listItemId INT PRIMARY KEY,
    quantity INT NOT NULL,
    shoppingListId INT NOT NULL,
    productId INT NOT NULL,
    FOREIGN KEY (shoppingListId) REFERENCES ShoppingList(shoppingListId),
    FOREIGN KEY (productId) REFERENCES Product(productId)
);

-- ===============================
-- SAMPLE DATA
-- ===============================

INSERT INTO User (userId, name, email) VALUES
(1, 'Alice', 'alice@example.com'),
(2, 'Bob', 'bob@example.com');

INSERT INTO ShoppingList (shoppingListId, title, createdAt, userId) VALUES
(1, 'Weekly Groceries', '2025-01-01', 1),
(2, 'Party Supplies', '2025-01-05', 1),
(3, 'Office Shopping', '2025-01-10', 2);

INSERT INTO Product (productId, name, category, price) VALUES
(1, 'Milk', 'Food', 2.50),
(2, 'Bread', 'Food', 1.80),
(3, 'Apples', 'Food', 3.20),
(4, 'Paper Plates', 'Household', 5.00);

INSERT INTO ListItem (listItemId, quantity, shoppingListId, productId) VALUES
(1, 2, 1, 1),
(2, 1, 1, 2),
(3, 5, 1, 3),
(4, 3, 2, 4),
(5, 10, 3, 2);

-- ===============================
-- QUERIES
-- ===============================

-- 1️⃣ List all shopping lists created by a specific user
SELECT sl.title, sl.createdAt
FROM ShoppingList sl
JOIN User u ON sl.userId = u.userId
WHERE u.name = 'Alice';

-- 2️⃣ Show all products in a shopping list with quantities
SELECT sl.title, p.name AS productName, li.quantity
FROM ListItem li
JOIN ShoppingList sl ON li.shoppingListId = sl.shoppingListId
JOIN Product p ON li.productId = p.productId
WHERE sl.title = 'Weekly Groceries';

-- 3️⃣ Count number of products per shopping list (aggregation)
SELECT sl.title, COUNT(li.productId) AS productCount
FROM ShoppingList sl
LEFT JOIN ListItem li ON sl.shoppingListId = li.shoppingListId
GROUP BY sl.title
ORDER BY productCount DESC;

-- 4️⃣ Find products that appear in more than one shopping list (subquery)
SELECT name
FROM Product
WHERE productId IN (
    SELECT productId
    FROM ListItem
    GROUP BY productId
    HAVING COUNT(DISTINCT shoppingListId) > 1
);
