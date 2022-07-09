const newsRouter = require('./news');
const siteRouter = require('./site');
const coursesRouter = require('./courses');
const meRouter = require('./me');
const taskRouter = require('./task');

function route(app) {

    app.use('/api/v1/me', meRouter);
    app.use('/courses', coursesRouter);
    app.use('/news', newsRouter);
    app.use('/api/v1/', siteRouter);
    app.use('/api/v1/task/', taskRouter);
}

module.exports = route;