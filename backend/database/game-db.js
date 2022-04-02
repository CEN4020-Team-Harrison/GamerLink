/*
   Software Engineering - Team Harrison
   GamerLink - game-db.js
*/

function getGame(dbConn, gid) {
    return new Promise((resolve, reject) => {
        dbConn.query(`
            SELECT *
            FROM game G
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
            FROM user U, game G, rated_game RG
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

function getGameRating(dbConn, gid) {
    return new Promise((resolve, reject) => {
        dbConn.query(`
            SELECT AVG(rating) AS game_rating
            FROM rated_game
            WHERE gid = ?
        `, [gid],
        (err, rating) => {
            if(err) {
                reject(err)
            } else {
                resolve(rating)
            }
        })
    })
}

function getGameRatingByUser(dbConn, gid, uid) {
    return new Promise((resolve, reject) => {
        dbConn.query(`
            SELECT rating
            FROM rated_game
            WHERE gid = ? AND uid = ?
        `, [gid, uid],
        (err, rating) => {
            if(err) {
                reject(err)
            } else {
                resolve(rating)
            }
        })
    })
}

function getGameMessages(dbConn, gid) {
    return new Promise((resolve, reject) => {
        dbConn.query(`
            SELECT *
            FROM message M
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

function addGameRating(dbConn, gid, uid, rating) {
    return new Promise((resolve, reject) => {
        dbConn.query(`
            INSERT INTO rated_game(gid, uid, rating)
            VALUES(?, ?, ?)
            ON DUPLICATE KEY UPDATE
            rating = VALUES(rating)
        `, [gid, uid, rating],
        (err, ratedGames) => {
            if(err) {
                reject(err)
            } else {
                resolve(ratedGames)
            }
        })
    })
}

function addGameMessage(dbConn, gid, uid, mid, message, timestamp) {
    return new Promise((resolve, reject) => {
        dbConn.query(`
            INSERT INTO message(gid, uid, mid, message, timestamp)
            VALUES (?, ?, ?, ?, ?)
        `, [gid, uid, mid, message, timestamp],
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
    getGameRating,
    getGameRatingByUser,
    getGameMessages,
    addGameRating,
    addGameMessage
}
