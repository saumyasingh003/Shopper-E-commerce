const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const dotenv = require("dotenv").config();

const mongoose = require("mongoose");
const userAuthRoutes = require("./routes/authRoutes");
const adminAuthRoutes = require("./routes/admin/authRoutes");
const categoryRoutes = require("./routes/admin/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes")
const adminOrderRoutes = require("./routes/admin/orderRoutes")
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

mongoose
  .connect(`${process.env.MONGODB_URL}`)
  .then(() => {
    console.log("Database Connected!");
  })
  .catch((error) => {
    console.log("Error while connecting to databse!", error);
  });
app.use(express.json());
app.use("/public" ,express.static(path.join(__dirname,"/uploads")));
app.use("/", userAuthRoutes);
app.use("/", adminAuthRoutes);
app.use("/", categoryRoutes);
app.use("/", productRoutes);
app.use("/", cartRoutes);
app.use("/", orderRoutes)
app.use("/", adminOrderRoutes)
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server is running on Port ${port}`));
