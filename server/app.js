const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./routes");
const dotenv = require("dotenv").config();
const passport = require("passport");
const session = require("express-session");
// const localStrategy = require('./config/local');
const jwtStrategy = require("./config/jwt");

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
// passport.use(localStrategy);
passport.use(jwtStrategy);

app.get("/", (req, res) => {
  res.json({
    message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
  });
});

app.use("/api", routes);

app.use((error, req, res, next) => {
  return res.status(500).send("Server error");
});

module.exports = app;
