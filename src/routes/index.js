const newsRouter = require('./news');
const siteRouter = require('./site');
const coursesRouter = require('./courses');
const meRouter = require('./me');


function route(app) {
    app.use('/api/v1/me', meRouter);
    app.use('/courses', coursesRouter);
    app.use('/news', newsRouter);
    app.use('/api/v1/', siteRouter);
}

module.exports = route;