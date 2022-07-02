module.exports = function SortMiddleware(req, res, next) {

    res.locals._sort = {
        enabled: false,
        type: 'default',
        column: '',
    };

    if (req.query.hasOwnProperty('_sort')) {

        // Gán cho cái 'res.local._sort.eanble: true'
        // res.locals._sort.enabled = true;

        // Gán cho cái 'res.local._sort.type: 'default' = cái type truyền trên URL'
        // res.locals._sort.type = req.query.type;
        // res.locals._sort.column = req.query.column;

        //ES6:  Hợp nhất object thương tự như ở trên.
        Object.assign(res.locals._sort, {
            enabled: true,
            type: req.query.type,
            column: req.query.column
        });

        //Cái object res.locals._sort được truyền ra views
    }

    next();
}