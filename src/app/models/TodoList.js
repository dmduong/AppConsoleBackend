const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    name: {
        type: String,
        minlength: 1,
        maxlength: 255
    },
    complete: {
        type: Boolean,
        minlength: 1,
        maxlength: 600
    },
}, {
    timestamps: true
});

const TodoList = mongoose.model('TodoLists', TodoSchema);

module.exports = TodoList;