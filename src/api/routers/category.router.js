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
  } = require("../controllers/category.controller");

  const {
    isAuthenticatedOrReadOnly,
  } = require("../middlewares/permissions/userAdmin");
  const {
    categoryValidations,
    validate,
  } = require("../middlewares/validators");
  app.use("/api/categories", isAuthenticatedOrReadOnly);

  router.post("/categories", categoryValidations(), validate, create);
  router.get("/categories", list);
  router.get("/categories/:id", retrieve);
  router.put("/categories/:id", categoryValidations(), validate, update);
  router.delete("/categories/:id", destroy);

  app.use("/api", router);
};
