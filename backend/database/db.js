/*
   Software Engineering - Team Harrison
   GamerLink - db.js
*/

const mysql = require("mysql")
const config = require("../config")

const conn = mysql.createConnection({
    user: config.db_user,
    password: config.db_password,
    database: config.db_name,
    host: config.db_host,
    port: config.db_port
})

conn.connect(err => {
    if (err) {
        throw err
    }

    console.log("Succesfully connected to database!")
})

module.exports = { conn }