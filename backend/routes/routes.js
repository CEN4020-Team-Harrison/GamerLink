/*
   Software Engineering - Team Harrison
   GamerLink - routes.js
*/

const path = require("path")
const express = require("express")

const gameController = require("../controllers/game-controller")
const userController = require("../controllers/user-controller")
const igdbController = require("../controllers/igdb-api-controller")
const db = require("../database/db")
const gameDB = require("../database/game-db")
const userDB = require("../database/user-db")

const router = express.Router();

router.get("/game/:gid", gameController.getGame(db.conn, gameDB))
router.get("/rated-games/:uid", gameController.getRatedGames(db.conn, gameDB))
router.get("/avg-game-rating/:gid", gameController.getGameRating(db.conn, gameDB))
router.get("/game-rating/:gid/user/:uid", gameController.getGameRatingByUser(db.conn, gameDB))
router.get("/game-messages/:gid", gameController.getGameMessages(db.conn, gameDB))
router.post("/rate-game/:gid/user/:uid/rating/:rating", gameController.addGameRating(db.conn, gameDB))
router.post("/add-message/:gid/user/:uid", gameController.addGameMessage(db.conn, gameDB))

router.get("/user/:uid", userController.getUser(db.conn, userDB))
router.post("/add-user/:uid", userController.addUser(db.conn, userDB))

router.get("/igdb/getPopularGames", igdbController.getPopularGames);
router.get("/igdb/getGameInfo/:gid", igdbController.getGameInfo);

router.get("/", (_0, _1) => {
   res.sendFile(path.join(__dirname + "/../../frontend/public/index.html"));
})

module.exports = router