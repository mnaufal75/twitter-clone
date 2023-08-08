const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

const User = require("../models/User");

router.post(
  "/signup",
  body("username").notEmpty().withMessage("Username should not be empty."),
  body("password")
    .isLength({ min: 6 })
    .withMessage(
      "Password length has to be greater than or equal to 6 characters."
    ),
  body("userFullname").notEmpty().withMessage("Name should not be empty."),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send(errors.array()[0].msg);
      }

      const userExist = await User.findOne({ username: req.body.username });
      if (userExist) {
        return res.status(400).send("Username is already used");
      }

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(req.body.password, salt);

      const user = new User({
        username: req.body.username,
        password: hashPassword,
        userFullname: req.body.userFullname,
      });

      await user.save().then((savedUser) => {
        console.log(`Sign up success with id: ${savedUser._id}`);
        res.send({ user: savedUser._id });
      });
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/login",
  body("username").notEmpty().withMessage("Username should not be empty."),
  body("password")
    .isLength({ min: 6 })
    .withMessage(
      "Password length has to be greater than or equal to 6 characters."
    ),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send(errors.array()[0].msg);
    }

    try {
      const user = await User.findOne({
        username: req.body.username,
      });
      if (!user) {
        return res.status(400).send("Username or password is wrong");
      }

      const password = await bcrypt.compare(req.body.password, user.password);
      if (!password) {
        return res.status(400).send("Username or password is wrong");
      }

      const token = jwt.sign(
        { username: user.username, password: user.password },
        process.env.JWT_TOKEN_SECRET
      );
      res.header("auth-token", token).send(token);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
