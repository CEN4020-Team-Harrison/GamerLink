/*
   Software Engineering - Team Harrison
   GamerLink - db.js
*/

const mysql = require("mysql")
const config = require("./config")

function initDB() {
    const dbConnection = mysql.createConnection({
        host: config.db_host,
        user: config.db_user,
        password: config.db_password,
        database: config.db_name
    })
    
    dbConnection.connect(err => {
        if (err) {
            throw err
        }
    
        console.log("Succesfully connected to database!")
    })
}

module.exports = { initDB }