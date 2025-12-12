// validation/listItemValidation.js

const add = {
  allowedKeys: ["shoppingListId", "name", "quantity", "checked"],
  requiredKeys: ["shoppingListId", "name", "quantity"]
};

const update = {
  allowedKeys: ["shoppingListId", "itemId", "name", "quantity", "checked"],
  requiredKeys: ["shoppingListId", "itemId"]
};

const remove = {
  allowedKeys: ["shoppingListId", "itemId"],
  requiredKeys: ["shoppingListId", "itemId"]
};

module.exports = { add, update, remove };
