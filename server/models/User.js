const mongoose = require('mongoose');

const schema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  name: String,
  date: Date,
});

module.exports = mongoose.model("User", schema);
