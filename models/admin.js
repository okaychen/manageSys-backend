var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var adminSchema = new Schema({
    '_id': Number,
    'username': String,
    'password': String,
    'phone': Number,
    'email': String
})

adminSchema.index({
    _id: 1
})

var Admin = mongoose.model('Admin', adminSchema, 'user'); // 'user'--模型会在user内查找数据集合

module.exports = Admin;