const router = require('express').Router();

const User = require('./models/User');

router.get('/:username', async (req, res) => {
  const user = await User.find();
  res.send(user);
});

router.post('/:username', async (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    name: req.body.name,
    date: req.body.date,
  })
  await user.save();
  res.send(user);
});

// router.get('/:username/:tweetId', (req, res) => {
//   res.send();
// });

module.exports = router;
