const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const config = require("../config/passport");

const { User } = require("../models")();

module.exports = (passport) => {
  const options = {};

  options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

  options.secretOrKey = config.passport.secret;

  const strategy = new Strategy(options, async (payload, done) => {
    const user = await User.findOne({ where: { username: payload.username } });

    if (!user) return done(err, false);

    return done(null, {
      id: user.id,
      username: user.username,
    });
  });

  passport.use(strategy);
};
