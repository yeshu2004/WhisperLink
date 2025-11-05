const { configDotenv } = require("dotenv");
const app = require("./src/app")

configDotenv()
const PORT = process.env.PORT || 3000;

app.listen(PORT ,()=>{
    console.log(`Backend running on PORT:${PORT}`)
})