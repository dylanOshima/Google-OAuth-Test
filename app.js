const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const GoogleAuth = require('./google-auth');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/login', (req, res, next) => {
  if (!GoogleAuth.loggedIn) {
    // Generate an OAuth URL and redirect there
    const url = GoogleAuth.client.generateAuthUrl({
        access_type: 'offline',
        scope: 'https://www.googleapis.com/auth/gmail.readonly'
    });
    console.log(url);
    res.redirect(url);
  } else {
    res.send('You are logged in!');
  }
});

app.use('/auth/google/callback', (req, res, next) => {
  const code = req.query.code;
  let tempToken;
  if (code) {
      // Get an access token based on our OAuth code
      GoogleAuth.client.getToken(code, (err, tokens) => {
          if (err) {
              console.log('Error authenticating')
              console.log(err);
          } else {
              console.log('Successfully authenticated');
              GoogleAuth.client.setCredentials(tokens);
              tempToken = tokens;
              res.send(`Logged in! ${tempToken}`);
              //res.redirect('/');
          }
      });
  }
});

app.use('/', (req, res, next) => {
  // res.render('index.html');
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle 404
app.use(function(req, res) {
  res.status(404).send('[404: Page not Found]');
});

// Handle 500
app.use(function(error, req, res, next) {
  res.status(500).send(`[500: Internal Server Error] ${error}`);
});

module.exports = app;
