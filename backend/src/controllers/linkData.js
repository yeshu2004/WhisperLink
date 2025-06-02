const generatedLinks = require("../models/generatedLinks");

const linkData =  async (req, res) => {
  try {
    console.log(req.params.linkName);
    const fullUrl = `http://localhost:5173/${req.params.linkName}`;
    console.log(fullUrl);

    const linkData = await generatedLinks
      .findOne({ generatedLink: fullUrl })
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