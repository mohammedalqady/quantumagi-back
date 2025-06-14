const ProductModel = require("../models/product.model");

exports.createNewProduct = async function (req, res) {
  try {
    const createProduct = await ProductModel.create(req.body);
    res.json({ message: "Product created successfully", data: createProduct });
  } catch (error) {
    res.status(500).json({ message: "Error creating product" });
  }
};

exports.getAllProducts = async function (req, res) {
  try {
    const products = await ProductModel.find().populate("category");
    res
      .status(200)
      .json({ message: "Products retrieved successfully", data: products });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving products" });
  }
};

exports.getProdectById = async function (req, res) {
  try {
    const product = await ProductModel.findById(req.params.id).populate(
      "category"
    );
    // if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: "Product retrieved successfully", data: product });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving product" });
  }
};

exports.updateProductById = async function (req, res) {
  try {
    const updateProduct = await ProductModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate("category");
    res.json({ message: "Product updated successfully", data: updateProduct });
  } catch (err) {
    res.status(400).send({
      message: err,
    });
  }
};

exports.deleteProductById = async function (req, res) {
  try {
    let product = await ProductModel.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    } else {
      return res.json({ message: "Product deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting product" });
  }
};
