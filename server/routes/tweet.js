const express = require("express");
const router = express.Router();
const passport = require("passport");

const User = require("../models/User");
const Tweet = require("../models/Tweet");
const Timeline = require("../models/Timeline");

router.get(
  "/timeline/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const user = await User.findOne({
      username: req.user.username,
    }).populate({
      path: "timeline",
      populate: { path: "tweet" },
      options: { sort: { createdAt: -1 }, limit: 10 },
    });

    const { username, userFullname, timeline } = user;
    res.send({ username, userFullname, timeline });
  }
);

router.get(
  "/profile-timeline",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const user = await User.findOne({
      username: req.user.username,
    }).populate({
      path: "profileTimeline",
      populate: { path: "tweet" },
      options: { sort: { createdAt: -1 }, limit: 10 },
    });

    const { username, userFullname, profileTimeline } = user;
    res.send({ username, userFullname, profileTimeline });
  }
);

router.get("/:username", async (req, res) => {
  const user = await User.findOne({
    username: req.params.username,
  })
    .populate("tweets")
    .sort({ _id: -1 });
  const { username, userFullname, tweets } = user;
  res.send({ username, userFullname, tweets });
});

router.get("/:username/:tweetId", async (req, res) => {
  const tweet = await Tweet.findOne({
    _id: req.params.tweetId,
  })
    .populate("user")
    .populate("parentTweet")
    .populate("childTweet");

  res.send(tweet);
});

router.post(
  "/:tweetId/retweet",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const user = await User.findOne({
      username: req.user.username,
    });

    const tweet = await Tweet.findById(req.params.tweetId);

    const newTimeline = new Timeline({
      tweet: tweet._id,
      type: "retweet",
    });

    user.followers.map(async (f) => {
      const follower = await User.findById(String(f._id));
      await follower.timeline.push(newTimeline);
      await follower.save();
    });

    await user.profileTimeline.push(newTimeline);

    await user.save();
    await newTimeline.save();

    res.send(tweet);
  }
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const user = await User.findOne({
      username: req.user.username,
    });

    const tweet = new Tweet({
      userId: user._id,
      username: user.username,
      userFullname: user.userFullname,
      createdAt: Date.now(),
      tweetText: req.body.tweetText,
      parentTweet: req.body.parentTweet,
    });

    const newTimeline = new Timeline({
      tweet: tweet._id,
      type: "tweet",
    });

    user.followers.map(async (f) => {
      const follower = await User.findById(String(f._id));
      await follower.timeline.push(newTimeline);
      await follower.save();
    });

    await user.tweets.push(tweet);
    await user.profileTimeline.push(newTimeline);

    await user.save();
    await tweet.save();
    await newTimeline.save();

    const parentTweet = await Tweet.findOne({
      _id: req.body.parentTweet,
    });
    if (parentTweet !== null) {
      await parentTweet.childTweet.push(tweet);
      await parentTweet.save();
    }

    res.send(tweet);
  }
);

module.exports = router;
