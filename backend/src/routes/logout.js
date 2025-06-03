const express = require("express");
const isLoggedIn = require("../middleware/auth.middleware");
const router = express.Router(); 

router.post("/logout", isLoggedIn, async (req, res) => {
  try {
    res.clearCookie("token");
    res.send("Logged out successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });

  }
});

module.exports = router;