/*
   Software Engineering - Team Harrison
   GamerLink - game_db.js
*/

const db = require("./db")

function getGames(uid) {
    return new Promise((resolve, reject) => {
        db.conn.query(`
            SELECT *
            FROM User U, Game G, RatedGame RG
            WHERE U.uid = ? AND U.uid = RG.uid AND G.gid = RG.gid
        `, [uid],
        (err, games) => {
            if(err){
                reject(err);
            }else{
                resolve(games);
            }
        })
    })
}

function addGameRating(gameRating) {
    return new Promise((resolve, reject) => {
        db.conn.query("INSERT Into RatedGame(gid, uid, score) VALUES ?",
        [gameRating.gid, gameRating.uid, gameRating.score],
        (err, ratedGames) => {
            if(err) {
                reject(err)
            } else {
                resolve(ratedGames)
            }
        })
    })
}
