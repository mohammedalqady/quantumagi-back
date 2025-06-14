const CartModel = require("../models/cart.model");

exports.getCart = async function (req, res) {
  try {
    const cart = await CartModel.findById(req.user.id);
    res.json({ data: cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createCart = async function (req, res) {
  try {
    const createCart = await CartModel.create(req.body);
    res.json({ data: createCart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
