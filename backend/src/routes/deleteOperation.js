const express = require("express");
const deleteLink = require("../controllers/deleteLink");
const isLoggedIn = require("../middleware/auth.middleware");
const router = express.Router();

router.delete("/links/:id", isLoggedIn, deleteLink);

module.exports = router;
