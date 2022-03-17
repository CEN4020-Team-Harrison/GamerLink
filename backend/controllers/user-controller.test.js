/*
   Software Engineering - Team Harrison
   GamerLink - user-controller.test.js
*/

const userController = require("./user-controller")
const createError = require("http-errors")

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
      
      expect(userController.addUser(dbConn, fakeUserDB)(req, res, next)).toThrowError(createError(http.StatusCodes.BAD_REQUEST, "uid not found."))
  })
})

describe("addUser()", () => {

})