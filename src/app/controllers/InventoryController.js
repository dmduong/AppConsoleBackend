const { Category, Status, Unit, Products } = require('../models/Inventory.js');
const { mongooseToObject, mutipleMongooseToObject } = require('../../util/mongoose.js');
const mess = require('../../messages/messagesFollowsStatus');
const upload = require('../middlewares/Auth');
const Resize = require('../../util/Resize');
const destination = "/images/products/";
const multer = require('multer');
const fs = require("fs");
const path = require('path');

class InventoryController {

    async storeCategory(req, res, next) {
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
            const category = await new Category(req.body);
            await category.save();

            return res.json({
                status: 200,
                messages: 'Create success!',
                data: category
            });

        } catch (error) {
            return res.json({
                status: 503,
                messages: 'Errors connect server!'
            });
        }
    }

    async getAllCategory(req, res, next) {
        try {
            const result = await Category.find({}).populate('status');
            if (!result) {
                return res.json({
                    status: 404,
                    messages: 'No information of category!'
                });
            } else {
                return res.status(200).json({
                    status: 200,
                    messages: 'You have a litle information of category!',
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

    async editCategory(req, res, next) {
        try {
            const items = await Category.findById(req.params.id).populate('status');

            if (!items) {
                return res.json({
                    status: 404,
                    messgaes: "No information of category!"
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

    async updateCategory(req, res, next) {
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

            const categoryUpdate = await Category.findOne({ _id: req.params.id });
            if (categoryUpdate) {
                const items = await Category.updateOne({ _id: req.params.id }, req.body);
                if (!items) {

                    return res.json({
                        status: 404,
                        messages: "Update category uncessesfully!"
                    });
                } else {
                    return res.json({
                        status: 200,
                        messages: "Update category cessesfully!",
                        infor: items,
                        data: await Category.findById(req.params.id).populate('status'),
                    });
                }
            } else {
                return res.json({
                    status: 404,
                    messages: "Update category uncessesfully!"
                });
            }
        } catch (error) {
            res.json({
                status: 503,
                messages: 'Update category uncessesfully!'
            });
        }
    }

    async deleteCategory(req, res, next) {
        try {
            const categoryUpdate = await Category.findOne({ _id: req.params.id });
            if (categoryUpdate) {
                const items = await Category.deleteOne({ _id: req.params.id });

                if (!items) {

                    return res.json({
                        status: 404,
                        messages: "Delete category uncessesfully!"
                    });
                } else {
                    return res.json({
                        status: 200,
                        messages: "Delete category cessesfully!",
                    });
                }
            } else {
                return res.json({
                    status: 404,
                    messages: "Delete category uncessesfully!"
                });
            }

        } catch (error) {
            res.status.json({
                status: 503,
                messages: 'Errors connect server!'
            });
        }
    }

    async storeStatus(req, res, next) {
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
            const status = await new Status(req.body);
            await status.save();

            return res.json({
                status: 200,
                messages: 'Create success!',
                data: status
            });

        } catch (error) {
            return res.json({
                status: 503,
                messages: 'Errors connect server!'
            });
        }
    }

    async getAllStatus(req, res, next) {
        try {
            const result = await Status.find({});
            if (!result) {
                return res.json({
                    status: 404,
                    messages: 'No information of status!'
                });
            } else {
                return res.status(200).json({
                    status: 200,
                    messages: 'You have a litle information of status!',
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

    async editStatus(req, res, next) {
        try {
            const items = await Status.findById(req.params.id);
            if (!items) {
                return res.json({
                    status: 404,
                    messgaes: "No information of status!"
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

    async updateStatus(req, res, next) {
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

            const statusUpdate = await Status.findOne({ _id: req.params.id });
            if (statusUpdate) {
                const items = await Status.updateOne({ _id: req.params.id }, req.body);
                if (!items) {
                    return res.json({
                        status: 404,
                        messages: "Update status uncessesfully!"
                    });
                } else {
                    return res.json({
                        status: 200,
                        messages: "Update status cessesfully!",
                        infor: items,
                        data: await Status.findById(req.params.id),
                    });
                }
            } else {
                return res.json({
                    status: 404,
                    messages: "Update category uncessesfully!"
                });
            }
        } catch (error) {
            res.json({
                status: 503,
                messages: 'Update category uncessesfully!'
            });
        }
    }

    async deleteStatus(req, res, next) {
        try {
            const statusDelete = await Status.findOne({ _id: req.params.id });
            if (statusDelete) {
                const category = await Category.updateMany({ status: req.params.id }, { status: null });
                const items = await Status.deleteOne({ _id: req.params.id });
                if (!items) {

                    return res.json({
                        status: 404,
                        messages: "Delete status uncussesfully!"
                    });
                } else {
                    return res.json({
                        status: 200,
                        messages: "Delete status cussesfully!",
                    });
                }
            } else {
                return res.json({
                    status: 404,
                    messages: "Delete status uncussesfully!"
                });
            }

        } catch (error) {
            res.json({
                status: 503,
                messages: 'Delete status uncussesfully!'
            });
        }
    }


    async storeUnit(req, res, next) {
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
            const unit = await new Unit(req.body);
            await unit.save();

            return res.json({
                status: 200,
                messages: 'Create success!',
                data: unit
            });

        } catch (error) {
            return res.json({
                status: 503,
                messages: 'Create unit unsuccessfuly!'
            });
        }
    }

    async getAllUnit(req, res, next) {
        try {
            const result = await Unit.find({}).populate('status');
            if (!result) {
                return res.json({
                    status: 404,
                    messages: 'No information of unit!',
                    data: 0
                });
            } else {
                return res.status(200).json({
                    status: 200,
                    messages: 'You have a litle information of unit!',
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

    async editUnit(req, res, next) {
        try {
            const items = await Unit.findById(req.params.id).populate('status');
            if (!items) {
                return res.json({
                    status: 404,
                    messgaes: "No information of unit!"
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

    async updateUnit(req, res, next) {
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

            const unitUpdate = await Unit.findOne({ _id: req.params.id });
            if (unitUpdate) {
                const items = await Unit.updateOne({ _id: req.params.id }, req.body);
                if (!items) {
                    return res.json({
                        status: 404,
                        messages: "Update unit uncessesfully!"
                    });
                } else {
                    return res.json({
                        status: 200,
                        messages: "Update unit cessesfully!",
                        infor: items,
                        data: await Unit.findById(req.params.id).populate('status'),
                    });
                }
            } else {
                return res.json({
                    status: 404,
                    messages: "Update unit uncessesfully!"
                });
            }
        } catch (error) {
            res.json({
                status: 503,
                messages: 'Update unit uncessesfully!'
            });
        }
    }

    async deleteUnit(req, res, next) {
        try {
            const unitDelete = await Unit.findOne({ _id: req.params.id });
            if (unitDelete) {
                const items = await Unit.deleteOne({ _id: req.params.id });

                if (!items) {

                    return res.json({
                        status: 404,
                        messages: "Delete unit uncessesfully!"
                    });
                } else {
                    return res.json({
                        status: 200,
                        messages: "Delete unit cessesfully!",
                    });
                }
            } else {
                return res.json({
                    status: 404,
                    messages: "Delete unit uncessesfully!"
                });
            }

        } catch (error) {
            res.status.json({
                status: 503,
                messages: 'Errors connect server!'
            });
        }
    }


    async storeProduct(req, res, next) {
        console.log(req.files);
        try {
            //Xử lý nhập dữ liệu:
            const errors = await mess.showValidations(400, req, res, next);
            if (!errors.isEmpty()) {
                const info = { data: errors.array(), status: 400, messages: 'Validations errors!' }
                return res.json(info);
            }

            // //Nếu không có lỗi nhập dữ liệu thì lưu dữ lệu lại.
            const formData = req.body;
            let imageProduct = [];
            if (!req.files) {
                imageProduct = [];
            } else {
                const image = req.files;
                image.map((data, index) => {
                    imageProduct.push({ nameImage: destination + data.filename });
                });
            }

            const products = await new Products({ imageProduct, ...formData });
            await products.save();

            return res.json({
                status: 200,
                messages: 'Create success!',
                data: products
            });

        } catch (error) {
            return res.json({
                status: 503,
                messages: 'Create unsuccessfully!',
                err: error
            });
        }

    }

    async getAllProduct(req, res, next) {

        const page = Math.max(0, req.params.page);
        const limit = req.params.limit;

        try {
            const count = await Products.find({});
            const result = await Products.find({})
                .limit(limit)
                .skip(limit * page)
                .sort({
                    codeProduct: 'asc'
                })
                .populate('status')
                .populate('category')
                .populate('unit');

            if (result.length <= 0) {
                return res.json({
                    status: 404,
                    messages: 'No information of products!'
                });
            } else {
                return res.status(200).json({
                    status: 200,
                    messages: 'You have a litle information of products!',
                    pagination: {
                        page: page,
                        pages: Math.ceil((count.length) / limit),
                        limit: limit
                    },
                    data: result,
                });
            }

        } catch (error) {
            res.json({
                status: 503,
                messages: 'Errors connect server!'
            });
        }
    }

    async editProduct(req, res, next) {

        try {
            const items = await Products.findById(req.params.id)
                .populate('status')
                .populate('category')
                .populate('unit');

            if (!items) {
                return res.json({
                    status: 404,
                    messgaes: "No information of product!"
                });
            } else {
                return res.json({
                    status: 200,
                    messages: "Get information successfull !",
                    data: items
                });
            }

        } catch (error) {
            res.json({
                status: 503,
                messages: 'Errors connect server!'
            });
        }
    }

    async updateProduct(req, res, next) {
        try {

            //Xử lý nhập dữ liệu:
            const errors = await mess.showValidations(400, req, res, next);
            if (!errors.isEmpty()) {
                return res.json({
                    data: errors.array(),
                    status: 400,
                    messages: 'Validations errors!'
                });
            }

            const productUpdate = await Products.findOne({ _id: req.params.id });

            if (productUpdate) {
                if (!req.files) {
                    let { ...value } = req.body;
                    const items = await Products.updateOne({ _id: req.params.id }, value);

                    if (!items) {
                        return res.json({
                            status: 404,
                            messages: "Update product uncessesfully!"
                        });
                    } else {
                        return res.json({
                            status: 200,
                            messages: "Update product cessesfully!",
                            infor: items,
                            data: await Products.findById(req.params.id)
                                .populate('status')
                                .populate('category')
                                .populate('unit'),
                        });
                    }
                } else {
                    const image = req.files;
                    let imageProduct = [];
                    let { ...value } = req.body;
                    const items = await Products.updateOne({ _id: req.params.id }, value);

                    image.map((data, index) => {
                        imageProduct.push({ nameImage: destination + data.filename });
                    });
                    await Products.updateOne({ _id: req.params.id }, { $push: { imageProduct: imageProduct } });

                    if (!items) {
                        return res.json({
                            status: 404,
                            messages: "Update product uncessesfully!"
                        });
                    } else {
                        return res.json({
                            status: 200,
                            messages: "Update product cessesfully!",
                            infor: items,
                            data: await Products.findById(req.params.id)
                                .populate('status')
                                .populate('category')
                                .populate('unit'),
                        });
                    }

                }
            } else {
                return res.json({
                    status: 404,
                    messages: "Update product uncessesfully!"
                });
            }
        } catch (error) {
            res.json({
                status: 503,
                messages: 'eror: ' + error
            });
        }
    }

    async deleteProduct(req, res, next) {
        try {
            const product = await Products.findOne({ _id: req.params.id });
            const docs = product._doc;
            if (docs) {
                //Delete images
                if (docs.imageProduct.length > 0) {
                    docs.imageProduct.map((data, index) => {
                        fs.exists('uploads' + data.nameImage, function (exists) {
                            if (exists) {
                                fs.unlinkSync('uploads' + data.nameImage);
                            }
                        });
                    });
                }

                // //Delete products
                await Products.deleteOne({ _id: docs._id });

                res.status(200).json({
                    status: 200,
                    messages: "Delete product cussesfully!",
                    data: req.params.id
                });

            } else {
                res.status(404).json({
                    status: 404,
                    messages: "Delete product uncussesfully!",
                });
            }
        } catch (error) {
            return res.status(503).json({
                status: 503,
                messages: error
            });
        }
    }

}

module.exports = new InventoryController;