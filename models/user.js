const mongoose = require('mongoose');
// const Schema = mongoose.Schema; -> destructured
const { Schema } = mongoose;

// create Schema and add/remove properties (can freely do so later)
const userSchema = new Schema ({
  googleID: String
});

// create model class
mongoose.model('users', userSchema);
