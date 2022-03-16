/*
   Software Engineering - Team Harrison
   GamerLink - profile-controller.js
*/

const userDB = require("../database/user-db")
const createError = require("http-errors")
const http = require("http-status-codes")

function getUser(req, res, next) {
   const uid = req.params.uid
   if(!uid) {
      throw createError(http.StatusCodes.BAD_REQUEST, "uid not found.")
   }

   userDB.getUser(uid).then(user => {
      res.setHeader('Content-Type', 'application/json')
      res.json(user)
   }).catch(next)
}

function addUser(req, res, next) {
   const user = req.params.user
   if(!user) {
      throw createError(http.StatusCodes.BAD_REQUEST, "user not found.")
   }

   const message = req.params.message
   if(!message) {
      throw createError(http.StatusCodes.BAD_REQUEST, "message not found.")
   }

   userDB.addUser(user).then(_ => res.send(http.StatusCodes.OK)).catch(next)
}

module.exports = {
   getUser,
   addUser
}