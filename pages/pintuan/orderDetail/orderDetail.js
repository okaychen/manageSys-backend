// pages/pintuan/placeOrder/placeOrder.js
var app = getApp();
var API_URL = app.globalData.path_info.api;  //服务器地址 host+url
var IMG_URL = app.globalData.path_info.path;  // 图片
var util = require('../../../utils/util.js');
Page({
	data: {
		orderData: util.formatTime(new Date),
		windowHeight: 654,
		maxtime: "",
		isHiddenLoading: true,
		isHiddenToast: true,
		dataList: {},
		countDownHour: 0,
		countDownMinute: 0,
		countDownSecond: 0,
		time_is_ok: false
	},
	// 加载完成之后
	onLoad: function (options) {
		let that = this;
		let order = wx.getStorageSync('selected_order');
		order.pay_time_str = new Date(parseInt(order.pay_time) * 1000).toLocaleString();
		order.address=JSON.parse(order.address);
		console.log(order);
		that.setData({
			order: order
		});
	},
	
	// 页面渲染完成后 调用
	onReady: function () {
		let that = this;
		let order = this.data.order;
		if (order.purchase_method == 'group' && order.group_id!=0) {
			let current_time = parseInt(Date.parse(new Date()) / 1000);
			let totalSecond = 86400 - ( current_time - parseInt(order.get_group.create_time));
			console.log(current_time);
			console.log(parseInt(order.get_group.create_time));
			if (totalSecond < 0) {//结束
				this.setData({
					time_is_ok: true
				});
			} else {
				var interval = setInterval(function () {
					// 秒数
					var second = totalSecond;
					
					// 天数位
					var day = Math.floor(second / 3600 / 24);
					var dayStr = day.toString();
					if (dayStr.length == 1) dayStr = '0' + dayStr;
					
					// 小时位
					var hr = Math.floor((second - day * 3600 * 24) / 3600);
					var hrStr = hr.toString();
					if (hrStr.length == 1) hrStr = '0' + hrStr;
					
					// 分钟位
					var min = Math.floor((second - day * 3600 * 24 - hr * 3600) / 60);
					var minStr = min.toString();
					if (minStr.length == 1) minStr = '0' + minStr;
					
					// 秒位
					var sec = second - day * 3600 * 24 - hr * 3600 - min * 60;
					var secStr = sec.toString();
					if (secStr.length == 1) secStr = '0' + secStr;
					
					this.setData({
						countDownDay: dayStr,
						countDownHour: hrStr,
						countDownMinute: minStr,
						countDownSecond: secStr
					});
					totalSecond--;
				}.bind(this), 1000);
			}
		}
		
	}
	
});

