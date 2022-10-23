const newsRouter = require("./news");
const siteRouter = require("./site");
const coursesRouter = require("./courses");
const meRouter = require("./me");
const taskRouter = require("./task");
const inventory = require("./inventory");
const post = require("./post");
const store = require("./store");

function route(app) {
  app.use("/api/v1/me", meRouter);
  app.use("/courses", coursesRouter);
  app.use("/news", newsRouter);
  app.use("/api/v1/", siteRouter);
  app.use("/api/v1/task/", taskRouter);
  app.use("/api/v1/inventory/", inventory);
  app.use("/api/v1/posts/", post);
  app.use("/api/v1/store/", store);
}

module.exports = route;
