//cấu hình khi dữ liệu đưa ra views ko nhận this (lỗi handlebars)
module.exports = {
    mutipleMongooseToObject: function (mongoosesArray) {
        return mongoosesArray.map(datas => datas.toObject())
    },

    mongooseToObject: function (mongoosesArray) {
        return mongoosesArray ? mongoosesArray.toObject() : mongoosesArray
    }
}