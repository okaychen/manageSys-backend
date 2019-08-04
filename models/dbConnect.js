var mongoose = require('mongoose');
var DB = mongoose.connect('mongodb://localhost:27017/managesys');

mongoose.connection.on("open", function () {
    console.log('数据库链接成功');
})

mongoose.connection.on("error", function (error) {
    console.log('数据库连接失败');
})

// 创建数据文档模板
var mainSchema = new mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    phone: {
        type: Number
    },
    email: {
        type: String
    }
});

module.exports = mongoose.model('mianModel', mainSchema)