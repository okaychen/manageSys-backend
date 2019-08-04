var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var TestModel = require('../models/dbConnect.js');

router.post('/login', function (req, res, next) {
  console.log(req.body);
  var md5 = crypto.createHash('md5');
  var password = md5.update(req.body.password).digest('base64');

})

module.exports = router;