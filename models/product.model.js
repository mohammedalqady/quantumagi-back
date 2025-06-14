const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    description: { type: String, maxLength: 300 },

    image: String,
    //  [
    //   {
    //     url: {
    //       type: String,
    //       required: true,
    //     },
    //     altText: {
    //       type: String,
    //       default: "Product image",
    //     },
    //   },
    // ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Product category is required"],
      enum: {
        values: ["labtop", "pc", "screen"],
        message: "Invalid category",
      },
    },
    price: { type: Number, required: true, min: 1 },
    discountPrice: {
      type: Number,
      min: 0,
      validate: {
        validator: function (value) {
          return value <= this.price;
        },
        message: "Discount price cannot be higher than the original price",
      },
    },
    subcategory: String,
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
    stock: {
      type: Number,
      // required: [true, "Stock quantity is required"],
      min: [0, "Stock cannot be negative"],
      default: 0,
    },
    ratings: {
      type: Number,
      default: 0,
      min: [0, "Rating cannot be negative"],
      max: [5, "Rating cannot exceed 5"],
    },

    // reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
    // seller: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
