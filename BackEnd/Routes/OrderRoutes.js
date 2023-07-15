const { Router } = require("express");
const {
  get_orders,
  checkout,
  createOrder,
  getOrderOfUser,
  getOrderForVendor,
  getAllOrder,
  updateProductStatus
} = require("../Controllers/OrderController");
const OrderRouter = Router();
OrderRouter.get("/orders/get-orders", getAllOrder);

OrderRouter.post("/orders", createOrder);
// OrderRouter.get("")
OrderRouter.get("/orders/:userId", getOrderOfUser);
OrderRouter.get("/orders/seller/:sellerId", getOrderForVendor);
OrderRouter.put("/update-status/:orderId/:itemId", updateProductStatus);
module.exports = OrderRouter;
