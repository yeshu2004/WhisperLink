const generatedLinks = require("../models/generatedLinks");

const deleteLink = async (req, res) => {
    try {
        const linkId = req.params.id;
        const result = await generatedLinks.deleteOne({ _id: linkId, owner: req.user.userid });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Link not found or not authorized" });
        }
        res.status(200).json({ message: "Link deleted" });
    } catch (error) {
        console.error("Error deleting link:", error);
        res.status(500).json({ message: "Server error deleting link" });
    }
}

module.exports = deleteLink