const { body } = require("express-validator");

module.exports = () => {
  return [
    body("name").isString().notEmpty().escape().trim(),
    body("description").isString().notEmpty().escape().trim(),
    body("tools").isArray().notEmpty(),
  ];
};
