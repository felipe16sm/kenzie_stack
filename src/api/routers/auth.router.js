const { Router } = require("express");

const router = Router();

module.exports = (app) => {
  const { create, login } = require("../controllers/auth.controller");
  const {
    userValidations,
    authValidations,
    validate,
  } = require("../middlewares/validators");

  router.post("/users", userValidations(), validate, create);
  router.post("/login", authValidations(), validate, login);

  app.use("/api", router);
};
