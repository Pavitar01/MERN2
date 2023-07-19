const { Product } = require("../Models/ProductModel");
const User = require("../Models/UserModels");
const Cart = require("../models/CartModel");

const GetCartItem = async (req, res) => {
  const userId = req.params.id;
  try {
    let cart = await Cart.findOne({ userId });
    if (cart && cart.items.length > 0) {
      res.status(200).send({
        success: true,
        message: "Fetch successfully",
        cart,
      });
    } else {
      res.status(501).send({
        success: false,
        message: "Fetching failed!",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

const UpdateCartItem = async (req, res) => {
  const userId = req.params.id;
  const { productId, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ userId });
    let item = await Product.findOne({ _id: productId });
    if (!item) {
      res.status(404).send("Item not found!");
    }
    const price = item.price;
    const name = item.name;
    const image = [item.image];
    const bill = quantity * price;

    if (cart) {
      // if cart exists for the user
      let itemIndex = cart.items.findIndex((p) => p.productId == productId);

      // Check if product exists or not
      if (itemIndex > -1) {
        let productItem = cart.items[itemIndex];
        productItem.quantity = quantity;
        productItem.bill = bill;
        cart.items[itemIndex] = productItem;
      } else {
        cart.items.push({ productId, name, quantity, price, image, bill });
      }
      calculateCartBill(cart);
      cart = await cart.save();
      return res.status(201).send(cart);
    } else {
      // no cart exists, create one
      const newCart = await Cart.create({
        userId,
        items: [{ productId, name, quantity, price, image, bill }],
        bill: bill,
      });
      return res.status(201).send(newCart);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

const AddCartItem = async (req, res) => {
  const userId = req.params.id;
  const { productId, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ userId });
    let item = await Product.findOne({ _id: productId });
    if (!item) {
      res.status(404).send("Item not found!");
    }

    const user = await User.findOne({ _id: userId });
    const price = item.price;
    const name = item.name;
    const sellerId = item.Addedby;
    const userDetails = {
      name: user?.name,
      address: user?.address,
      email: user?.email,
      phone: user?.phone,
    };
    const image = item.image;
    const bill = quantity * price;

    // Update the order of the product based on quantity
    item.orders += quantity;
    await item.save();

    if (cart) {
      // if cart exists for the user
      let itemIndex = cart.items.findIndex((p) => p.productId == productId);

      // Check if product exists or not
      if (itemIndex > -1) {
        let productItem = cart.items[itemIndex];
        productItem.quantity = quantity;
        productItem.bill = bill;
        cart.items[itemIndex] = productItem;
      } else {
        cart.items.push({
          productId,
          name,
          quantity,
          price,
          sellerId,
          userDetails,
          image,
          bill,
        });
      }
      calculateCartBill(cart);
      cart = await cart.save();
      return res.status(201).send(cart);
    } else {
      // no cart exists, create one
      const newCart = await Cart.create({
        userId,
        items: [
          {
            productId,
            name,
            quantity,
            price,
            sellerId,
            userDetails,
            image,
            bill,
          },
        ],
        bill: bill,
      });
      return res.status(201).send(newCart);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

const calculateCartBill = (cart) => {
  let totalBill = 0;
  for (const item of cart.items) {
    if (!isNaN(item.quantity) && !isNaN(item.price)) {
      item.bill = item.quantity * item.price;
      totalBill += item.bill;
    }
  }

  if (
    !isNaN(cart.bill) &&
    !isNaN(cart.discount) &&
    cart.discount > 0 &&
    cart.discount <= 100
  ) {
    cart.bill -= (cart.bill * cart.discount) / 100;
  }

  cart.bill = totalBill;
};

const DeleteItem = async (req, res) => {
  const userId = req.params.userId;
  const productId = req.params.itemId;

  try {
    let cart = await Cart.findOne({ userId });
    let itemIndex = cart.items.findIndex((p) => p.productId == productId);
    if (itemIndex > -1) {
      let productItem = cart.items[itemIndex];
      cart.bill -= productItem.quantity * productItem.price;
      cart.items.splice(itemIndex, 1);
    }
    cart = await cart.save();
    return res.status(201).send({
      success: true,
      message: "Success",
      cart,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};
const emptyCart = async (req, res) => {
  const userId = req.params.userId;

  try {
    let cart = await Cart.deleteMany({ userId });
    return res.status(201).send({
      success: true,
      message: "Success",
      cart,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

module.exports = {
  AddCartItem,
  GetCartItem,
  DeleteItem,
  UpdateCartItem,
  emptyCart,
};
