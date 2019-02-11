const mongoose = require("mongoose");

// const Schema = mongoose.Schema; -> destructured
const { Schema } = mongoose;

// create Schema and add/remove properties (can freely do so later)
// schema type or use an object
const userSchema = new Schema({
  googleId: String,
  email: String,
  name: String,
  credits: { type: Number, default: 3 }
});

// create model class
mongoose.model("users", userSchema);
