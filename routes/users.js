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

router.post('/login', function (req, res, next) {
	var md5 = crypto.createHash('md5');
	var username = req.body.username;
	var password = md5.update(req.body.password).digest('base64');

	AdminModel.findOne({
		username
	}, function (err, data) {
		console.log(data)
		if (err) return err
		if (username == '' || password == '') {
			resDate.code = 0;
			resDate.message = '用户名或密码不能为空';
			res.json(resDate);
		} else if (!data) {
			resDate.code = -1;
			resDate.message = '用户尚未注册';
			res.json(resDate);
		} else if (data.password !== password) {
			resDate.code = -2;
			resDate.message = '密码输入错误';
			res.json(resDate);
		} else if (data.username == username && data.password == password) {
			resDate.code = 1;
			resDate.message = '登录成功';
			resDate.userInfo = {
				_id: data._id,
				username: data.username
			}
			res.json(resDate);
		}
	})
})

router.post('/register', function (req, res, next) {
	var md5 = crypto.createHash('md5');
	var username = req.body.username;
	var password = md5.update(req.body.password).digest('base64');
	var userInfo = new AdminModel({
		username: username,
		password: password
	})

	if (username == '' || password == '' || req.body.re_password == '') {
		resDate.code = 0;
		resDate.message = '用户名或密码不能为空';
		res.json(resDate);
	} else if (req.body.password === req.body.re_password) {
		AdminModel.findOne({
			username
		}, function (err, data) {
			if (err) return err;
			if (data !== null) {
				resDate.code = -3;
				resDate.message = '该用户已被注册';
				res.json(resDate);
			} else {
				userInfo.save(function (err, data) {
					if (err) return err;
					resDate.code = 2;
					resDate.message = '注册成功';
					res.json(resDate);
				})
			}
		})
	} else {
		resDate.code = -4;
		resDate.message = '两次密码输入不一致';
		res.json(resDate);
	}
})

module.exports = router;