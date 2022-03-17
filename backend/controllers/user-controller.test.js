/*
   Software Engineering - Team Harrison
   GamerLink - user-controller.test.js
*/

const userController = require("./user-controller")
const createError = require("http-errors")
const http = require("http-status-codes")

const getUser = jest.fn()
const addUser = jest.fn()

const fakeUserDB = {
   getUser,
   addUser
}

const query = jest.fn()

const dbConn = {
   query
}

describe("getUser()", () => {
   it("throw BAD_REQUEST error if uid is missing", () => {
      const req = { params: {} }
      const res = {}
      const next = jest.fn()
      
      expect(() => userController.getUser(dbConn, fakeUserDB)(req, res, next)).toThrowError(createError(http.StatusCodes.BAD_REQUEST, "invalid uid."))
  })

  it("throw BAD_REQUEST error if uid is undefined", () => {
      const req = { params: { uid: undefined } }
      const res = {}
      const next = jest.fn()

      expect(() => userController.getUser(dbConn, fakeUserDB)(req, res, next)).toThrowError(createError(http.StatusCodes.BAD_REQUEST, "invalid uid."))
  })
})

describe("addUser()", () => {
   it("throw BAD_REQUEST error if username is missing", () => {
      const req = { params: {} }
      const res = {}
      const next = jest.fn()
      
      expect(() => userController.getUser(dbConn, fakeUserDB)(req, res, next)).toThrowError(createError(http.StatusCodes.BAD_REQUEST, "invalid uid."))
  })

  it("throw BAD_REQUEST error if username is undefined", () => {
      const req = { params: { username: undefined } }
      const res = {}
      const next = jest.fn()

      expect(() => userController.getUser(dbConn, fakeUserDB)(req, res, next)).toThrowError(createError(http.StatusCodes.BAD_REQUEST, "invalid uid."))
  })
})