const newsRouter = require("./news");
const siteRouter = require("./site");
const coursesRouter = require("./courses");
const meRouter = require("./me");
const taskRouter = require("./task");
const inventory = require("./inventory");
const post = require("./post");
const store = require("./store");
const supplier = require("./supplier");
const order = require("./order");
const validate = require("../app/validator/index");

function route(app) {
  // app.use("/api/v1/store/", validate.auth);
  app.use("/api/v1/store/", store);

  app.use("/api/v1/me", validate.auth);
  app.use("/api/v1/me", meRouter);

  app.use("/courses", coursesRouter);
  app.use("/news", newsRouter);
  app.use("/api/v1/", siteRouter);
  app.use("/api/v1/task/", taskRouter);

  app.use("/api/v1/inventory/", validate.auth);
  app.use("/api/v1/inventory/", inventory);

  app.use("/api/v1/posts/", validate.auth);
  app.use("/api/v1/posts/", post);

  app.use("/api/v1/supplier/", validate.auth);
  app.use("/api/v1/supplier/", supplier);

  app.use("/api/v1/order/", validate.auth);
  app.use("/api/v1/order/", order);
}

module.exports = route;
