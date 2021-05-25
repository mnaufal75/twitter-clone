const mongoose = require('mongoose');

const schema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  username: String,
  userFullname: String,
  date: Date,
  tweetText: String,
  parentTweet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tweet",
  },
  childTweet: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tweet",
  }],
});

module.exports = mongoose.model("Tweet", schema);
