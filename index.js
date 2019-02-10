// import express using syntax that works with node.js
// when app first boots up this is the configuration that needs to load
const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const keys = require("./config/keys");
require("./models/User");
require("./models/Survey");
require("./services/passport");

mongoose.connect(
  keys.mongoURI,
  { useNewUrlParser: true }
);

const app = express();

// middlewares are wired up to express via app.use before request handlers
app.use(bodyParser.json());

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

// require and call functions
require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);
require("./routes/surveyRoutes")(app);

// route handling for requests that need to go to React App or client index.html catch all
if ((process.env.NODE_ENV = "production")) {
  // express will serve production assets
  app.use(express.static("client/build"));
  // express will servve index.html file if it doesn't recognize the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// look at underlying environment and see if there is a port declared
// for "|| 5000" it means that if there isn't a dynamically assigned port form cloud application, default 5000 ; eg dev environment
const PORT = process.env.PORT || 5000;
// labeling the port - manual test with http://localhost:5000/
app.listen(PORT);
