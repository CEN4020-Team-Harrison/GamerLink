/*
   Software Engineering - Team Harrison
   GamerLink - game-controller.js
*/

const createError = require("http-errors")
const http = require("http-status-codes")
const sessionStorage = require('sessionstorage-for-nodejs')

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

function addGameMessage(dbConn, gameDB) {
   return async (req, res, next) => {
      const username = sessionStorage.getItem("username")
      const email = sessionStorage.getItem("email")

      const gid = req.params.gid
      if(!gid) {
         throw createError(http.StatusCodes.BAD_REQUEST, "invalid gid.")
      }
   
      const message = req.query.message
      if(!message) {
         throw createError(http.StatusCodes.BAD_REQUEST, "invalid message.")
      }

      gameDB.addGameMessage(dbConn, gid, email, username, message, Date.now() / 1000).then(_ => res.sendStatus(http.StatusCodes.OK)).catch(next)
   }
}

module.exports = {
   getGame,
   getGameMessages,
   addGameMessage
}