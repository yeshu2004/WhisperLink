const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  toUser: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", required: true 
  },
  linkAttached:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "GeneratedLink",
    required: true,
  },
  message: { type: String, required: true },
  iv: {
    type: String,
    required: true
  },
},{timestamps: true});

module.exports = mongoose.model("Message", messageSchema);
