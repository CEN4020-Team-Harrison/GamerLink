/*
   Software Engineering - Team Harrison
   GamerLink - app.js
*/

const path = require("path")
const cors = require("cors")
const router = require("./routes/routes")
const db = require("./database/db")
const express = require("express")

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "/../frontend/public")))
app.use(router)
app.use(cors())

module.exports = app
