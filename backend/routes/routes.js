/*
   Software Engineering - Team Harrison
   GamerLink - routes.js
*/

const path = require("path")
const express = require("express")

const dashboardController = require("../controllers/dashboard-controller")
const gameController = require("../controllers/game-controller")
const userController = require("../controllers/user-controller")
const db = require("./db")
const gameDB = require("../database/game-db")
const userDB = require("../database/user-db")

const router = express.Router();
router.get("/game/:gid", gameController.getGame(db.conn, gameDB))
router.get("/game-ratings/:uid", gameController.getRatedGames(db.conn, gameDB))
router.get("/game-messages/:gid", gameController.getGameMessages(db.conn, gameDB))
router.post("/rate-game/:gid/user/:uid/score/:score", gameController.addGameRating(db.conn, gameDB))
router.post("/add-message/:message/game/:gid/user/:uid", gameController.addGameMessage(db.conn, gameDB))

router.get("/user/:uid", userController.getUser(db.conn, userDB))
router.post("/add-user/:username", userController.addUser(db.conn, userDB))

router.get("/", (_, _) => {
   res.sendFile(path.join(__dirname + "/../../frontend/public/html/index.html"));
})

module.exports = router