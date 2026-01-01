jest.mock("../models/ShoppingList", () => ({
  findByIdAndDelete: jest.fn()
}));

jest.mock("../utils/dtoValidator", () => ({
  validateDtoIn: jest.fn()
}));

jest.mock("../validation/shoppingListValidation", () => ({
  remove: {}
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

describe("shoppingListController.remove", () => {

  test("happy day", async () => {
    const req = {
      body: { shoppingListId: "1" }
    };
    const res = createRes();
    const next = jest.fn();

    ShoppingList.findByIdAndDelete.mockResolvedValue({ id: "1" });

    await shoppingListController.remove(req, res, next);

    expect(res.json).toHaveBeenCalledWith({
      deleted: true,
      shoppingListId: "1",
      uuAppErrorMap: {}
    });
    expect(next).not.toHaveBeenCalled();
  });

  test("notFound", async () => {
    const req = {
      body: { shoppingListId: "999" }
    };
    const res = createRes();
    const next = jest.fn();

    ShoppingList.findByIdAndDelete.mockResolvedValue(null);

    await shoppingListController.remove(req, res, next);

    expect(next).toHaveBeenCalled();
  });

});
