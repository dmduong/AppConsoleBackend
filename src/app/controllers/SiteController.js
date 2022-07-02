const Course = require('../models/Course.js');
const User = require('../models/Users.js');
const { mutipleMongooseToObject } = require('../../util/mongoose.js');
const jwt = require('jsonwebtoken');

class SiteController {

    // [GET /news][ Create Controller news ]
    index(req, res, next) {

        //hiển thị dữ liệu dạng callback
        // Course.find({}, (err, courses) => {
        //     if (!err) {
        //         res.json(courses);
        //     } else {
        //         next(err);
        //     }
        // });

        //hiển thị dữ liệu dạng promises
        // Course.find({})
        //     .then(courses => {
        //         res.render('home', {
        //             courses: mutipleMongooseToObject(courses)
        //         });
        //     })
        //     .catch(next);

        Promise.all([
            Course.find({}),
            Course.countDocumentsDeleted({}),
            Course.countDocuments({})
        ])
            .then(([courses, countCoursesTrash, countCourses]) => {
                res.render('home', {
                    courses: mutipleMongooseToObject(courses),
                    countCoursesTrash: countCoursesTrash,
                    countCourses: countCourses,
                });
            })
            .catch(next);
    }

    search(req, res) {
        res.render('search');
    }


    async register(req, res, next) {

        // Create a new user
        try {
            const user = new User(req.body);
            await user.save();
            const token = await user.generateAuthToken();

            res.status(200).json({
                status: 200,
                messages: "Successfull !",
                data: user,
                token: token
            })
        } catch (error) {
            res.status(400).send(error)
        }
    }

    async login(req, res, next) {

        //Login a registered user
        try {
            const { email, password } = req.body;
            const user = await User.findByCredentials(email, password);
            if (!user) {
                return res.status(401).send({ error: 'Login failed! Check authentication credentials' })
            }
            const token = await user.generateAuthToken()
            res.send({ user, token })
        } catch (error) {
            res.status(400).send(error)
        }
    }


}

module.exports = new SiteController;