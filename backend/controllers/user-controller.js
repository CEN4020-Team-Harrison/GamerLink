/*
   Software Engineering - Team Harrison
   GamerLink - user-controller.js
*/

const createError = require("http-errors")
const http = require("http-status-codes")

function getUser(dbConn, userDB) {
   return (req, res, next) => {
      const uid = req.params.uid
      if(!uid) {
         throw createError(http.StatusCodes.BAD_REQUEST, "invalid uid.")
      }
   
      userDB.getUser(dbConn, uid).then(user => {
         res.setHeader('Content-Type', 'application/json')
         res.json(user)
      }).catch(next)
   }
}

function addUser(dbConn, userDB) {
   return (req, res, next) => {
      const uid = req.params.uid
      if(!uid) {
         throw createError(http.StatusCodes.BAD_REQUEST, "invalid uid.")
      }

      const username = req.query.username
      if(!username) {
         throw createError(http.StatusCodes.BAD_REQUEST, "invalid username.")
      }

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

      userDB.addUser(dbConn, uid, username, discord, steam, facebook, description).then(_ => res.send(http.StatusCodes.OK)).catch(next)
   }
}

module.exports = {
   getUser,
   addUser
}