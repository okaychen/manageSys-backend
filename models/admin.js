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

var Admin = mongoose.model('Admin', adminSchema, 'user');
// 'user'参数--模型会在use集合内查找数据集合,若不指定则按照前者的复数查找

module.exports = Admin;