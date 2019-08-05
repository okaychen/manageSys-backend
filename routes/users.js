var express = require('express');
var router = express.Router();
var AdminModel = require('../models/admin')
var crypto = require('crypto');

// 定义返回变量格式
var resDate;
router.use(function (req, res, next) {
  resDate = {
    code: 0,
    message: ''
  };
  next();
})

AdminModel.find({}, function (doc) {
  console.log(doc)
})

router.post('/login', function (req, res, next) {
  var md5 = crypto.createHash('md5');
  var password = md5.update(req.body.password).digest('base64');

  console.log(req.body)



})

module.exports = router;