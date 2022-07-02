const mongoose = require('mongoose');
//Khởi tạo slug cho khóa học (Tự động không cần nhập)
const slug = require('mongoose-slug-generator');

//khởi tạo xóa đem bản ghi vào thùng rác
const mongooseDelete = require('mongoose-delete');

//Thư viện giúp tự tăng _id
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const ObjectId = Schema.ObjectId;

const Course = new Schema({
    _id: { type: Number },
    name: { type: String, minlength: 1, maxlength: 255 },
    discription: { type: String, minlength: 1, maxlength: 600 },
    image: { type: String, minlength: 1, maxlength: 255 },
    level: { type: String, minlength: 1, maxlength: 255 },
    videoId: { type: String, minlength: 1, maxlength: 255 },
    slug: { type: String, slug: 'name', unique: true }, // Slug sử dụng là trường name
}, {
    _id: false,
    timestamps: true
});

//Customse query helpers
Course.query.sortTable = function (req) {
    if (req.query.hasOwnProperty('_sort')) {

        const isValueType = ['asc', 'desc'].includes(req.query.type);

        const column = req.query.column;
        const type = req.query.type;

        return this.sort({
            [column]: isValueType ? type : 'desc'
        });
    }

    return this;
}

//Add flugin
mongoose.plugin(slug);

//Tự động tăng _id mặt định.
Course.plugin(AutoIncrement);

Course.plugin(mongooseDelete, {
    deletedAt: true, //khi xóa tạo ra luôn deletedAt
    overrideMethods: 'all', //Ghi đè lên những khóa học hiển thị ra khi xóa mà ko cần where trong db.
});

module.exports = mongoose.model('Course', Course);