// import express, {NextFunction, Request, Response } from 'express';
// import helmet from 'helmet';
// import morgan from 'morgan';
// import mongoSanitize from 'express-mongo-sanitize';
// import xss from 'xss-clean';
// import cookieParser from 'cookie-parser';

require("dotenv").config();
const express = require("express");
// const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
// const axios = require('axios');

const userRouter = require("./routers/users.router");
const productRouter = require("./routers/products.router");
const categoryRouter = require("./routers/categories.router");
const brandRouter = require("./routers/brands.router");
const cartRouter = require("./routers/cart.router");
const app = express();
// app.use(bodyParser.json());

app.use(express.json());
app.use(cors());

// app.use(helmet());
// app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
// app.use(express.json({ limit: "10kb" }));
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(mongoSanitize());
// app.use(xss());

const connectDB = async () => {
  try {
    await mongoose.set("strictQuery", false);
    mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("MongoDB Connected", err.message);
    process.exit();
  }
};

connectDB();
/////////////////////////////
// upload
// const upload = multer({ dest: 'uploads/' });
app.post("/api/upload", upload.single("name file"), (req, res) => {
  res.send("uploaded successfuly");
});

/////////////////////////////

app.use("/", userRouter);
app.use("/", productRouter);
app.use("/", categoryRouter);
app.use("/", brandRouter);
app.use("/", cartRouter);
// app.use("/", orderRouter);

app.use(function (req, res) {
  // res.status(404).send({status:404,message:"Not Found"})
  res.status(404).send({ url: req.originalUrl + "Not Found" });
});

////////////////////////////

// const cloudinary = require("cloudinary").v2;

// cloudinary.config({
//   cloud_name: "dk0vigx0w",
//   secure: true,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const url = cloudinary.url("newLogo_netjhz");

// (async function () {
//   const results = await cloudinary.uploader.upload(
//     "./uploads/products/product-e41f48a8-16fb-4107-9645-efccb861288c-1642639151255-cover.jpeg"
//   );
//   // console.log(results);
//   const url = await cloudinary.url(results.public_id);
//   console.log(url);
// })();

/////////////////////////////

const PORT = process.env.PORT || 3300;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
