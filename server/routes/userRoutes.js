const express = require("express");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleWares");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });

    if (userExists) {
      res.send({
        success: false,
        message: "User Already Exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    const newUser = new User(req.body);
    await newUser.save();

    res.send({
      success: true,
      message: "Mubarak Hoo! Aapka Account Ban Gaya Hai!",
    });
  } catch (error) {
    res.send(error);
  }
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.send({
      message: "User not found!",
      status: 404,
      success: false,
    });
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    res.send({
      message: "Invalid password!",
      status: 400,
      success: false,
    });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.send({
    message: "User logged in successfully!",
    status: 200,
    success: true,
    token: token,
  });
});

router.get("/get-current-user", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.body.userId).select("-password");
    res.send({
      success: true,
      message: "You are authorized to go to the protected route!",
      data: user,
    });
  } catch (error) {
    res.send({
      success: false,
      message: "You are not authorized to go to the protected route!",
      error: error,
    });
  }
});

module.exports = router;
