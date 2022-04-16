/*
   Software Engineering - Team Harrison
   GamerLink - user-db.js
*/

function getUser(dbConn, uid) {
    return new Promise((resolve, reject) => {
        dbConn.query(`
            SELECT *
            FROM user U
            WHERE U.uid = ?
        `, [uid],
         (err, user) => {
            if(err){
                reject(err);
            }else{
                resolve(user);
            }
        })
    })
}

function getRecentComments(dbConn, uid) {
    return new Promise((resolve, reject) => {
        dbConn.query(`
            SELECT *
            FROM message
            WHERE uid = ?
            ORDER BY timestamp DESC
            LIMIT 5
        `, [uid],
        (err, comments) => {
            if(err) {
                reject(err)
            }else {
                resolve(comments)
            }
        })
    })
}

function initUser(dbConn, uid, username) {
    return new Promise((resolve, reject) => {
        dbConn.query(`
            INSERT IGNORE INTO user(uid, username)
            VALUES (?, ?)
        `, [uid, username],
        (err, user) => {
            if(err) {
                reject(err)
            } else {
                resolve(user)
            }
        })
    })
}

function addUser(dbConn, uid, discord, steam, facebook, description) {
    return new Promise((resolve, reject) => {
        dbConn.query(`
            INSERT INTO user(uid, discord, steam, facebook, description)
            VALUES (?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
            username = VALUES(username),
            discord = VALUES(discord),
            steam = VALUES(steam),
            facebook = VALUES(facebook),
            description = VALUES(description)
        `, [uid, discord, steam, facebook, description],
        (err, users) => {
            if(err) {
                reject(err)
            } else {
                resolve(users)
            }
        })
    })
}

module.exports = {
    getUser,
    getRecentComments,
    initUser,
    addUser
}