const express = require("express")
const cors = require("cors")
const app = express();

const registerRoute = require('./routes/register.js')
const loginUser = require("./routes/login.js")

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}))

const dbConnection = require("./db/db.js")
dbConnection()

app.use('/api/auth',registerRoute)
app.use('/api/auth',loginUser)

module.exports = app