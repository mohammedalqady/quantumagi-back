const userModel = require("../models/user.model");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async function (req, res) {
  try {
    const checkBeforCreate = await userModel.findOne({ email: req.body.email });
    if (checkBeforCreate) {
      return res
        .status(400)
        .json({ message: "maybe you find problem to register" });
    } else if (!checkBeforCreate) {
      let newUser = new userModel(req.body);
      let hashedPassword = await bcrypt.hash(req.body.password, 12);
      newUser.password = hashedPassword;
      let user = await newUser.save();
      return res.json({
        message: "User created successfully",
        user: { name: user.name, email: user.email },
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error creating user",
      error: error.message,
    });
  }
};

exports.login = async function (req, res) {
  try {
    let user = await userModel.findOne({ email: req.body.email });
    let comparePassword = await user.comparePassword(req.body.password);
    if (!user || !comparePassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    } else {
      let token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        // process.env.SECRET_KEY
        "SECRETKEY"
      );
      console.log(token);
      return res.json({
        messag: "user login successfully",
        user: { name: user.name, email: user.email, jwt: token },
      });
    }
  } catch (error) {
    console.log("exports login function has err: ", error);
    res.status(400).send({
      message: "user login failed",
    });
  }
};

exports.getUsers = async function (req, res) {
  try {
    if (req.user.role === "admin") {
      let users = await userModel.find();
      return res.json({ data: users, message: "users show successfully" });
    } else {
      return res
        .status(403)
        .json({ message: "You are not authorized to show users" });
    }
  } catch (error) {
    console.log("exports getUsers function has err: ", error);
    res.status(400).send({
      message: "failed show users",
    });
  }
};

exports.getUserById = async function (req, res) {
  try {
    if (req.user.role === "admin") {
      let user = await userModel.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.json({ data: user, message: "user show successfully" });
    } else {
      return res
        .status(403)
        .json({ message: "You are not authorized to show user by id" });
    }
  } catch (error) {
    console.log("exports getUserById function has err: ", error);
    res.status(400).send({
      message: "failed show user by id",
    });
  }
};

exports.updateUser = async function (req, res) {
  try {
    if (req.user.role === "admin") {
      let user = await userModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.json({ data: user, message: "user update successfully" });
    }
  } catch (error) {
    console.log("exports updateUser function has err: ", error);
    res.status(400).send({
      message: "failed update user",
    });
  }
};

exports.deleteUser = async function (req, res) {
  try {
    if (req.user.role === "admin") {
      let user = await userModel.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.json({ message: "user delete successfully" });
    } else {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete user" });
    }
  } catch (error) {
    console.log("exports deleteUser function has err: ", error);
    res.status(400).send({
      message: "failed delete user",
    });
  }
};
