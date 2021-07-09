const { body } = require("express-validator");

module.exports = () => {
  return [
    body("username").isString().notEmpty().escape().trim(),
    body("password").isStrongPassword({ minLength: 3 }), // Melhor para senha
  ];
};
