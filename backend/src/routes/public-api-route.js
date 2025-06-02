const express = require("express");
const sendMgs = require("../controllers/sendMsg");
const linkData = require("../controllers/linkData");
const router = express.Router();

router.get("/link/:linkName", linkData);
router.post("/send-msg/:linkName", sendMgs);

module.exports = router;
