const Course = require('../models/Course.js');
const User = require('../models/Users.js');
const { mutipleMongooseToObject } = require('../../util/mongoose.js');
const jwt = require('jsonwebtoken');
const mess = require('../../messages/messagesFollowsStatus');

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

            //Xử lý nhập dữ liệu:
            const errors = await mess.showErrorsValidationsToJson(400, req, res, next);
            if (!errors.isEmpty()) {
                return res.json({
                    data: errors.array(),
                    status: 400,
                    messages: 'Validations errors!'
                });
            }

            const user = new User(req.body);
            await user.save();
            const token = await user.generateAuthToken();
            const resfreshToken = await user.generateAuthRefreshToken();
            const { password, ...other } = user._doc;
            res.status(200).json({
                status: 200,
                messages: "Create successfull !",
                data: { ...other },
                token: token,
                resfreshToken: resfreshToken
            })
        } catch (error) {
            res.json({
                status: 401,
                error: error,
                messages: "Create unsuccessfully!"
            })
        }
    }

    async login(req, res, next) {

        //Login a registered user
        try {

            //Xử lý nhập dữ liệu:
            const errors = await mess.showErrorsValidationsToJson(400, req, res, next);
            if (!errors.isEmpty()) {
                return res.json({
                    data: errors.array(),
                    status: 400,
                    messages: 'Validations errors!'
                });
            }

            const email = req.body.email;
            const pass = req.body.password;
            const user = await User.findByCredentials(email, pass);
            if (!user) {
                return res.json({
                    messages: 'Login failed! Check authentication credentials',
                    status: 401
                })
            }

            const token = await user.generateAuthToken();
            const resfreshToken = await user.generateAuthRefreshToken();
            const { password, ...other } = user._doc; //loai bo thuoc tinh password

            const cookieOptions = {
                httpOnly: true,
                expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
            };

            res.cookie("resfreshToken", resfreshToken, cookieOptions);

            res.json({
                status: 200,
                messages: "Login successfully!",
                data: { ...other },
                token,
                resfreshToken
            })
        } catch (error) {
            res.json({
                status: 401,
                error: error,
                messages: "Login unsuccessfully!"
            })
        }
    }

    async refreshToken(req, res, next) {

        const refreshToken = req.cookies.resfreshToken;

        if (!refreshToken) {
            return res.json({
                status: 401,
                messages: "You're not authenticated!"
            });
        } else {
            const reToken = jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, async (error, user) => {
                if (error) {
                    return res.json({
                        status: 401,
                        messages: error
                    });
                } else {
                    const userNew = await User.findOne({ _id: user._id });
                    if (userNew) {
                        // New access token
                        const newToken = await userNew.generateAuthToken();
                        // New refresh token
                        const newRefreshToken = await userNew.generateAuthRefreshToken();
                        const cookieOptions = {
                            httpOnly: true,
                            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                        };

                        res.cookie("resfreshToken", newRefreshToken, cookieOptions);
                        res.json({
                            status: 200,
                            messages: "Refresh token successfully!",
                            user: userNew,
                            newToken: newToken,
                            newRefreshToken: newRefreshToken
                        });
                    } else {
                        return res.json({
                            stauts: 401,
                            messages: "You're not authenticated!"
                        });
                    }
                }
            });

        }
    }


}

module.exports = new SiteController;