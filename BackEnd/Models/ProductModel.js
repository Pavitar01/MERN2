const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      // required: true,
    },
    des: {
      type: String,
      // required: true,
    },
    price: {
      type: String,
      // required: true,
    },
    //we need to get category from the category model
    //we needto link category
    category: {
      type: String,
      // required: true,
    },
    quantity: {
      type: Number,
      // required: true,
    },
    
    orders: {
      type: Number,
      default: 0,
    },
    image: {
      type: [String]
    },
    Addedby: {
      type: String,
      default:"Admin"
    },
    status:{
      type : Number ,
      default : 0
    }
  },
  { timestamps: true }
);
const Product = mongoose.model("Product", productSchema);
module.exports = { Product };
