const express = require("express");
const isLoggedIn = require("../middleware/auth.middleware");
const User = require("../models/userschema");
const generatedLinks = require("../models/generatedLinks");
const router = express.Router();

router.post("/generate", isLoggedIn, async (req,res)=>{
    try {
    const loginUser = await User.findById(req.user.userid ).select("-password");
    if (!loginUser) return res.status(404).json({ message: "User not found" });

    const suffix = Date.now() + '-' + Math.random().toString(36).substr(2, 6);
    const generate_url = `https://localhost:5173/${loginUser.username}${suffix}` 

    const urlExists = await generatedLinks.findOne({generate_url})
    if(urlExists) return res.status(409).json({ message: "URL already exists, try again" })

    const storedURL = await generatedLinks({
        owner: loginUser._id,
        generatedLink: generate_url
    })

    await storedURL.save();

    console.log("Generated URL:", generate_url);
    res.status(201).json({ generate_url });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
})

module.exports = router;