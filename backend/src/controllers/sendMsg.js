const generatedLinks = require("../models/generatedLinks");
const messageSchema = require("../models/messageschema");
const { encrypt } = require("../utils/encryption");

const sendMgs = async (req, res) => {
  const fullURL = `http://localhost:5173/${req.params.linkName}`;
  const { message } = req.body;

  try {
    const link = await generatedLinks.findOne({ url_id: req.params.linkName });
    if (!link) return res.status(404).json({ message: "Invalid link" });

    if (!message) return res.status(400).json({ message: "message is empty" });
    const encryptedMsg = encrypt(message);

    const newMsg = new messageSchema({
      toUser: link.owner,
      linkAttached: link._id,
      message: encryptedMsg.content,
      iv: encryptedMsg.iv,
    });

    await newMsg.save();
    res.status(201).json({ message: "Message sent anonymously!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = sendMgs;
