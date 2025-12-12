// controllers/listItemController.js

const ShoppingList = require("../models/ShoppingList");
const { validateDtoIn } = require("../utils/dtoValidator");
const listItemValidation = require("../validation/listItemValidation");
const { NotFoundError } = require("../utils/errors");
const mongoose = require("mongoose");

// ---------------------------------------------------------
// ADD ITEM TO SHOPPING LIST
// ---------------------------------------------------------
async function add(req, res, next) {
  try {
    const dtoIn = req.body;

    // Validate DTO
    validateDtoIn(dtoIn, listItemValidation.add);

    // Ensure list exists
    const list = await ShoppingList.findById(dtoIn.shoppingListId);
    if (!list) throw new NotFoundError("Shopping list not found.");

    // Create new item
    const item = {
      _id: new mongoose.Types.ObjectId(),
      name: dtoIn.name,
      quantity: dtoIn.quantity,
      checked: dtoIn.checked ?? false
    };

    // Add to array
    list.items.push(item);

    // Save
    await list.save();

    res.json({
      shoppingList: list,
      uuAppErrorMap: {}
    });
  } catch (err) {
    next(err);
  }
}

// ---------------------------------------------------------
// UPDATE ITEM IN A SHOPPING LIST
// ---------------------------------------------------------
async function update(req, res, next) {
  try {
    const dtoIn = req.body;

    // Validate DTO
    validateDtoIn(dtoIn, listItemValidation.update);

    // Ensure list exists
    const list = await ShoppingList.findById(dtoIn.shoppingListId);
    if (!list) throw new NotFoundError("Shopping list not found.");

    // Find item
    const item = list.items.id(dtoIn.itemId);
    if (!item) throw new NotFoundError("Item not found.");

    // Apply updates
    if (dtoIn.name !== undefined) item.name = dtoIn.name;
    if (dtoIn.quantity !== undefined) item.quantity = dtoIn.quantity;
    if (dtoIn.checked !== undefined) item.checked = dtoIn.checked;

    // Save
    await list.save();

    res.json({
      shoppingList: list,
      uuAppErrorMap: {}
    });
  } catch (err) {
    next(err);
  }
}

// ---------------------------------------------------------
// DELETE ITEM FROM SHOPPING LIST
// ---------------------------------------------------------
async function remove(req, res, next) {
  try {
    const dtoIn = req.body;

    // Validate DTO
    validateDtoIn(dtoIn, listItemValidation.remove);

    // Ensure list exists
    const list = await ShoppingList.findById(dtoIn.shoppingListId);
    if (!list) throw new NotFoundError("Shopping list not found.");

    // Find item
    const item = list.items.id(dtoIn.itemId);
    if (!item) throw new NotFoundError("Item not found.");

    // Remove item
    item.remove();

    // Save
    await list.save();

    res.json({
      deleted: true,
      shoppingListId: dtoIn.shoppingListId,
      itemId: dtoIn.itemId,
      uuAppErrorMap: {}
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { add, update, remove };
