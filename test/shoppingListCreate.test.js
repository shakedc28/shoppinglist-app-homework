jest.mock("../models/ShoppingList", () => {
  return jest.fn().mockImplementation(() => ({
    save: jest.fn().mockResolvedValue({
      id: "1",
      title: "Groceries",
      userId: "user-1"
    })
  }));
});

jest.mock("../utils/dtoValidator", () => ({
  validateDtoIn: jest.fn()
}));

jest.mock("../validation/shoppingListValidation", () => ({
  create: {}
}));

const shoppingListController = require("../controllers/shoppingListController");

function createRes() {
  return {
    json: jest.fn()
  };
}

describe("shoppingListController.create", () => {

  test("happy day", async () => {
    const req = {
      body: { userId: "user-1", title: "Groceries" }
    };
    const res = createRes();
    const next = jest.fn();

    await shoppingListController.create(req, res, next);

    expect(res.json).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });

  test("invalidDtoIn", async () => {
    const req = { body: {} };
    const res = createRes();
    const next = jest.fn();

    const error = new Error("Invalid dtoIn");
    require("../utils/dtoValidator").validateDtoIn.mockImplementation(() => {
      throw error;
    });

    await shoppingListController.create(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });

});
