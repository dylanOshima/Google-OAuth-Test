const {OAuth2Client} = require('google-auth-library')
const OAuth2Data = require('./google_key.json');

const CLIENT_ID = OAuth2Data['web']['client_id'];
const CLIENT_SECRET = OAuth2Data['web']['client_secret'];
const REDIRECT_URI = OAuth2Data['web']['redirect_uris'][0]; // gets first redirect URI

/* GOOGLE AUTHENTICATION INITIALIZIATION */
const client = new OAuth2Client(CLIENT_ID,CLIENT_SECRET,REDIRECT_URI);

function verifyAuth() {

}

module.exports = {
  client,
  loggedIn: false,
};