const express = require("express");
const isLoggedIn = require("../middleware/auth.middleware");
const messageSchema = require("../models/messageschema");
const User = require("../models/userschema");
const { decrypt } = require("../utils/encryption");
const router = express.Router();

router.get("/list-msg", isLoggedIn, async (req, res) => {
  try {
    const loginUser = await User.findById(req.user.userid).select("-password");
    if (!loginUser) return res.status(404).json({ message: "User not found" });

    const allMsg = await messageSchema.find({toUser: loginUser._id})

    const decryptedMsgs = allMsg.map(msg=>({
        ...msg._doc,
      message: decrypt({ content: msg.message, iv: msg.iv }),
    }))

    res.json(decryptedMsgs);
  } catch (err) {
    console.error(err);
   res.status(500).json({ message: "Error fetching messages" });
  }
});

module.exports = router;
