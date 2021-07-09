const { User } = require("../../models");
const config = require("../../config/passport");
const jwt = require("jsonwebtoken");

module.exports.create = async (req, res) => {
  let user = await User.findOne({ where: { username: req.body.username } });

  if (user) {
    return res.status(400).send({ error: "User already exists " });
  }

  try {
    user = new User({
      username: req.body.username,
      password: req.body.password,
    });
    user.hashPassword();
    await user.save();

    return res.json({
      username: user.username,
    });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ error: "Failed to create user" });
  }
};

module.exports.login = async (req, res) => {
  let user = await User.findOne({ where: { username: req.body.username } });

  if (!user) {
    return res.status(401).send({ message: "Invalid username" });
  }

  const validatePassword = await user.validatePassword(req.body.password);

  if (validatePassword) {
    const token = jwt.sign({ username: user.username }, config.passport.secret);
    return res.send({ token });
  }
  return res.status(401).send({ message: "Invalid passowrd" });
};
