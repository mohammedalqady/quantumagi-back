const BrandModel = require("../models/brand.model");

exports.createNewBrand = async function (req, res) {
  try {
    if (req.user.role === "admin") {
      const checkBeforCreate = await BrandModel.findOne({
        name: req.body.name,
      });
      if (checkBeforCreate) {
        return res.status(400).json({ message: "Brand name is already exist" });
      } else {
        const createBrand = await BrandModel.create(req.body);
        res.status(200).json({
          message: "Brand created successfully",
          data: createBrand,
        });
      }
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error creating Brand", data: err });
  }
};

exports.getAllBrands = async function (req, res) {
  try {
    if (req.user.role === "admin") {
      const brands = await BrandModel.find();
      res.status(200).json({
        data: brands,
        message: "brands retrieved successfully",
      });
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error retrieving brands", data: err });
  }
};

exports.getOneBrand = async function (req, res) {
  try {
    if (req.user.role === "admin") {
      const brand = await BrandModel.findById(req.params.id);
      res.status(200).json({
        data: brand,
        message: "brand retrieved successfully",
      });
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error retrieving brands", data: err });
  }
};

exports.updateOneBrand = async function (req, res) {
  try {
    if (req.user.role === "admin") {
      const updatedBrand = await BrandModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );
      res.status(200).json({
        data: updatedBrand,
        message: "brand updated successfully",
      });
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error updating brand", data: err });
  }
};

exports.deleteOneBrand = async function (req, res) {
  try {
    if (req.user.role === "admin") {
      await BrandModel.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "brand deleted successfully" });
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error deleting brand", data: err });
  }
};
