/*
   Software Engineering - Team Harrison
   GamerLink - app.js
*/

const path = require("path")
const cors = require("cors")
const router = require("./routes/routes")
const express = require("express")
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const filestore = require("session-file-store")(session)

const app = express()
app.use(cors())
app.use(express.json())
app.options('*', cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "/../frontend/public")))
app.use(function(_, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
 })
app.use(cookieParser())
app.use(session({
   resave: false,
   saveUninitialized: false,
   secret: 'XCR3rsasa%RDHHH',
   cookie: { secure: false, maxAge: 60000 },
   store: new filestore()}))
app.use(router)
app.get('/', (req, res) => {
   req.session.email = "btr"
   req.session.username = "testing"
 })
dotenv.config()

module.exports = app
