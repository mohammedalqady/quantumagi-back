const CategoryModel = require("../models/category.model");

exports.createNewCategory = async function (req, res) {
  try {
    if (req.user.role === "admin") {
      const checkBeforCreate = await CategoryModel.findOne({
        name: req.body.name,
      });
      if (checkBeforCreate) {
        return res
          .status(400)
          .json({ message: "Category name is already exist" });
      } else {
        const createCategory = await CategoryModel.create(req.body);
        res.status(200).json({
          message: "Category created successfully",
          data: createCategory,
        });
      }
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error creating category", data: err });
  }
};

exports.getAllCategories = async function (req, res) {
  try {
    if (req.user.role === "admin") {
      const categories = await CategoryModel.find();
      res.status(200).json({
        message: "Categories retrieved successfully",
        data: categories,
      });
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error retrieving categories", data: err });
  }
};

exports.getOneCategory = async function (req, res) {
  try {
    if (req.user.role === "admin") {
      const category = await CategoryModel.findById(req.params.id);
      res.json({
        data: category,
        message: "Category retrieved successfully",
      });
    } else {
      res
        .status(400)
        .json({ message: "you dont have permission to access this resource" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error retrieving category", data: err });
  }
};

exports.getCatAndUpdate = async function (req, res) {
  try {
    if (req.user.role === "admin") {
      const updateCategory = await CategoryModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.json({
        data: updateCategory,
        message: "updateCategory successfully",
      });
    } else {
      res
        .status(400)
        .json({ message: "you dont have permission to access this resource" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error retrieving category", data: err });
  }
};

exports.deleteCategory = async function (req, res) {
  try {
    if (req.user.role === "admin") {
      await CategoryModel.findByIdAndDelete(req.params.id);
      res.json({ message: "Category deleted successfully" });
    } else {
      res
        .status(400)
        .json({ message: "you dont have permission to access this resource" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error deleting category", data: err });
  }
};
