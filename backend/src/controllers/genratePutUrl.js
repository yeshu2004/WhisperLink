const putFileURL = require("../aws/s3/uploadFile");
const audioschema = require("../models/audioschema");
const generatedLinks = require("../models/generatedLinks"); // Import the generatedLinks model

const genratePutAudioUrl = async(req,res)=>{
  const owner = req.query.owner
  const ownerId = req.query.ownerId
  const linkId = req.query.linkName
  if (!owner) {
    return res.status(400).json({ message: "Owner is required" });
  }
    try {
    const audioId = `${Date.now()}-${Math.floor(Math.random() * 1000000)}`;
    const key = `uploads/${owner}/${audioId}.mp4`;

    const linkDoc = await generatedLinks.findOne({ linkId: linkId });
    if (!linkDoc) return res.status(404).json({ message: "Link not found" });

    const audioNote = await audioschema({
      toUser: ownerId,
      audiolinkId: audioId,
      linkId: linkDoc._id 
    })

    await audioNote.save()
    
    const url = await putFileURL(key);
    res.json({ url, key });
  } catch (err) {
    console.error("Error generating presigned URL:", err);
    res.status(500).json({ error: "Failed to generate URL" });
  }
}

module.exports = genratePutAudioUrl;