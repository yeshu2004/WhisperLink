const { configDotenv } = require('dotenv')
const mongoose = require('mongoose')
configDotenv()

let dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("mongodb connected");
    } catch (error) {
        console.error("mongodb connection error:", error)
    }
}

module.exports = dbConnection;