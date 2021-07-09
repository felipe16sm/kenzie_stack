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
  } = require("../controllers/tools.controller");

  const {
    isAuthenticatedOrReadOnly,
  } = require("../middlewares/permissions/userAdmin");
  const { toolsValidations, validate } = require("../middlewares/validators");
  app.use("/api/tools", isAuthenticatedOrReadOnly);

  router.post("/tools", toolsValidations(), validate, create);
  router.get("/tools", list);
  router.get("/tools/:id", retrieve);
  router.put("/tools/:id", toolsValidations(), validate, update);
  router.delete("/tools/:id", destroy);

  app.use("/api", router);
};
