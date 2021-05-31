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
    .sort({ "_id": -1 });
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

  user.followers.map(async f => {
    const follower = await User
      .findById(String(f._id));
    console.log(follower);
    await follower.timeline.push(tweet);
    await follower.save();
  });

  await user.tweets.push(tweet);
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

router.get('/tweets/:username/:tweetId', async (req, res) => {
  const tweet = await Tweet
    .findOne({
      _id: (req.params.tweetId),
    })
    .populate("user")
    .populate("parentTweet")
    .populate("childTweet");

  res.send(tweet)
});

router.post('/user/:username/follow', async (req, res) => {
  const follower = await User
    .findOne({
      username: req.body.username,
    })

  const followed = await User
    .findOne({
      username: req.params.username,
    })

  if (req.body.follow === true) {
    await followed.followers.push(follower);
    await follower.following.push(followed);
  } else {
    // Remove follower from followed list
    const y = followed.followers.find(x => x._id.equals(follower._id));
    if (y !== undefined) {
      await followed.followers.remove({ _id: y });
    }

    // Remove followed from following list
    const z = follower.following.find(x => x._id.equals(followed._id));
    if (z !== undefined) {
      await follower.following.remove({ _id: z });
    }
  }

  await follower.save();
  await followed.save();

  res.send(followed);
});

router.get('/user/:username/follow', async (req, res) => {
  const user = await User
    .findOne({
      username: req.params.username,
    })
    .populate("followers")
    .populate("following");

  res.send({ followers: user.followers, following: user.following });
});

router.get('/timeline/:username', async (req, res) => {
  const user = await User
    .findOne({
      username: req.params.username,
    })
    .populate("timeline");

  res.send(user);
});

module.exports = router;
