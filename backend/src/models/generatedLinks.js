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
    unique: true 
},
},{timestamps: true});

module.exports = mongoose.model("GeneratedLink", linkSchema);
