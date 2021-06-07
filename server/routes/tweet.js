const express = require('express');
const router = express.Router();
const passport = require('passport');

const User = require('../models/User');
const Tweet = require('../models/Tweet');

router.get('/timeline/', passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const user = await User
      .findOne({
        username: req.user.username,
      })
      .populate("timeline");

    res.send(user);
  });

router.get('/:username', async (req, res) => {
  const user = await User
    .findOne({
      username: req.params.username,
    })
    .populate("tweets")
    .sort({ "_id": -1 });
  res.send(user);
});

router.get('/:username/:tweetId', async (req, res) => {
  const tweet = await Tweet
    .findOne({
      _id: (req.params.tweetId),
    })
    .populate("user")
    .populate("parentTweet")
    .populate("childTweet");

  res.send(tweet)
});

router.post('/', async (req, res) => {
  const user = await User
    .findOne({
      username: req.body.username,
    })

  const tweet = new Tweet({
    userId: user._id,
    username: user.username,
    userFullname: user.userFullname,
    date: Date.now(),
    tweetText: req.body.tweetText,
    parentTweet: req.body.parentTweet,
  });

  user.followers.map(async f => {
    const follower = await User
      .findById(String(f._id));
    console.log(follower);
    await follower.timeline.push(tweet);
    await follower.save();
  });

  await user.tweets.push(tweet);
  await user.timeline.push(tweet);
  await user.save();
  await tweet.save();

  const parentTweet = await Tweet
    .findOne({
      _id: req.body.parentTweet,
    });
  if (parentTweet !== null) {
    await parentTweet.childTweet.push(tweet);
    await parentTweet.save();
  }

  res.send(tweet);
});

module.exports = router;
