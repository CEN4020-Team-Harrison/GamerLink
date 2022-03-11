/*
   Software Engineering - Team Harrison
   GamerLink - app.js
*/

const path = require("path")
const db = require("./database/db_init")
const express = require("express")

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "/../frontend/public")))

module.exports = app
