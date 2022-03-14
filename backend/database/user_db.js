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
