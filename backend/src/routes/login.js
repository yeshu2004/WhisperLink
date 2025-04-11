const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const User = require("../models/userschema"); 

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if ( !username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const loginUser = await User.findOne({ username });
    if (!loginUser) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, loginUser.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    let token = jwt.sign({ userid: loginUser._id }, process.env.JWT_SECRET || "shhhhh", {
        expiresIn: "1h", // Token expires in 1 hour
    });

    console.log("Generated Token:", token);
    res.cookie("token", token, { httpOnly: true, secure: false });
    res.status(201).json({ message: "User logged in successfully",username });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });

  }
});

module.exports = router;