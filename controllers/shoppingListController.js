// controllers/shoppingListController.js
const ShoppingList = require("../models/ShoppingList");
const { validateDtoIn } = require("../utils/dtoValidator");
const shoppingListValidation = require("../validation/shoppingListValidation");
const { NotFoundError } = require("../routes/errors");

async function create(req, res, next) {
  try {
    const dtoIn = req.body;
    validateDtoIn(dtoIn, shoppingListValidation.create);

    const newList = new ShoppingList({
      userId: dtoIn.userId,
      title: dtoIn.title
    });

    const saved = await newList.save();
    res.json({
      shoppingList: saved,
      uuAppErrorMap: {}
    });
  } catch (e) {
    next(e);
  }
}

async function listByUser(req, res, next) {
  try {
    const dtoIn = req.body;
    validateDtoIn(dtoIn, shoppingListValidation.listByUser);

    const lists = await ShoppingList.find({ userId: dtoIn.userId }).lean();
    res.json({ shoppingListList: lists, uuAppErrorMap: {} });
  } catch (e) {
    next(e);
  }
}

async function get(req, res, next) {
  try {
    const dtoIn = req.body;
    validateDtoIn(dtoIn, shoppingListValidation.get);

    const list = await ShoppingList.findById(dtoIn.shoppingListId).lean();
    if (!list) throw new NotFoundError("Shopping list not found.", {});

    res.json({ shoppingList: list, uuAppErrorMap: {} });
  } catch (e) {
    next(e);
  }
}

async function remove(req, res, next) {
  try {
    const dtoIn = req.body;
    validateDtoIn(dtoIn, shoppingListValidation.remove);

    const deleted = await ShoppingList.findByIdAndDelete(dtoIn.shoppingListId);
    if (!deleted) throw new NotFoundError("Shopping list not found.", {});
    res.json({ deleted: true, shoppingListId: dtoIn.shoppingListId, uuAppErrorMap: {} });
  } catch (e) {
    next(e);
  }
}

module.exports = { create, listByUser, get, remove };
