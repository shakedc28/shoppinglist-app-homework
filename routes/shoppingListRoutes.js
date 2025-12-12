// routes/shoppingListRoutes.js
const express = require("express");
const router = express.Router();
const controller = require("../controllers/shoppingListController");

// POST endpoints: using request body for dtoIn as per previous homework style
router.post("/shoppingList/create", controller.create);
router.post("/shoppingList/listByUser", controller.listByUser);
router.post("/shoppingList/get", controller.get);
router.post("/shoppingList/delete", controller.remove);

module.exports = router;
