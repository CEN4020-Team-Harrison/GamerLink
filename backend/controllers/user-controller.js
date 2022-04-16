/*
   Software Engineering - Team Harrison
   GamerLink - user-controller.js
*/

const createError = require("http-errors")
const http = require("http-status-codes")

function getUser(dbConn, userDB) {
   return async (req, res, next) => {
      const email = req.session.email

      userDB.getUser(dbConn, email).then(user => {
         res.setHeader("Content-Type", "application/json")
         res.json(user)
      }).catch(next)
   }
}

function getOtherUser(dbConn, userDB) {
   return async (req, res, next) => {
      const uid = req.params.uid
      if(!uid) {
         throw createError(http.StatusCodes.BAD_REQUEST, "invalid uid.")
      }

      userDB.getUser(dbConn, uid).then(user => {
         res.setHeader("Content-Type", "application/json")
         res.json(user)
      }).catch(next)
   }
}

function getRecentComments(dbConn, userDB) {
   return async (req, res, next) => {
      const uid = req.params.uid
      if(!uid) {
         throw createError(http.StatusCodes.BAD_REQUEST, "invalid uid.")
      }

      userDB.getRecentComments(dbConn, uid).then(comments => {
         res.setHeader("Content-Type", "application/json")
         res.json(comments)
      }).catch(next)
   }
}

function addUser(dbConn, userDB) {
   return async (req, res, next) => {
      const email = req.session.email

      const discord = req.query.discord
      if(!discord) {
         throw createError(http.StatusCodes.BAD_REQUEST, "invalid discord link.")
      }

      const steam = req.query.steam
      if(!steam) {
         throw createError(http.StatusCodes.BAD_REQUEST, "invalid steam link.")
      }

      const facebook = req.query.facebook
      if(!facebook) {
         throw createError(http.StatusCodes.BAD_REQUEST, "invalid facebook link.")
      }

      const description = req.query.description
      if(!description) {
         throw createError(http.StatusCodes.BAD_REQUEST, "invalid description.")
      }

      userDB.addUser(dbConn, email, discord, steam, facebook, description).then(_ => res.sendStatus(http.StatusCodes.OK)).catch(next)
   }
}

module.exports = {
   getUser,
   getOtherUser,
   getRecentComments,
   addUser
}