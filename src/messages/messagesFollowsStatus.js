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

    async showValidations(status, req, res, next) {

        if (status == 400) {
            return await validationResult(req);
        } else {
            return array();
        }
    }

}

module.exports = new messages();