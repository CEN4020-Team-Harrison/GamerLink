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

function addMessage(gid, uid, message, timestamp) {
    return new Promise((resolve, reject) => {
        db.conn.query("INSERT Into MESSAGE(gid, uid, message, timestamp) VALUES ?",
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
    getMessages,
    addMessage
}