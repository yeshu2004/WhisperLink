const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/userschema"); 
const jwt = require("jsonwebtoken")

router.post("/register", async (req, res) => {
  try {
    const { username, password, email } = req.body;

    if (!username) {
      return res.status(400).json({ error: 'userName is required' });
    }

    if (!username  || !password || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters" });
    }

    const existingUserEmail = await User.findOne({ email });
    if (existingUserEmail) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const existingUsername = await User.findOne({username})
    if(existingUsername){
      return res.status(400).json({ message: "UserName already registered, Look for different User Name." });
    }

    //hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    
    await newUser.save();
    console.log(newUser)
    const token = jwt.sign({ userid: newUser._id }, process.env.JWT_SECRET || 'shhhhh', {
      expiresIn: "7d" // Token expires in 7 days
    });

    res.cookie("token", token, { httpOnly: true });

    res.status(201).json({ message: "User registered successfully"});

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "Server error" });

  }
});

module.exports = router;