const Cart = require("../models/CartModel");
const Order = require("../Models/OrderModel");
const { Product } = require("../Models/ProductModel");

const createOrder = async (req, res) => {
  try {
    const cartId = req.body.id;
    const cart = await Cart.findOne({ _id: cartId });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    const { userId, items, bill } = cart;

    
    const newOrder = new Order({
      userId,
      items,
      bill,
    });

    // Save the new order to the database
    const savedOrder = await newOrder.save();

    // Remove the cart or mark it as completed, depending on your application logic
    // For example:
    await Cart.findByIdAndRemove(cartId);

    // Respond with the created order
    res.status(201).send({
      success: true,
      message: "Order Success",
      savedOrder,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      succes: false,
      message: "Internal Server Error",
    });
  }
};

const getAllOrder = async (req, res) => {
  try {
    // Find all orders
    const orders = await Order.find();

    // Respond with the fetched orders
    res.status(200).send({ orders, success: true ,message:"hello"});
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const getOrderOfUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find orders by user ID
    const orders = await Order.find({ userId });
    // Respond with the fetched orders
    res.status(200).send({
      orders,
      success: true,
      message: "success",
    });
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const getOrderForVendor = async (req, res) => {
  try {
    const sellerId = req.params.sellerId;

    // Find orders by seller ID
    const orders = await Order.find({ "items.sellerId": sellerId });

    // Respond with the fetched orders
    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateProductStatus = async (req, res) => {
  try {
    const { orderId, itemId } = req.params;
    const { status } = req.body;

    // Find the order by ID
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Find the item within the order
    const item = order.items.find((item) => item._id.toString() === itemId);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Update the item's status
    item.status = status;

    // Save the updated order
    await order.save();

    return res.json({ message: "Status updated successfully",order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createOrder,
  getOrderOfUser,
  getOrderForVendor,
  getAllOrder,
  updateProductStatus
};
