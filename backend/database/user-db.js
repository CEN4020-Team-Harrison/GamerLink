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

function addUser(dbConn, uid, username, discord, steam, facebook, description) {
    return new Promise((resolve, reject) => {
        dbConn.query("INSERT INTO user(uid, username, discord, steam, facebook, description) VALUES ?",
        [uid, username, discord, steam, facebook, description],
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
    addUser
}