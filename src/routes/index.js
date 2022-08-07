const newsRouter = require('./news');
const siteRouter = require('./site');
const coursesRouter = require('./courses');
const meRouter = require('./me');
const taskRouter = require('./task');
const inventory = require('./inventory');

function route(app) {

    app.use('/api/v1/me', meRouter);
    app.use('/courses', coursesRouter);
    app.use('/news', newsRouter);
    app.use('/api/v1/', siteRouter);
    app.use('/api/v1/task/', taskRouter);
    app.use('/api/v1/inventory/', inventory);
}

module.exports = route;