const { validationResult } = require("express-validator");

module.exports.userValidations = require("./user.validator");
module.exports.authValidations = require("./auth.validator");
module.exports.categoryValidations = require("./category.validator");
module.exports.toolsValidations = require("./tools.validator");
module.exports.stackValidations = require("./stack.validator");

module.exports.validate = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = [];
  console.log(errors);
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};
