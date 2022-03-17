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
      const username = req.params.username
      if(!username) {
         throw createError(http.StatusCodes.BAD_REQUEST, "invalid username.")
      }

      const description = req.query.description
      if(!description) {
         throw createError(http.StatusCodes.BAD_REQUEST, "invalid description.")
      }

      userDB.addUser(dbConn, username, description).then(_ => res.send(http.StatusCodes.OK)).catch(next)
   }
}

module.exports = {
   getUser,
   addUser
}