const passport = require("passport");
// import the Google strategy and use the .Strategy param
const GoogleStrategy = require("passport-google-oauth20").Strategy;
// creating the app function for the generic route handlers
const mongoose = require("mongoose");
const keys = require("../config/keys");

// pull a model out of mongoose
const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  // done is a callback (if error, user.id)
  // user.id is the id that was automatically created by mongodb -> oid reference
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
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
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleID: profile.id });

      if (existingUser) {
        // we already have a record with the given profile ID
        return done(null, existingUser);
      }
      // we don't have a user record with this ID
      const user = await new User({
        googleID: profile.id,
        email: profile.emails[0].value,
        name: profile.name.givenName + " " + profile.name.familyName
      }).save();
      done(null, user);
      // .save() takes the record and saves to the DB
    }
  )
);
