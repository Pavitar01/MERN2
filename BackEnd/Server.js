const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const { router } = require("./Routes/userRoute");
const bodyParser = require("body-parser");
dotenv.config();
const cors = require("cors");
const { categoryRouter } = require("./Routes/categoryRoute");
const { productRouter } = require("./Routes/ProductsRoute");
const CartRouter = require("./Routes/CartRoutes");
const { createOrder } = require("./Controllers/OrderController");
const OrderRouter = require("./Routes/OrderRoutes");
//multer
app.use(cors());

const multer = require("multer");

const path = require("path");
// const storage = multer.diskStorage({
//   destination: "./uploads/",
//   // Specify the destination folder where uploaded files will be saved
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname); // Set the filename to be unique (using the current timestamp) and preserve the original filename
//   },
// });
// const upload = multer({ storage });

// app.use(express.static(path.join(__dirname, "/uploads")));

// app.post("/uploads", upload.single("image"), (req, res) => {
//   const pic = req.file.filename;
//   res.send(pic);
// });

app.use(bodyParser.json({ limit: "20mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
//mongo DB

const db = mongoose
  .connect(process.env.Mongo)
  .then((result) => {
    console.log("Connected To DB", result.connection.host);
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api/auth", router);
//category
app.use("/api/category", categoryRouter);
//product
app.use("/api/product", productRouter);

app.use("/api/cart-item", CartRouter);
// app.use("/api/order-item/",OrderRouter)
app.use("/api/order", OrderRouter);

//middlewre
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//port from .env
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("Server is listening at port ", port);
});
