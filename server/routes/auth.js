const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

router.post('/signup', async (req, res) => {
  const userExist = await User.findOne({ username: req.body.username });
  if (userExist) {
    return res.status(400).send('Username is already used');
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    username: req.body.username,
    password: hashPassword,
    userFullname: req.body.userFullname
  });

  try {
    const savedUser = await user.save();
    res.send({ user: savedUser._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/login', async (req, res) => {
  const user = await User
    .findOne({
      username: req.body.username,
    })
  if (!user) {
    return res.status(400).send('Username or password is wrong');
  }

  const password = await bcrypt.compare(req.body.password, user.password);
  if (!password) {
    return res.status(400).send('Username or password is wrong');
  }

  const token = jwt.sign({ username: user.username, password: user.password }, process.env.JWT_TOKEN_SECRET);
  res.header('auth-token', token).send(token);
});

module.exports = router;
