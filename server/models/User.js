const mongoose = require('mongoose');

const schema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  userFullname: String,
  date: Date,
  tweets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tweet",
    }
  ]
});

module.exports = mongoose.model("User", schema);
