const mongoose = require('mongoose');

const schema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  date: Date,
  text: String,
});

module.exports = mongoose.model("Tweet", schema);
