/**
 * Created by Yi on 2017/5/8.
 */

//testDB Model

//创建 mongodb数据库连接

var mongoose = require('mongoose');
var DB = mongoose.connect('mongodb://localhost:27017/managesys'); //红色为数据库名

//
mongoose.connection.on("open", function () {
    console.log("数据库连接成功");
});

//
mongoose.connection.on("error", function (error) {
    console.log("数据库连接失败" + error);
});

//创建数据文档模板【在SQL数据库中 即一个表（列名字段等） NoSQL数据库中即数据文档（成员变量名）】
var testSchema = new mongoose.Schema({
    SortID: {
        type: String
    },
    Name: {
        type: String
    },
    Sex: {
        type: String
    },
    Address: {
        type: String
    },
    timeDate: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('TestModel', testSchema);