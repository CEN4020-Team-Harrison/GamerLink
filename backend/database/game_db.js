/*
   Software Engineering - Team Harrison
   GamerLink - game_db.js
*/

const db = require("./db")

function getGame(gid) {
    return new Promise((resolve, reject) => {
        db.conn.query(`
            SELECT *
            FROM Game G
            WHERE G.gid = ?
        `,
        [gid],
        (err, games) => {
            if(err) {
                reject(err)
            } else {
                resolve(games)
            }
        })
    })
}

function getRatedGames(uid) {
    return new Promise((resolve, reject) => {
        db.conn.query(`
            SELECT *
            FROM User U, Game G, RatedGame RG
            WHERE U.uid = ? AND U.uid = RG.uid AND G.gid = RG.gid
        `, [uid],
        (err, games) => {
            if(err){
                reject(err)
            }else{
                resolve(games)
            }
        })
    })
}

function addGameRating(gid, uid, score) {
    return new Promise((resolve, reject) => {
        db.conn.query("INSERT Into RatedGame(gid, uid, score) VALUES ?",
        [gid, uid, score],
        (err, ratedGames) => {
            if(err) {
                reject(err)
            } else {
                resolve(ratedGames)
            }
        })
    })
}

module.exports = {
    getGame,
    getRatedGames,
    addGameRating
}
