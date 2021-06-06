const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User');

const jwtStrategy = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_TOKEN_SECRET,
  },
  async (jwtPayload, done) => {
    return User.findOne({ username: jwtPayload.username })
      .then((user) => {
        return done(null, user);
      })
      .catch((err) => {
        return done(err);
      })
  }
)

module.exports = jwtStrategy;
