/*
   Software Engineering - Team Harrison
   GamerLink - server.js
*/

const app = require("./app")
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

const argv = yargs(hideBin(process.argv)).option('port', {
    alias: 'p',
    describe: 'port to bind on',
    default: 3500
}).argv

const port = argv.port

app.listen(process.env.PORT || port, () => {
    console.log("Server listening on port ", port)
})