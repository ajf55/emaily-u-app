const passport = require("passport");
// import the Google strategy and use the .Strategy param
const GoogleStrategy = require("passport-google-oauth20").Strategy;
// creating the app function for the generic route handlers
const mongoose = require('mongoose');
const keys = require("../config/keys");

// pull a model out of mongoose
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  // done is a callback (if error, user.id)
  // user.id is the id that was automatically created by mongodb -> oid reference
  done(null, user.id);
});

passport.deserializeUser ((id, done) => {
  User.findById(id).then(user => {
      done(null, user);
    });
});

// passport.use is a generic register
// new GoogleStrategy creates a new instance Google Strategy

passport.use(
// https://console.developers.google.com
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      // check if user already exists
      // returns a promise
      User.findOne({ googleID: profile.id }).then((existingUser) => {
          if (existingUser) {
            // we already have a record with the given profile ID
            done(null, existingUser);
          } else {
            // we don't have a user record with this ID
            new User ({ googleID: profile.id })
              .save()
              .then(user => done(null, user));
            // .save takes the record and saves to the DB
          }
      });
    }
  )
);

/*  console.log("access token:", accessToken);
  console.log("refresh token:", refreshToken);
  console.log("profile:", profile); */
