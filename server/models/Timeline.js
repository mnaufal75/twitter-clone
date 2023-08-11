const mongoose = require("mongoose");

const schema = mongoose.Schema({
  type: String,
  tweet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tweet",
  },
});

module.exports = mongoose.model("Timeline", schema);
