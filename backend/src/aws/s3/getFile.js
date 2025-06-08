const { GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { default: client } = require("../awsClient"); 

const { configDotenv } = require("dotenv");
configDotenv()

async function getFile(key) {
    if (!process.env.BUCKET_NAME) throw new Error("BUCKET_NAME is not defined in .env")
    try {
        const command = new GetObjectCommand({
                Bucket: process.env.BUCKET_NAME,
                Key: key,
        })
        const url = await getSignedUrl(client, command, {expiresIn: 3600})
        return url;
    } catch (error) {
        console.error("Error getting signed URL:", error);
        throw error;
    }
}

module.exports = getFile;