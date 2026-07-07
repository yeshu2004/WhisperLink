const generatedLinks = require("../models/generatedLinks");

const linkData =  async (req, res) => {
  try {
    console.log(req.params.linkName);
    const PORT = 8080; // frontend port i.e docker mapping or localhost:5173
    const fullUrl = `http://localhost:${PORT}/${req.params.linkName}`;
    console.log(fullUrl);

    const linkData = await generatedLinks
      .findOne({ linkId: req.params.linkName})
      .populate("owner", "-password");
    console.log(linkData);
    if (!linkData) return res.status(404).json({ message: "Link not found" });

    res.status(200).json(linkData.owner);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = linkData