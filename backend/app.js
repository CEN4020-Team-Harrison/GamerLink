/*
   Software Engineering - Team Harrison
   GamerLink - app.js
*/

const path = require("path")
const cors = require("cors")
const router = require("./routes/routes")
const express = require("express")

const app = express()
app.use(express.json())
app.use(cors())
app.options('*', cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "/../frontend/public")))
app.use(function(_, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
 });
app.use(router)

module.exports = app
