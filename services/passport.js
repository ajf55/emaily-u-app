const passport = require("passport");
// import the Google strategy and use the .Strategy param
const GoogleStrategy = require("passport-google-oauth20").Strategy;
// creating the app function for the generic route handlers
const keys = require("../config/keys");

// passport.use is a generic register
// new GoogleStrategy creates a new instance Google Strategy

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("access token:", accessToken);
      console.log("refresh token:", refreshToken);
      console.log("profile:", profile);
    }
  )
);
