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

function addUser(dbConn, userDB) {
   return async (req, res, next) => {
      const email = req.session.email
      const username = req.session.username

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

      userDB.addUser(dbConn, email, username, discord, steam, facebook, description).then(_ => res.sendStatus(http.StatusCodes.OK)).catch(next)
   }
}

module.exports = {
   getUser,
   addUser
}