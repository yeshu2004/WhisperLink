const putFileURL = require("../aws/s3/uploadFile");

const genratePutAudioUrl = async(req,res)=>{
  const owner = req.body
  if (!owner) {
    return res.status(400).json({ message: "Owner is required" });
  }
    try {
    const key = `uploads/${owner}/audio-${Date.now()}.mp4`;
    const url = await putFileURL(key);
    res.json({ url, key });
  } catch (err) {
    console.error("Error generating presigned URL:", err);
    res.status(500).json({ error: "Failed to generate URL" });
  }
}

module.exports = genratePutAudioUrl;