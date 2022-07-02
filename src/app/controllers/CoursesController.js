const Course = require('../models/Course.js');
const { mongooseToObject, mutipleMongooseToObject } = require('../../util/mongoose.js');
const res = require('express/lib/response');
const mess = require('../../messages/messagesFollowsStatus');

class CoursesController {

    //[GET /courses/:slug] [detail courses]
    show(req, res, next) {

        //Lấy giá trị biến slug vừa truyền vào controller (slug là tên đã đặt trước đó trên routes): req.params.slug
        // console.log(req.params.slug);

        Promise.all([
            Course.findOne({ slug: req.params.slug }),
            Course.countDocumentsDeleted({}),
            Course.countDocuments({})
        ])
            .then(([course, countCoursesTrash, countCourses]) => {
                res.render('courses/show', {
                    courses: mongooseToObject(course),
                    countCoursesTrash: countCoursesTrash,
                    countCourses: countCourses,
                });
            })
            .catch(next);

        // Course.findOne({
        //     slug: req.params.slug
        // })
        //     .then((course) => {
        //         res.render('courses/show', {
        //             courses: mongooseToObject(course)
        //         });
        //     })
        //     .catch(next)
    }

    //[GET /courses/create] [create courses]
    create(req, res, next) {
        Promise.all([
            Course.countDocumentsDeleted({}),
            Course.countDocuments({})
        ])
            .then(([countCoursesTrash, countCourses]) => {
                res.render('courses/create', {
                    countCoursesTrash: countCoursesTrash,
                    countCourses: countCourses,
                });
            })
            .catch(next);
    }

    //[POST /courses/store] [store courses]
    store(req, res, next) {

        //Errors validations.
        mess.statusErrorsRender(400, req, res, next);

        const course = new Course(req.body);
        course.save()
            .then(() => mess.statusErrorsJson(200, course, req, res, next))
            .catch(next);

        // res.redirect('create');

    }

    //[GET /courses/:id/edit] [edit courses]
    edit(req, res, next) {

        Promise.all([
            Course.findById(req.params.id),
            Course.countDocumentsDeleted({}),
            Course.countDocuments({})
        ])
            .then(([course, countCoursesTrash, countCourses]) => {
                res.render('courses/edit', {
                    courses: mongooseToObject(course),
                    countCoursesTrash: countCoursesTrash,
                    countCourses: countCourses,
                });
            })
            .catch(next);

        // Course.findById(req.params.id)
        //     .then((course) => {
        //         res.render('courses/edit', {
        //             courses: mongooseToObject(course)
        //         });
        //     })
        //     .catch(next)
    }

    //[PUT /courses/:id] [update courses]
    update(req, res, next) {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array(), status: 400 });
            return;
        }

        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/course'))
            .catch(next);
    }

    //[DELETE /courses/:id/delete] [delete courses], Đưa bản ghi vào thùng rác.
    delete(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //[PATH /courses/:id/restore] [restore courses]
    restore(req, res, next) {
        // Phương thức restore của mongoose-delete cung cấp.
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //[DELETE /courses/:id/deletetrash] [deletetrash courses] , Xóa vĩnh viễn bản ghi
    deletetrash(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //[POST /courses/actionmulti] [actionmulti courses] , Chọn nhiều field
    actionmulti(req, res, next) {
        switch (req.body.actionName) {
            case 'noAction':

                res.redirect('back');
                break;

            case 'delete':

                const value = req.body._id;
                Course.delete({ _id: value })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;

            case 'else':
                res.redirect('back');
                break;

            default:
                break;
        }
    }
}

module.exports = new CoursesController;