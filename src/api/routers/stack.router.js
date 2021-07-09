const { Router } = require("express");
const passport = require("passport");

const router = Router();

module.exports = (app) => {
  const {
    create,
    list,
    retrieve,
    update,
    destroy,
  } = require("../controllers/stack.controller");

  const {
    isAuthenticatedOrReadOnly,
  } = require("../middlewares/permissions/userAdmin");
  const { stackValidations, validate } = require("../middlewares/validators");
  app.use("/api/stacks", isAuthenticatedOrReadOnly);

  router.post("/stacks", stackValidations(), validate, create);
  router.get("/stacks", list);
  router.get("/stacks/:id", retrieve);
  router.put("/stacks/:id", stackValidations(), validate, update);
  router.delete("/stacks/:id", destroy);

  app.use("/api", router);
};
