const Course = require('../models/Course.js');
const { mongooseToObject, mutipleMongooseToObject } = require('../../util/mongoose.js');
const res = require('express/lib/response.js');

class MeController {

    //[GET /me/stored/course] [my course]
    myCourse(req, res, next) {

        //Xử lý bất đồng bộ.
        Promise.all([

            //Viết thêm hàm sortTable bên modle để thu gọn hàm sort. sử dụng nhiều chỗ.
            Course.find({}).sortTable(req),
            Course.countDocumentsDeleted({}),
            Course.countDocuments({})
        ])
            .then(([courses, countCoursesTrash, countCourses]) => {
                res.render('me/myCourse', {
                    courses: mutipleMongooseToObject(courses),
                    countCoursesTrash: countCoursesTrash,
                    countCourses: countCourses,
                });
            })
            .catch(next); // trả về kế quả đúng của 2 hàm phía dưới.

        //Khi đã viết gộp hai phương thức trên vào promise thì hai phương thức phía dưới ko cần nữa.

        // Course.find({})
        //     .then(courses => {
        //         res.render('me/myCourse', {
        //             courses: mutipleMongooseToObject(courses)
        //         });
        //     })
        //     .catch(next);

        // Course.countDocuments({}).then(
        //     countCourses => {
        //         res.render('me/myCourse', {
        //             courses: countCourses
        //         });
        //     }
        // ).catch(() => { });
    }

    //[GET /me/trash/course] [my trash]
    myTrash(req, res, next) {
        Promise.all([
            Course.findDeleted({}),
            Course.countDocumentsDeleted({}),
            Course.countDocuments({})
        ])
            .then(([courses, countCoursesTrash, countCourses]) => {
                res.render('me/myTrash', {
                    courses: mutipleMongooseToObject(courses),
                    countCoursesTrash: countCoursesTrash,
                    countCourses: countCourses,
                });
            })
            .catch(next);

        // Course.findDeleted({})
        //     .then(courses => {
        //         res.render('me/myTrash', {
        //             courses: mutipleMongooseToObject(courses)
        //         });
        //     })
        //     .catch(next);
    }

    async info(req, res, next) {
        res.json(req.user);
    }

    async logout(req, res, next) {
        // Log user out of the application
        try {
            req.user.tokens = req.user.tokens.filter((token) => {
                return token.token != req.token
            })
            await req.user.save()
            res.send()
        } catch (error) {
            res.status(500).send(error)
        }
    }

    async logoutAll(req, res, next) {
        try {
            req.user.tokens.splice(0, req.user.tokens.length);
            await req.user.save();
            res.send();
        } catch (error) {
            res.status(500).send(error);
        }
    }
}

module.exports = new MeController;