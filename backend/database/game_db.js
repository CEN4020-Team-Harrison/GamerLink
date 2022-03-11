/*
   Software Engineering - Team Harrison
   GamerLink - game_db.js
*/

const db = require("./db")

function getGames(uid) {
    return new Promise((resolve, reject) => {
        db.conn.query("", (err, games) => {
            if(err){
                reject(err);
            }else{
                resolve(games);
            }
        })
    })
}