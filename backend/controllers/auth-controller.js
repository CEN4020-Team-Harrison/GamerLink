const { OAuth2Client } = require("google-auth-library")
const sessionStorage = require('sessionstorage-for-nodejs')

const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);

function verifyLoginData(dbConn, userDB) {
  return async (req, res, next) => {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,
    })

    const { name, email, picture } = ticket.getPayload();
    
    sessionStorage.setItem("username", name)
    sessionStorage.setItem("email", email)

    userDB.initUser(dbConn, email, name).then(_ => res.sendStatus(http.StatusCodes.OK)).catch(next)
    res.json({name, email, picture});
  };
}

module.exports = {
    verifyLoginData
}
