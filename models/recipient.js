// sub document collection for the survey.js model
const mongoose = require("mongoose");
const { Schema } = mongoose;

const recipientSchema = new Schema({
  email: String,
  responded: { type: Boolean, default: false }
});

// export schema
module.exports = recipientSchema;
