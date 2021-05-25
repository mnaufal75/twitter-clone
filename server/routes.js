const router = require('express').Router();

const User = require('./models/User');
const Tweet = require('./models/Tweet');

router.post('/signup', async (req, res) => {
  console.log("signup");
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    userFullname: req.body.userFullname
  });
  await user.save();
  res.send(user);
});

router.post('/login', async (req, res) => {
  console.log("login");
  const user = await User
    .findOne({
      username: req.body.username,
    })
  if (user && user.password === req.body.password) {
    console.log("Log in");
  }
  res.send(user);
});

router.get('/tweets/:username', async (req, res) => {
  const user = await User
    .findOne({
      username: req.params.username,
    })
    .populate("tweets")
  res.send(user);
});

router.post('/tweets/:username', async (req, res) => {
  const user = await User
    .findOne({
      username: req.params.username,
    })

  const tweet = new Tweet({
    userId: user._id,
    username: user.username,
    userFullname: user.userFullname,
    date: Date.now(),
    tweetText: req.body.tweetText,
    parentTweet: req.body.parentTweet,
  });

  await user.tweets.push(tweet);
  await user.save();
  await tweet.save();
  res.send(tweet);
});

router.get('/tweets/:username/:tweetId', async (req, res) => {
  const tweet = await Tweet
    .findOne({
      _id: (req.params.tweetId),
    })
    .populate("user")
    .populate("parentTweet");

  res.send(tweet)
});

module.exports = router;
