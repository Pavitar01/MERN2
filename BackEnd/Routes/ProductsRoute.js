const express = require("express");
const { isSignIn, IsAdmin } = require("../middleware/userMiddleWare");
const {
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
  getVendorById
} = require("../Controllers/ProductController");
const productRouter = express.Router();
const multer = require("multer");
const path = require("path");

productRouter.use(express.static("public"));
//router
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/productImage"), (err, succ) => {
      if (err) {
        console.log(err);
      }
    });
  },
  filename: function (req, file, cb) {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name, (err, succ) => {
      if (err) {
        console.log(err);
      }
    });
  },
});
const upload = multer({ storage: storage });
productRouter.post(
  "/create-product",
  upload.single("photo"),
  upload.single("photo1"),
  upload.single("photo2"),
  upload.single("photo3"),
  createProdutController
); //isSignIn,IsAdmin,
productRouter.get("/get-product", getProductController);
productRouter.get("/get-product/:id", getSingleProduct);
productRouter.get("/product-photo/:pid", productPhotoContoller);
productRouter.post("/delete-product", deleteProductController);
productRouter.get("/all-venders", allVendorController);
productRouter.put("/vender-status", updateVendorController);
productRouter.post("/get-product-vendor", getVendorProductsController);
productRouter.post("/get-product-by-category", getProductByCatController);
productRouter.post("/get-vendor-by-id", getVendorById);
productRouter.put(
  "/update-product/:pid",
  // isSignIn,
  // IsAdmin,
  updateProductController
);

module.exports = { productRouter };
