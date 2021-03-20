const router = require('express').Router();

const User = require('./models/User');
const Tweet = require('./models/Tweet');

router.get('/tweets/:username', async (req, res) => {
  const user = await User
    .find({
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
    date: Date.now(),
    text: req.body.text,
  })

  await user.tweets.push(tweet);
  await user.save();
  await tweet.save();
  res.send(tweet);
});

// router.get('/:username/:tweetId', (req, res) => {
//   res.send();
// });

module.exports = router;
