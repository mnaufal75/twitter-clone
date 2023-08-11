const mongoose = require("mongoose");

const schema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  userFullname: { type: String, required: true },
  createdAt: Date,
  tweets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tweet",
    },
  ],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  timeline: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Timeline",
    },
  ],
  profileTimeline: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Timeline",
    },
  ],
});

module.exports = mongoose.model("User", schema);
