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
         throw createError(http.StatusCodes.BAD_REQUEST, "gid not found.")
      }

      gameDB.getGame(dbConn, gid).then(game => {
         res.setHeader('Content-Type', 'application/json')
         res.json(game)
      }).catch(next)
   }
}

function getRatedGames(dbConn, gameDB) {
   return (req, res, next) => {
      const uid = req.params.gid
      if(!uid) {
         throw createError(http.StatusCodes.BAD_REQUEST, "uid not found.")
      }
   
      gameDB.getRatedGames(dbConn, uid).then(games => {
         res.setHeader('Content-Type', 'application/json')
         res.json(games)
      }).catch(next)
   }
}

function getGameMessages(dbConn, gameDB) {
   return (req, res, next) => {
      const gid = req.params.gid
      if(!gid) {
         throw createError(http.StatusCodes.BAD_REQUEST, "gid not found.")
      }
   
      gameDB.getGameMessages(dbConn, gid).then(messages => {
         res.setHeader('Content-Type', 'application/json')
         res.json(messages)
      }).catch(next)
   }
}

function addGameRating(dbConn, gameDB) {
   return (req, res, next) => {
      const gid = req.params.gid
      if(!gid) {
         throw createError(http.StatusCodes.BAD_REQUEST, "gid not found.")
      }
   
      const uid = req.params.uid
      if(!uid) {
         throw createError(http.StatusCodes.BAD_REQUEST, "uid not found.")
      }
   
      const score = req.params.score
      if(!score) {
         throw createError(http.StatusCodes.BAD_REQUEST, "score not found.")
      }
   
      gameDB.addGameRating(dbConn, gid, uid, score).then(_ => res.send(http.StatusCodes.OK)).catch(next)
   }
}

function addGameMessage(dbConn, gameDB) {
   return (req, res, next) => {
      const gid = req.params.gid
      if(!gid) {
         throw createError(http.StatusCodes.BAD_REQUEST, "gid not found.")
      }
   
      const uid = req.params.uid
      if(!uid) {
         throw createError(http.StatusCodes.BAD_REQUEST, "uid not found.")
      }
   
      const message = req.params.message
      if(!message) {
         throw createError(http.StatusCodes.BAD_REQUEST, "message not found.")
      }
   
      gameDB.addGameMessage(gid, uid, message, Date.now()).then(_ => res.send(http.StatusCodes.OK)).catch(next)
   }
}


module.exports = {
   getGame,
   getRatedGames,
   getGameMessages,
   addGameRating,
   addGameMessage
}