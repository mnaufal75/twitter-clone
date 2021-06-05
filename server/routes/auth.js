const express = require('express');
const router = express.Router();

const User = require('../models/User');

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

module.exports = router;
