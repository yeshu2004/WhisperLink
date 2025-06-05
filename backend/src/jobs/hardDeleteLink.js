const cron = require("node-cron")
const generatedLinks = require("../models/generatedLinks")

cron.schedule("0 0 * * *", async()=>{
    try {
        const now = new Date()
        const result = await generatedLinks.deleteMany({
            deleted: true,
            hardDeleteAt: { $lte: now },
        })
        console.log(`Hard-deleted ${result.deletedCount} links`);
    } catch (error) {
        console.error('Error in hard delete job:', error);
    }
},{
    scheduled: true,
    timezone: 'Asia/Kolkata',
})