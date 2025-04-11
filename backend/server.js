const app = require("./src/app")
const { configDotenv } = require("dotenv")
configDotenv()

const PORT = process.env.PORT || 3000

app.listen(PORT ,()=>{
    console.log(`Backend running on PORT:${PORT}`)
})