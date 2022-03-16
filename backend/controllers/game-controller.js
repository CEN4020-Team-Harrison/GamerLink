/*
   Software Engineering - Team Harrison
   GamerLink - game-controller.js
*/

const gameDB = require("../database/game_db")
const messageDB = require("../database/message_db")
const createError = require("http-errors")
const http = require("http-status-codes")

function getGameData(req, res, next) {
   const gid = req.query.gid

   if(!gid) {
      throw createError(http.StatusCodes.BAD_REQUEST, "gid not found.")
   }

   gameDB.getGame(gid).then(game => {
      res.setHeader('Content-Type', 'application/json')
      res.json(game)
   }).catch(next)
}

function getRatedGames(req, res, next) {
   const uid = req.query.gid

   if(!uid) {
      throw createError(http.StatusCodes.BAD_REQUEST, "uid not found.")
   }

   gameDB.getRatedGames(uid).then(games => {
      res.setHeader('Content-Type', 'application/json')
      res.json(games)
   }).catch(next)
}

function getGameMessages(req, res, next) {
   const gid = req.query.gid

   if(!gid) {
      throw createError(http.StatusCodes.BAD_REQUEST, "gid not found.")
   }

   messageDB.getMessages(gid).then(messages => {
      res.setHeader('Content-Type', 'application/json')
      res.json(messages)
   }).catch(next)
}

function addGameRating(req, res, next) {
   const gid = req.query.gid
   if(!gid) {
      throw createError(http.StatusCodes.BAD_REQUEST, "gid not found.")
   }

   const uid = req.query.uid
   if(!uid) {
      throw createError(http.StatusCodes.BAD_REQUEST, "uid not found.")
   }

   const score = req.query.score
   if(!score) {
      throw createError(http.StatusCodes.BAD_REQUEST, "score not found.")
   }

   gameDB.addGameRating(gid, uid, score).then(_ => res.send(http.StatusCodes.OK)).catch(next)
}

function addGameMessage(req, res, next) {
   const gid = req.query.gid
   if(!gid) {
      throw createError(http.StatusCodes.BAD_REQUEST, "gid not found.")
   }

   const uid = req.query.uid
   if(!uid) {
      throw createError(http.StatusCodes.BAD_REQUEST, "uid not found.")
   }

   const message = req.query.message
   if(!message) {
      throw createError(http.StatusCodes.BAD_REQUEST, "message not found.")
   }

   messageDB.addMessage(gid, uid, message, Date.now())
}

module.exports = {
   getGameData,
   getRatedGames,
   getGameMessages,
   addGameRating,
   addGameMessage
}