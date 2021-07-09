const { body } = require("express-validator");

module.exports = () => {
  return [body("name").isString().notEmpty().escape().trim()];
};
