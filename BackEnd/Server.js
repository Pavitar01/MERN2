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
app.use(cors());
app.use(bodyParser.json());


//mongo DB

const db = mongoose
  .connect(process.env.Mongo)
  .then((result) => {
    console.log("Connected To DB", result.connection.host);
  })
  .catch((err) => {
    console.log(err);
  });



app.use('/api/auth',router);
//category
app.use('/api/category',categoryRouter);
//product
app.use('/api/product',productRouter);

app.use("/api/cart-item",CartRouter)
// app.use("/api/order-item/",OrderRouter)
app.use("/api/order",OrderRouter)

//middlewre
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//port from .env
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("Server is listening at port ", port);
});
