const passport = require("passport");

module.exports.isAuthenticatedOrReadOnly = (req, res, next) => {
  if (req.method === "GET") {
    return next();
  }

  passport.authenticate("jwt", { session: false })(req, res, next);
};
