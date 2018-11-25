const passport = require("passport");

module.exports = app => {
  // adding a routehandler
  // reference express app object | get type http request
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/surveys");
    }
  );

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};

// creating the route handlers - REMOVED
/* app.get('/', (req, res)=> {
  res.send({ hi: 'there test 2' });
});*/
