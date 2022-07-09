const TodoList = require('../models/TodoList.js');
const { mongooseToObject, mutipleMongooseToObject } = require('../../util/mongoose.js');
const res = require('express/lib/response');
const mess = require('../../messages/messagesFollowsStatus');
const { validationResult } = require('express-validator');


class TaskController {

    //[GET /api/v1/task/getAll]
    async getAll(req, res, next) {

        try {
            const result = await TodoList.find({});
            if (!result) {
                return res.json({
                    status: 404,
                    messages: 'No information of task!'
                });
            } else {

                return res.status(200).json({
                    status: 200,
                    messages: 'You have a litle information of task!',
                    data: result
                });
            }

        } catch (error) {
            res.status.json({
                status: 503,
                messages: 'Errors connect server!'
            });
        }
    }

    async store(req, res, next) {

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
            //Nếu không có lỗi nhập dữ liệu thì lưu dữ lệu lại.
            const todoList = await new TodoList({ name: req.body.name, complete: false });
            await todoList.save();

            return res.json({
                status: 200,
                messages: 'Create success!',
                data: todoList
            });

        } catch (error) {
            res.status.json({
                status: 503,
                messages: 'Errors connect server!'
            });
        }
    }

    async edit(req, res, next) {
        try {
            const items = await TodoList.findById(req.params.id);

            if (!items) {
                return res.json({
                    status: 404,
                    messgaes: "No information of task!"
                });
            } else {
                return res.json({
                    status: 200,
                    messages: "Get information successfull !",
                    data: items
                });
            }

        } catch (error) {
            res.status.json({
                status: 503,
                messages: 'Errors connect server!'
            });
        }
    }

    async update(req, res, next) {

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

            const items = await TodoList.updateOne({ _id: req.params.id }, req.body);
            if (!items) {

                return res.json({
                    status: 404,
                    messages: "Update task uncessesfully!"
                });
            } else {
                return res.json({
                    status: 200,
                    messages: "Update task cessesfully!",
                    infor: items,
                    data: await TodoList.findById(req.params.id),
                });
            }
        } catch (error) {
            res.json({
                status: 503,
                messages: 'Errors connect server!'
            });
        }
    }

    async delete(req, res, next) {
        try {

            const items = await TodoList.deleteOne({ _id: req.params.id });

            if (!items) {

                return res.json({
                    status: 404,
                    messages: "Delete task uncessesfully!"
                });
            } else {
                return res.json({
                    status: 200,
                    messages: "Delete task cessesfully!",
                });
            }

        } catch (error) {
            res.status.json({
                status: 503,
                messages: 'Errors connect server!'
            });
        }
    }
}

module.exports = new TaskController;