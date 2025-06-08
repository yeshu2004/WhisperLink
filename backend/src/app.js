const express = require("express")
const cors = require("cors")
const app = express();
const cookieParser = require('cookie-parser');

const registerRoute = require('./routes/register.js')
const loginUser = require("./routes/login.js")
const logoutUser = require("./routes/logout.js")
const genrateUrl = require("./routes/genrateurl.js")
const listMsg = require("./routes/listmsg.js")
const listAudio = require("./routes/listaudio.js")
const publicApiRoute = require("./routes/public-api-route.js")

require('./jobs/softDeleteLinks.js')
require('./jobs/hardDeleteLink.js')

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}))

const dbConnection = require("./db/db.js");
const isLoggedIn = require("./middleware/auth.middleware.js");
const User = require("./models/userschema.js");
const generatedLinks = require("./models/generatedLinks.js");
dbConnection()

app.use('/api/auth',registerRoute)
app.use('/api/auth',loginUser)
app.use('/api/url',genrateUrl)
app.use('/api', publicApiRoute)
app.use('/api', listMsg)
app.use('/api', logoutUser)
app.use('/api', listAudio)


app.get('/', isLoggedIn, async(req,res)=>{
    try {
    const loginUser = await User.findById(req.user.userid ).select("-password");
    if (!loginUser) return res.status(404).json({ message: "User not found" });

    const allLinks = await generatedLinks.find({owner: loginUser._id, deleted: false}).sort({generatedLink: -1})
    res.status(200).json({user: loginUser, links: allLinks});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
})

module.exports = app