/*
   Software Engineering - Team Harrison
   GamerLink - game-controller.test.js
*/

const gameController = require("./game-controller")
const createError = require("http-errors")

const getGame = jest.fn()
const getRatedGames = jest.fn()
const getGameMessages = jest.fn()
const addGameRating = jest.fn()
const addGameMessage = jest.fn()

const fakeGameDB = {
    getGame,
    getRatedGames,
    getGameMessages,
    addGameRating,
    addGameMessage
}

const query = jest.fn()

const dbConn = {
    query
}

describe("getGame()", () => {
    it("throw BAD_REQUEST error if gid is missing", () => {
        const req = { params: {} }
        const res = {}
        const next = jest.fn()
        
        expect(gameController.getGame(dbConn, fakeGameDB)(req, res, next)).toThrowError(createError(http.StatusCodes.BAD_REQUEST, "gid not found."))
    })
})

describe("getRatedGames()", () => {

})

describe("getGameMessages()", () => {

})

describe("addGameRating()", () => {

})

describe("addGameMessage()", () => {

})