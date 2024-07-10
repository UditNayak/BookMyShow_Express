const express = require("express");
const User = require("../models/userModel");
const bcrypt = require('bcrypt')

const router = express.Router();

router.post("/register", async (req, res) => {
   try {
    const userExist = await User.findOne({ email: req.body.email });
    if(userExist) return res({
      message: "User already exists!",
      status: 400
    });

    const salt = await bcrypt.genSalt(10);
    console.log(salt);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json("User was registered successfully!");
  } catch (error) {
    return res.status(400).json({ error });
  }

});

router.post("/login", async (req, res) => {
  
});


module.exports = router;