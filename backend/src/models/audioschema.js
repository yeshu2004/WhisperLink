const mongoose = require("mongoose")


const audioSchema = new mongoose.Schema({
    toUser: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", required: true 
    },
    audiolinkId:{
        type: String,
        required: true,
        unique: true,
        index: true
    },
    linkId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "GeneratedLink",
        required: true,
        index: true
    }  
},{timestamps: true})

module.exports = mongoose.model("Audio", audioSchema)