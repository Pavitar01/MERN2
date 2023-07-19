const Cart = require("../models/CartModel");
const Order = require("../Models/OrderModel");
const { Product } = require("../Models/ProductModel");

const createOrder = async (req, res) => {
  try {
    const { id, totalBill } = req.body; // Added totalBill parameter

    const cart = await Cart.findOne({ _id: id });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    const { userId, items } = cart;

    const newOrder = new Order({
      userId,
      items,
      bill: totalBill,
    });




    const savedOrder = await newOrder.save();
    await Cart.findByIdAndRemove(id);
    res.status(201).send({
      success: true,
      message: "Order Success",
      savedOrder,
    });
  } catch (err) {
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
    res.status(200).send({ orders, success: true, message: "hello" });
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

    const orders = await Order.find({ "items.sellerId": sellerId });

    // total earnings for orders with status 2
    const totalEarnings = orders.reduce((total, order) => {
      const orderEarnings = order.items.reduce((earnings, item) => {
        if (item.sellerId === sellerId && item.status === 2) {
          return earnings + item.price * item.quantity;
        }
        return earnings;
      }, 0);
      return total + orderEarnings;
    }, 0);

    res.status(200).send({ orders, totalEarnings, success: true });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Internal Server Error", success: false });
  }
};

//
// const getOrderForVendor = async (req, res) => {
//   try {
//     const sellerId = req.params.sellerId;

//     // Find orders by seller ID
//     const orders = await Order.find({ "items.sellerId": sellerId });

//     // Calculate total earnings
//     const totalEarnings = orders.reduce((total, order) => {
//       const orderEarnings = order.items.reduce((earnings, item) => {
//         if (item.sellerId === sellerId) {
//           // Reduce price from earnings when item status is 1 or 3
//           if (item.status === 1 || item.status === 3) {
//             return earnings + (item.price - item.discount) * item.quantity;
//           } else {
//             return earnings + item.price * item.quantity;
//           }
//         }
//         return earnings;
//       }, 0);
//       return total + orderEarnings;
//     }, 0);

//     // Respond with the fetched orders and total earnings
//     res.status(200).send({ orders, totalEarnings, success: true });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send({ error: "Internal Server Error", success: false });
//   }
// };

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

    // If the status is 0, subtract 1 from the order and update the product's order field
    if (status === 2) {
      await Product.findById(item.productId).then((product) => {
        product.quantity -= 1;
        product.save();
      });
    }
  

    if (status === 0) {
      await Product.findById(item.productId).then((product) => {
        product.orders -= 1;
        product.save();
      });
    }

    // Save the updated order
    await order.save();

    return res.json({ message: "Status updated successfully", order });
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
  updateProductStatus,
};
