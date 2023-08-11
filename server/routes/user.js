const express = require("express");
const router = express.Router();
const passport = require("passport");

const User = require("../models/User");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const user = await User.findOne({
      username: req.user.username,
    })
      .populate({
        path: "timeline",
        populate: { path: "tweet" },
        options: { sort: { createdAt: -1 }, limit: 10 },
      })
      .populate({
        path: "profileTimeline",
        populate: { path: "tweet" },
        options: { sort: { createdAt: -1 }, limit: 10 },
      })
      .populate("tweets")
      .populate("followers")
      .populate("following");

    const {
      tweets,
      timeline,
      profileTimeline,
      followers,
      following,
      username,
      userFullname,
    } = user;
    res.send({
      tweets,
      timeline,
      profileTimeline,
      followers,
      following,
      username,
      userFullname,
    });
  }
);

router.post(
  "/:username/follow",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const follower = await User.findOne({
      username: req.user.username,
    });

    const followed = await User.findOne({
      username: req.params.username,
    });

    const isFollowed =
      follower.following.filter((userId) => userId.equals(followed._id))
        .length > 0;

    if (!isFollowed) {
      await followed.followers.push(follower);
      await follower.following.push(followed);
    } else {
      // Remove follower from followed list
      const allFollowers = followed.followers.find((u) =>
        u._id.equals(follower._id)
      );
      if (allFollowers) {
        await followed.followers.remove({ _id: allFollowers });
      }

      // Remove followed from following list
      const allFollowedUsers = follower.following.find((u) =>
        u._id.equals(followed._id)
      );
      if (allFollowedUsers) {
        await follower.following.remove({ _id: allFollowedUsers });
      }
    }

    await follower.save();
    await followed.save();

    const { username, userFullname } = followed;
    res.send({ username, userFullname });
  }
);

router.get("/:username/follow", async (req, res) => {
  const user = await User.findOne({
    username: req.params.username,
  })
    .populate("followers")
    .populate("following");

  const { username, userFullname, followers, following } = user;
  res.send({ username, userFullname, followers, following });
});

module.exports = router;
