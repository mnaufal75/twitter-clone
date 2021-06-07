const express = require('express');
const router = express.Router();
const passport = require('passport');

const User = require('../models/User');

router.post('/:username/follow', passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const follower = await User
      .findOne({
        username: req.user.username,
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

router.get('/:username/follow', async (req, res) => {
  const user = await User
    .findOne({
      username: req.params.username,
    })
    .populate("followers")
    .populate("following");

  res.send({ followers: user.followers, following: user.following });
});

module.exports = router;
