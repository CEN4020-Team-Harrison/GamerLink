/*
   Software Engineering - Team Harrison
   GamerLink - user-db.js
*/

function getUser(dbConn, uid) {
    return new Promise((resolve, reject) => {
        dbConn.query(`
            SELECT *
            FROM User U
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

function addUser(dbConn, username, description) {
    return new Promise((resolve, reject) => {
        dbConn.query("INSERT Into User(username, description) VALUES ?",
        [username, description],
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