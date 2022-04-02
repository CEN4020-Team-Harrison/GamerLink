/*
   Software Engineering - Team Harrison
   GamerLink - game-controller.js
*/

const createError = require("http-errors")
const http = require("http-status-codes")

function getGame(dbConn, gameDB) {
   return (req, res, next) => {
      const gid = req.params.gid
      if(!gid) {
         throw createError(http.StatusCodes.BAD_REQUEST, "invalid gid.")
      }
      
      gameDB.getGame(dbConn, gid).then(game => {
         res.setHeader("Content-Type", "application/json")
         res.json(game)
      }).catch(next)
   }
}

function getRatedGames(dbConn, gameDB) {
   return (req, res, next) => {
      const uid = req.params.uid
      if(!uid) {
         throw createError(http.StatusCodes.BAD_REQUEST, "invalid uid.")
      }
   
      gameDB.getRatedGames(dbConn, uid).then(games => {
         res.setHeader("Content-Type", "application/json")
         res.json(games)
      }).catch(next)
   }
}

function getGameMessages(dbConn, gameDB) {
   return (req, res, next) => {
      const gid = req.params.gid
      if(!gid) {
         throw createError(http.StatusCodes.BAD_REQUEST, "invalid gid.")
      }
   
      gameDB.getGameMessages(dbConn, gid).then(messages => {
         res.setHeader("Content-Type", "application/json")
         res.json(messages)
      }).catch(next)
   }
}

function addGameRating(dbConn, gameDB) {
   return (req, res, next) => {
      const gid = req.params.gid
      if(!gid) {
         throw createError(http.StatusCodes.BAD_REQUEST, "invalid gid.")
      }
   
      const uid = req.params.uid
      if(!uid) {
         throw createError(http.StatusCodes.BAD_REQUEST, "invalid uid.")
      }
   
      const rating = req.params.rating
      if(!rating) {
         throw createError(http.StatusCodes.BAD_REQUEST, "invalid rating.")
      }
   
      gameDB.addGameRating(dbConn, gid, uid, rating).then(_ => res.sendStatus(http.StatusCodes.OK)).catch(next)
   }
}

function addGameMessage(dbConn, gameDB) {
   return (req, res, next) => {
      const gid = req.params.gid
      if(!gid) {
         throw createError(http.StatusCodes.BAD_REQUEST, "invalid gid.")
      }
   
      const uid = req.params.uid
      if(!uid) {
         throw createError(http.StatusCodes.BAD_REQUEST, "invalid uid.")
      }
   
      const message = req.query.message
      if(!message) {
         throw createError(http.StatusCodes.BAD_REQUEST, "invalid message.")
      }

      // TODO: Find a way to generate unique ids for message
      const mid = 0
   
      gameDB.addGameMessage(dbConn, gid, uid, mid, message, Date.now()).then(_ => res.sendStatus(http.StatusCodes.OK)).catch(next)
   }
}

module.exports = {
   getGame,
   getRatedGames,
   getGameMessages,
   addGameRating,
   addGameMessage
}