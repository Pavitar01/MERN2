const fs = require("fs");
const { Product } = require("../Models/ProductModel");
const User = require("../Models/UserModels");
const createProdutController = async (req, res) => {
  try {
    const {
      name,
      des,
      price,
      quantity,
      category,
      Addedby,
      orders,
      status,
      images,
    } = req.body;

    if (!name) {
      return res.status(422).json({ message: "Name is required" });
    }

    if (!price) {
      return res.status(422).json({ message: "Price is required" });
    }

    if (!des) {
      return res.status(422).json({ message: "Description is required" });
    }

    if (!category) {
      return res.status(422).json({ message: "Category is required" });
    }

    if (!quantity) {
      return res.status(422).json({ message: "Quantity is required" });
    }

    const product = new Product({
      name: name,
      des: des,
      status: status,
      price: price,
      quantity: quantity,
      category: category,
      Addedby: Addedby,
      orders: orders,
    });

    if (images && Array.isArray(images)) {
      product.image = images;
    }

    await product.save();

    res.status(200).send({
      message: "Product created successfully!",
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in creating product",
      error,
    });
  }
};

const getProductController = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).send({
      total: products.length,
      message: "Product fetched successfully !",
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in fetching product",
      error,
    });
  }
};

//get single product
const getSingleProduct = async (req, res) => {
  try {
    const products = await Product.find({ slug: req.params.slug }).select(
      "-photo"
    );
    res.status(200).send({
      total: products.length,
      message: "Product fetched successfully !",
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in fetching single product",
      error,
    });
  }
};
// add photo to id
const productPhotoContoller = async (req, res) => {};
//delete controller
const deleteProductController = async (req, res) => {
  try {
    const products = await Product.deleteOne({ _id: req.body.id });
    res.status(200).send({
      message: "Product deleted successfully!",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in deleting product!",
      error,
    });
  }
};

//update product

const updateProductController = async (req, res) => {
  try {
    const { name, images, des, price, quantity, category } = req.body;

    if (!name) {
      return res.status(422).json({ message: "Name is required" });
    }

    if (!price) {
      return res.status(422).json({ message: "Price is required" });
    }

    if (!des) {
      return res.status(422).json({ message: "description is required" });
    }

    if (!quantity) {
      return res.status(422).json({ message: "Quantity is required" });
    }

    // Find the product by ID
    const product = await Product.findById(req.params.pid);

    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not found", success: false });
    }

    // Update product fields
    product.name = name;
    product.des = des;
    product.price = price;
    product.quantity = quantity;
    product.category = category;
    product.status = req.body.status;

    await product.save();

    res.status(200).send({
      message: "Product updated successfully!",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in updating product",
      error,
    });
  }
};

// all vendors
const allVendorController = async (req, res) => {
  try {
    const user = await User.find({ role: 1 });

    res.status(200).send({
      total: user.length,
      message: "Venders fetched successfully !",
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Fetching vendors",
      error,
    });
  }
};

const updateVendorController = async (req, res) => {
  try {
    await User.findOne({ _id: req.body.id }).then((user) => {
      user.flag = req.body.flag;

      return user.save();
    });
    res.status(200).send({
      message: "Vendor Status updated successfully !",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in updating Status",
      error,
    });
  }
};

const getVendorProductsController = async (req, res) => {
  try {
    const vendor = await Product.find({ Addedby: req.body.id });
    res.status(200).send({
      message: "Vendor products fetched successfully !",
      success: true,
      vendor,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in fetching products",
      error,
    });
  }
};

const getProductByCatController = async (req, res) => {
  try {
    const products = await Product.find({ category: req.body.cat });
    res.status(200).send({
      total: products.length,
      message: "Product fetched successfully !",
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in fetching product",
      error,
    });
  }
};
const getVendorById = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.id });
    res.status(200).send({
      message: "user details fetched successfully !",
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in fetching details",
      error,
    });
  }
};

const stockHandleController = async (req, res) => {
  const { id, value } = req.body;

  try {
    await Product.findOne({ _id: id })
      .then((product) => {
        product.outStock = value;

        return product.save();
      })
      .catch((err) => {
        console.log("Errrrr : ", err);
      });
    res.status(200).send({
      message: "Stocks Status updated successfully !",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in updating Status",
      error,
    });
  }
};

const updatePhotoController = async (req, res) => {
  const product = await Product.findById(req.params.pid);
  const { images } = req.body;
  try {
    if (!product) {
      return res
        .status(404)
        .send({ message: "Product not found", success: false });
    }
    if (images && Array.isArray(images)) {
      product.image = images;
    }
    await product.save();

    res.status(200).send({
      message: "Product updated successfully!",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in updating product",
      error,
    });
  }
};
module.exports = {
  createProdutController,
  getProductController,
  getSingleProduct,
  productPhotoContoller,
  deleteProductController,
  updateProductController,
  allVendorController,
  updateVendorController,
  getVendorProductsController,
  getProductByCatController,
  getVendorById,
  stockHandleController,
  updatePhotoController,
};
