const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);

function verifyLoginData() {
  return async (req, res) => {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,
    })

    const { name, email, picture } = ticket.getPayload();
    
    req.session.username = name
    req.session.email = email
    req.session.save()
    console.log(req.session)
    res.status(201);
    res.json({name, email, picture});
  };
}

module.exports = {
    verifyLoginData
}
