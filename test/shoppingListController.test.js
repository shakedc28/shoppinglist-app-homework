jest.mock("../models/ShoppingList", () => ({
  find: jest.fn()
}));

jest.mock("../utils/dtoValidator", () => ({
  validateDtoIn: jest.fn()
}));

jest.mock("../validation/shoppingListValidation", () => ({
  listByUser: {}
}));

jest.mock("../routes/errors", () => ({
  NotFoundError: class NotFoundError extends Error {}
}));

const ShoppingList = require("../models/ShoppingList");
const shoppingListController = require("../controllers/shoppingListController");

// helper to mock Express response
function createRes() {
  return {
    json: jest.fn()
  };
}

describe("shoppingListController.listByUser", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("happy day", async () => {
    const req = {
      body: { userId: "user-1" }
    };
    const res = createRes();
    const next = jest.fn();

    ShoppingList.find.mockReturnValue({
      lean: jest.fn().mockResolvedValue([
        { id: "1", title: "Groceries" }
      ])
    });

    await shoppingListController.listByUser(req, res, next);

    expect(res.json).toHaveBeenCalledWith({
      shoppingListList: [{ id: "1", title: "Groceries" }],
      uuAppErrorMap: {}
    });
    expect(next).not.toHaveBeenCalled();
  });

  test("invalidDtoIn – validation error", async () => {
    const req = {
      body: {}
    };
    const res = createRes();
    const next = jest.fn();

    const error = new Error("Invalid dtoIn");
    require("../utils/dtoValidator").validateDtoIn.mockImplementation(() => {
      throw error;
    });

    await shoppingListController.listByUser(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });

});
