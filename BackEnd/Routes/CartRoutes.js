const { Router } = require("express");
const {
  AddCartItem,
  GetCartItem,
  DeleteItem,
  UpdateCartItem,
  emptyCart,
} = require("../Controllers/CartController");
const CartRouter = Router();

CartRouter.get("/cart/:id", GetCartItem);
CartRouter.post("/cart/:id", AddCartItem);
CartRouter.put("/cart/:id", UpdateCartItem);
CartRouter.delete("/cart/:userId/:itemId", DeleteItem);
CartRouter.delete("/cart/:userId", emptyCart);

module.exports = CartRouter;
