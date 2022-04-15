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
   return async (req, res, next) => {
      const email = req.session.email
   
      gameDB.getRatedGames(dbConn, email).then(games => {
         res.setHeader("Content-Type", "application/json")
         res.json(games)
      }).catch(next)
   }
}

function getGameRating(dbConn, gameDB) {
   return (req, res, next) => {
      const gid = req.params.gid
      if(!gid) {
         throw createError(http.StatusCodes.BAD_REQUEST, "invalid gid.")
      }

      gameDB.getGameRating(dbConn, gid).then(rating => {
         res.setHeader("Content-Type", "application/json")
         res.json(rating)
      }).catch(next)
   }
}

function getGameRatingByUser(dbConn, gameDB) {
   return async (req, res, next) => {
      const email = req.session.email

      const gid = req.params.gid
      if(!gid) {
         throw createError(http.StatusCodes.BAD_REQUEST, "invalid gid.")
      }

      gameDB.getGameRatingByUser(dbConn, gid, email).then(rating => {
         res.setHeader("Content-Type", "application/json")
         res.json(rating)
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
   return async (req, res, next) => {
      const email = req.session.email

      const gid = req.params.gid
      if(!gid) {
         throw createError(http.StatusCodes.BAD_REQUEST, "invalid gid.")
      }
   
      const rating = req.params.rating
      if(!rating) {
         throw createError(http.StatusCodes.BAD_REQUEST, "invalid rating.")
      }
   
      gameDB.addGameRating(dbConn, gid, email, rating).then(_ => res.sendStatus(http.StatusCodes.OK)).catch(next)
   }
}

function addGameMessage(dbConn, gameDB) {
   return async (req, res, next) => {
      console.log(req.session)
      const username = req.session.username
      const email = req.session.email

      console.log(username)
      console.log(email)

      const gid = req.params.gid
      if(!gid) {
         throw createError(http.StatusCodes.BAD_REQUEST, "invalid gid.")
      }
   
      const message = req.query.message
      if(!message) {
         throw createError(http.StatusCodes.BAD_REQUEST, "invalid message.")
      }
   
      gameDB.addGameMessage(dbConn, gid, email, username, message, Date.now()).then(_ => res.sendStatus(http.StatusCodes.OK)).catch(next)
   }
}

module.exports = {
   getGame,
   getRatedGames,
   getGameRating,
   getGameRatingByUser,
   getGameMessages,
   addGameRating,
   addGameMessage
}