/*
   Software Engineering - Team Harrison
   GamerLink - game-controller.test.js
*/

const gameController = require("./game-controller")
const createError = require("http-errors")
const http = require("http-status-codes")

const getGame = jest.fn()
const getGameMessages = jest.fn()
const addGameMessage = jest.fn()

const fakeGameDB = {
    getGame,
    getGameMessages,
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
        
        expect(() => gameController.getGame(dbConn, fakeGameDB)(req, res, next)).toThrowError(createError(http.StatusCodes.BAD_REQUEST, "invalid gid."))
    })

    it("throw BAD_REQUEST error if gid is undefined", () => {
        const req = { params: { gid: undefined } }
        const res = {}
        const next = jest.fn()

        expect(() => gameController.getGame(dbConn, fakeGameDB)(req, res, next)).toThrowError(createError(http.StatusCodes.BAD_REQUEST, "invalid gid."))
    })

    it("gameDB.getGame() is called when arguments are valid", () => {
        const req = { params: { gid: "0" } }
        const res = {}
        const next = jest.fn()

        gameController.getGame(dbConn, fakeGameDB, getGame)
    })
})

describe("getGameMessages()", () => {
    it("throw BAD_REQUEST error if gid is missing", () => {
        const req = { params: {} }
        const res = {}
        const next = jest.fn()
        
        expect(() => gameController.getGameMessages(dbConn, fakeGameDB)(req, res, next)).toThrowError(createError(http.StatusCodes.BAD_REQUEST, "invalid gid."))
    })

    it("throw BAD_REQUEST error if gid is undefined", () => {
        const req = { params: { gid: undefined } }
        const res = {}
        const next = jest.fn()
        
        expect(() => gameController.getGameMessages(dbConn, fakeGameDB)(req, res, next)).toThrowError(createError(http.StatusCodes.BAD_REQUEST, "invalid gid."))
    })
})

describe("addGameMessage()", () => {
    it("throw BAD_REQUEST error if gid is missing", () => {
        const req = { params: { uid: "0" }, query: { message: "0" } }
        const res = {}
        const next = jest.fn()
        
        expect(() => gameController.addGameMessage(dbConn, fakeGameDB)(req, res, next)).toThrowError(createError(http.StatusCodes.BAD_REQUEST, "invalid gid."))
    })

    it("throw BAD_REQUEST error if gid is undefined", () => {
        const req = { params: { gid: undefined, uid: "0" }, query: { message: "0" } }
        const res = {}
        const next = jest.fn()
        
        expect(() => gameController.addGameMessage(dbConn, fakeGameDB)(req, res, next)).toThrowError(createError(http.StatusCodes.BAD_REQUEST, "invalid gid."))
    })

    it("throw BAD_REQUEST error if uid is missing", () => {
        const req = { params: { gid: "0" }, query: { message: "0" } }
        const res = {}
        const next = jest.fn()
        
        expect(() => gameController.addGameMessage(dbConn, fakeGameDB)(req, res, next)).toThrowError(createError(http.StatusCodes.BAD_REQUEST, "invalid uid."))
    })

    it("throw BAD_REQUEST error if uid is undefined", () => {
        const req = { params: { gid: "0", uid: undefined }, query: { message: "0" } }
        const res = {}
        const next = jest.fn()
        
        expect(() => gameController.addGameMessage(dbConn, fakeGameDB)(req, res, next)).toThrowError(createError(http.StatusCodes.BAD_REQUEST, "invalid uid."))
    })

    it("throw BAD_REQUEST error if message is missing", () => {
        const req = { params: { gid: "0", uid: "0" }, query: {} }
        const res = {}
        const next = jest.fn()
        
        expect(() => gameController.addGameMessage(dbConn, fakeGameDB)(req, res, next)).toThrowError(createError(http.StatusCodes.BAD_REQUEST, "invalid message."))
    })

    it("throw BAD_REQUEST error if message is undefined", () => {
        const req = { params: { gid: "0", uid: "0"}, query: { message: undefined } }
        const res = {}
        const next = jest.fn()
        
        expect(() => gameController.addGameMessage(dbConn, fakeGameDB)(req, res, next)).toThrowError(createError(http.StatusCodes.BAD_REQUEST, "invalid message."))
    })
})