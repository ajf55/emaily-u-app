// import express using syntax that works with node.js
// when app first boots up this is the configuration that needs to load
const express = require("express");
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/user');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(
  cookieSession({
      // convert 30 days to milisecond
      maxAge: 30 * 24 * 60 * 60 * 1000,
      // encrypt the cookie
      keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
// look at underlying environment and see if there is a port declared
// for "|| 5000" it means that if there isn't a dynamically assigned port form cloud application, default 5000 ; eg dev environment
const PORT = process.env.PORT || 5000;
// labeling the port - manual test with http://localhost:5000/
app.listen(PORT);
