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

function addGameMessage(dbConn, gid, uid, username, message, timestamp) {
    return new Promise((resolve, reject) => {
        dbConn.query(`
            INSERT INTO message(gid, uid, username, message, timestamp)
            VALUES (?, ?, ?, ?, ?)
        `, [gid, uid, username, message, timestamp],
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
    getGameMessages,
    addGameMessage
}
