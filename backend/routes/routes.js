/*
   Software Engineering - Team Harrison
   GamerLink - routes.js
*/

const path = require("path")
const express = require("express")
const gameController = require("../controllers/game-controller")
const profileController = require("../controllers/profile-controller")

const dashboardController = require("../controllers/dashboard-controller")
const gameController = require("../controllers/game-controller")
const profileController = require("../controllers/profile-controller")

const router = express.Router();

router.get("/game", gameController.getGameData)
router.post("/rate-game", gameController.addGameRating)

router.get("/user", profileController.getUserProfile)
router.post("/add-user", profileController.addUser)

router.get("/", (_, _) => {
   res.sendFile(path.join(__dirname + "/../../frontend/public/html/index.html"));
})

module.exports = router