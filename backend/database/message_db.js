/*
   Software Engineering - Team Harrison
   GamerLink - message_db.js
*/

const db = require("./db")

function getMessages(gid) {
    return new Promise((resolve, reject) => {
        db.conn.query(`
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