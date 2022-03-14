/*
   Software Engineering - Team Harrison
   GamerLink - game_db.js
*/

const db = require("./db")

function getGames(uid) {
    return new Promise((resolve, reject) => {
        db.conn.query(`
            SELECT *
            FROM User U, Game G, RatedGames RG
            WHERE U.uid = ? AND U.uid = RG.uid AND G.gid = RG.gid
        `, [uid],
        (err, games) => {
            if(err){
                reject(err);
            }else{
                resolve(games);
            }
        })
    })
}