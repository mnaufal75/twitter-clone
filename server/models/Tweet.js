const mongoose = require('mongoose');

const schema = mongoose.Schema({
  date: Date,
  text: String,
});

module.exports = mongoose.model("Tweet", schema);
