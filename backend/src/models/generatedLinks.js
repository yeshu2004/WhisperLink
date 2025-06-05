// models/generatedLinks.js
const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema({
  owner: { 
   type: mongoose.Schema.Types.ObjectId,
   ref: "User"
 },
  generatedLink: { 
    type: String,
    required: true,
    unique: true,
    index: true
  },
  deleted:{
    type: Boolean,
    default: false,
    index: true
  },
  expireAt: { 
    type: Date,
    index: true 
  },
  hardDeleteAt: { 
    type: Date, 
    index: true
  },

},{timestamps: true});

module.exports = mongoose.model("GeneratedLink", linkSchema);
