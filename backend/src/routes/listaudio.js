const express = require("express");
const isLoggedIn = require("../middleware/auth.middleware");
const getFile = require("../aws/s3/getFile");
const router = express.Router();

router.get("/audio/allWispers", isLoggedIn, async (req, res) => {
  try {
    const loginUser = await User.findById(req.user.userid).select("-password");
    if (!loginUser) return res.status(404).json({ message: "User not found" });

    const audioNotes = await audioschema.find({ toUser: loginUser._id }).sort({ createdAt: -1 });

    const audioNotesWithUrls = await Promise.all(
      audioNotes.map(async (note) => {
        const key = `uploads/${note.toUser}/${note.audiolinkId}.mp4`;
        const url = getFile(key);
        return {
          id: note._id,
          url,
          createdAt: note.createdAt,
          linkId: note.linkId,
        };
      })
    );

    res.json(audioNotesWithUrls);
  } catch (err) {
    console.error("Error fetching audio notes:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
