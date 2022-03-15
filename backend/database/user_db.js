/*
   Software Engineering - Team Harrison
   GamerLink - user_db.js
*/

const db = require("./db")

function getUser(uid) {
    return new Promise((resolve, reject) => {
        db.conn.query(`
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

function addUser(user) {
    return new Promise((resolve, reject) => {
        db.conn.query("INSERT Into User(username, description) VALUES ?",
        [user.name, user.description],
        (err, users) => {
            if(err) {
                reject(err)
            } else {
                resolve(users)
            }
        })
    })
}
