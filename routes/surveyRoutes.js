const _ = require("lodash");
const Path = require("path-parser").default;
// url is a default node.js library
const { URL } = require("url");
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

const Survey = mongoose.model("surveys");

// survey route handler
module.exports = app => {
  app.get("/api/surveys", requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }).select({
      recipients: false
    });
    res.send(surveys);
  });

  app.get("/api/surveys/:surveyId/:choice", (req, res) => {
    res.send("Thanks for your feedback!");
  });

  app.post("/api/surveys/webhooks", (req, res) => {
    const p = Path.createPath("/api/surveys/:surveyId/:choice");

    _.chain(req.body)
      .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname);
        if (match) {
          return {
            email,
            surveyId: match.surveyId,
            choice: match.choice
          };
        }
      })
      // compact function takes an array and removes undefined
      .compact()
      // remove duplicate records
      .uniqBy("email", "surveyId")
      // at the end of lodash chain pull out the value
      .each(({ surveyId, email, choice }) => {
        console.log(choice);
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false }
            }
          },
          {
            $inc: { [choice]: 1 },
            $set: { "recipients.$.responded": true },
            lastResponded: new Date()
          }
        ).exec();
        // .exec() executes 'updateOne' in mongoose
      })
      .value();

    res.send({});
  });

  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
    // post survey request should include neccesary props
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(",").map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    });
    // send the email after Survey has been created
    // when we use a class inside of js to create a new instance of a class use 'new' keyword
    // pass in data arguments
    const mailer = new Mailer(survey, surveyTemplate(survey));

    // try function to catch errors
    try {
      await mailer.send();
      await survey.save();
      // payments
      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
