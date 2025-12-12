// validation/shoppingListValidation.js
// Define allowed/required keys for shoppingList endpoints

const create = {
  allowedKeys: ["userId","title"],
  requiredKeys: ["userId","title"]
};

const listByUser = {
  allowedKeys: ["userId"],
  requiredKeys: ["userId"]
};

const get = {
  allowedKeys: ["shoppingListId"],
  requiredKeys: ["shoppingListId"]
};

const remove = {
  allowedKeys: ["shoppingListId"],
  requiredKeys: ["shoppingListId"]
};

module.exports = { create, listByUser, get, remove };
