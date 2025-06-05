const express = require("express");
const sendMgs = require("../controllers/sendMsg");
const linkData = require("../controllers/linkData");
const genratePutAudioUrl = require("../controllers/genratePutUrl");
const router = express.Router();

router.get("/link/:linkName", linkData);
router.post("/send-msg/:linkName", sendMgs);
router.get("/audio/generate-upload-url", genratePutAudioUrl)

module.exports = router;
