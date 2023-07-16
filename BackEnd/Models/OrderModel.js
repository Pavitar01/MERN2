const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  items: [
    {
      productId: {
        type: String,
      },
      name: String,
      userDetails: {
        name: String,
        email: String,
        address: String,
        phone: String,
      },
      sellerId: {
        type: String,
      },
      status: {
        type: Number,
        default: 1,
      },

      orders: {
        type: Number,
        default: 0,
      },
      quantity: {
        type: Number,
        required: true,
        min: [1, "Quantity can not be less then 1."],
        default: 1,
      },
      price: Number,
    },
  ],

  bill: {
    type: Number,
    required: true,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
