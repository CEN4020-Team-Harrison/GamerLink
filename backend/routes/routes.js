/*
   Software Engineering - Team Harrison
   GamerLink - routes.js
*/

const path = require("path")
const express = require("express")

const dashboardController = require("../controllers/dashboard-controller")
const gameController = require("../controllers/game-controller")
const profileController = require("../controllers/profile-controller")

const router = express.Router();

router.use("/", (_, _) => {
   res.sendFile(path.join(__dirname + "/../../frontend/public/html/index.html"));
})

module.exports = router