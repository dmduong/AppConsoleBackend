const { validationResult } = require('express-validator');

class messages {

    statusErrorsRender(status, data = null, req = null, res = null, next) {

        switch (status) {
            case 200:

                return res.send('200 - Success render!');
                break;

            case 400:

                const errors = validationResult(req);

                if (!errors.isEmpty()) {
                    return res.redirect('create');
                }

                break;

            default:
                break;
        }
    }

    statusErrorsJson(status, data = null, req = null, res = null, next) {

        switch (status) {

            case 200:

                return res.status(200).json({
                    data: data ? data : [],
                    status: 200,
                    messages: 'Thành công'
                });

                break;

            case 400:

                const errors = validationResult(req);

                if (!errors.isEmpty()) {
                    return res.status(400).json({
                        data: errors.array(),
                        status: 400,
                        messages: 'Lỗi nhập thông tin'
                    });
                }

                break;

            default:
                break;
        }
    }

}

module.exports = new messages();