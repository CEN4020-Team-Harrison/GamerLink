/*
   Software Engineering - Team Harrison
   GamerLink - game-db.js
*/

function getGame(dbConn, gid) {
    return new Promise((resolve, reject) => {
        dbConn.query(`
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

function getRatedGames(dbConn, uid) {
    return new Promise((resolve, reject) => {
        dbConn.query(`
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

function getGameMessages(dbConn, gid) {
    return new Promise((resolve, reject) => {
        dbConn.query(`
            SELECT *
            FROM Message M
            WHERE M.gid = ?
        `, [gid],
        (err, messages) => {
            if(err){
                reject(err);
            }else{
                resolve(messages);
            }
        })
    })
}

function addGameRating(dbConn, gid, uid, score) {
    return new Promise((resolve, reject) => {
        dbConn.query("INSERT Into RatedGame(gid, uid, score) VALUES ?",
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

function addGameMessage(dbConn, gid, uid, message, timestamp) {
    return new Promise((resolve, reject) => {
        dbConn.query("INSERT Into MESSAGE(gid, uid, message, timestamp) VALUES ?",
        [gid, uid, message, timestamp],
        (err, messages) => {
            if(err) {
                reject(err)
            } else {
                resolve(messages)
            }
        })
    })
}

module.exports = {
    getGame,
    getRatedGames,
    getGameMessages,
    addGameRating,
    addGameMessage
}
