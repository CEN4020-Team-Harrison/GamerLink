/*
   Software Engineering - Team Harrison
   GamerLink - db.js
*/

const mysql = require("mysql")

function initDB() {
    const dbConnection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: "gamerlink"
    })
    
    dbConnection.connect(err => {
        if (err) {
            throw err
        }
    
        console.log("Succesfully connected to database!")
    })
}

module.exports = { initDB }