class NewsController {

    // [GET /news][ Create Controller news ]
    index(req, res) {
        res.render('news');
    }

    // [GET /news:slug] [Create controller detail news]
    show(req, res) {
        res.send('news detail');
    }
}

module.exports = new NewsController;