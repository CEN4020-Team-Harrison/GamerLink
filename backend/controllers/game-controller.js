/*
   Software Engineering - Team Harrison
   GamerLink - game-controller.js
*/

const gameDB = require("../database/game-db")
const messageDB = require("../database/message-db")
const createError = require("http-errors")
const http = require("http-status-codes")

function getGame(req, res, next) {
   const gid = req.params.gid
   if(!gid) {
      throw createError(http.StatusCodes.BAD_REQUEST, "gid not found.")
   }

   gameDB.getGame(gid).then(game => {
      res.setHeader('Content-Type', 'application/json')
      res.json(game)
   }).catch(next)
}

function getRatedGames(req, res, next) {
   const uid = req.params.gid
   if(!uid) {
      throw createError(http.StatusCodes.BAD_REQUEST, "uid not found.")
   }

   gameDB.getRatedGames(uid).then(games => {
      res.setHeader('Content-Type', 'application/json')
      res.json(games)
   }).catch(next)
}

function getGameMessages(req, res, next) {
   const gid = req.params.gid
   if(!gid) {
      throw createError(http.StatusCodes.BAD_REQUEST, "gid not found.")
   }

   messageDB.getMessages(gid).then(messages => {
      res.setHeader('Content-Type', 'application/json')
      res.json(messages)
   }).catch(next)
}

function addGameRating(req, res, next) {
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

   gameDB.addGameRating(gid, uid, score).then(_ => res.send(http.StatusCodes.OK)).catch(next)
}

function addGameMessage(req, res, next) {
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

   messageDB.addMessage(gid, uid, message, Date.now()).then(_ => res.send(http.StatusCodes.OK)).catch(next)
}

module.exports = {
   getGame,
   getRatedGames,
   getGameMessages,
   addGameRating,
   addGameMessage
}