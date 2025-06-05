const putFileURL = require("../aws/s3/uploadFile");

const genratePutAudioUrl = async(req,res)=>{
    try {
    const key = `uploads/audio-${Date.now()}.mp4`;
    const url = await putFileURL(key);
    res.json({ url, key });
  } catch (err) {
    console.error("Error generating presigned URL:", err);
    res.status(500).json({ error: "Failed to generate URL" });
  }
}

module.exports = genratePutAudioUrl;