jest.mock("../models/ShoppingList", () => ({
  findById: jest.fn()
}));

jest.mock("../utils/dtoValidator", () => ({
  validateDtoIn: jest.fn()
}));

jest.mock("../validation/shoppingListValidation", () => ({
  get: {}
}));

jest.mock("../routes/errors", () => ({
  NotFoundError: class NotFoundError extends Error {}
}));

const ShoppingList = require("../models/ShoppingList");
const shoppingListController = require("../controllers/shoppingListController");

function createRes() {
  return {
    json: jest.fn()
  };
}

describe("shoppingListController.get", () => {

  test("happy day", async () => {
    const req = {
      body: { shoppingListId: "1" }
    };
    const res = createRes();
    const next = jest.fn();

    ShoppingList.findById.mockReturnValue({
      lean: jest.fn().mockResolvedValue({ id: "1", title: "Groceries" })
    });

    await shoppingListController.get(req, res, next);

    expect(res.json).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });

  test("notFound", async () => {
    const req = {
      body: { shoppingListId: "999" }
    };
    const res = createRes();
    const next = jest.fn();

    ShoppingList.findById.mockReturnValue({
      lean: jest.fn().mockResolvedValue(null)
    });

    await shoppingListController.get(req, res, next);

    expect(next).toHaveBeenCalled();
  });

});
