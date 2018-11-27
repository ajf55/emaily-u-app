const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const requireLogin = require("../middlewares/requireLogin");

module.exports = app => {
  // route handler to create the stripe charge object
  app.post("/api/stripe", requireLogin, async (req, res) => {
    const charge = await stripe.charges.create({
      amount: 500,
      currency: "usd",
      description: "Emaily - 5 for 5",
      source: req.body.id
    });
    // after a successful charge update credit count
    // req.user will access the user model due to passport.js
    req.user.credits += 5;
    const user = await req.user.save();

    res.send(user);
  });
};
