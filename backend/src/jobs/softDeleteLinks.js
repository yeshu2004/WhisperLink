const cron = require("node-cron");
const generatedLinks = require("../models/generatedLinks");

cron.schedule(
  "0 * * * *",
  async () => {
    try {
      const now = new Date();
      const result = await generatedLinks.updateMany(
        { expireAt: { $lte: now }, deleted: false },
        { $set: { deleted: true } }
      );
      console.log(`Soft-deleted ${result.modifiedCount} links`);
    } catch (error) {
      console.error("Error in soft delete job:", error);
    }
  },
  {
    scheduled: true,
    timezone: "Asia/Kolkata",
  }
);
