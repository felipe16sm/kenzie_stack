const bindAuthRoutes = require("./routers/auth.router");
const bindCategoryRoutes = require("./routers/category.router");
const bindToolsRoutes = require("./routers/tools.router");
const bindStackRoutes = require("./routers/stack.router");

module.exports = (app) => {
  bindAuthRoutes(app);
  bindCategoryRoutes(app);
  bindToolsRoutes(app);
  bindStackRoutes(app);
};
