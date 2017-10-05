var app = getApp();
var API_URL = app.globalData.path_info.api;  //服务器地址 host+url
var IMG_URL = app.globalData.path_info.path;  // 图片
var WxParse = require('../../../wxParse/wxParse.js');
Page({
	data: {
		num: 1,
		num1: 1,
		// 使用data数据对象设置样式名
		minusStatus: 'disabled',
		indicatorDots: true,
		autoplay: true,
		interval: 3000,
		duration: 1000
	},
	
	
	/* 点击减号 */
	bindMinus1: function () {
		var num1 = this.data.num1;
		// 如果大于1时，才可以减
		if (num1 > 1) {
			num1--;
		}
		// 只有大于一件的时候，才能normal状态，否则disable状态
		var minusStatus1 = num1 <= 1 ? 'disabled' : 'normal';
		// 将数值与状态写回
		this.setData({
			num1: num1,
			minusStatus1: minusStatus1
		});
	},
	/* 点击加号 */
	bindPlus1: function () {
		var num1 = this.data.num1;
		// 不作过多考虑自增1
		num1++;
		// 只有大于一件的时候，才能normal状态，否则disable状态
		var minusStatus1 = num1 < 1 ? 'disabled' : 'normal';
		// 将数值与状态写回
		this.setData({
			num1: num1,
			minusStatus1: minusStatus1
		});
	},
	/* 输入框事件 */
	bindManual1: function (e) {
		var num1 = e.detail.value1;
		// 将数值与状态写回
		this.setData({
			num1: num1
		});
	},
	
	/* 一人团 */
	bindMinus: function () {
		var num = this.data.num;
		if (num > 1) {
			num--;
		}
		var minusStatus = num <= 1 ? 'disabled' : 'normal';
		this.setData({
			num: num,
			minusStatus: minusStatus
		});
	},
	bindPlus: function () {
		var num = this.data.num;
		num++;
		var minusStatus = num < 1 ? 'disabled' : 'normal';
		this.setData({
			num: num,
			minusStatus: minusStatus
		});
	},
	bindManual: function (e) {
		var num = e.detail.value;
		this.setData({
			num: num
		});
	},
	
	// 加载完成之后
	onLoad: function (options) {
		var that = this;
		console.log('传递的参数是：' + options.id);
		if (!options.group_id){
			this.setData({
				group_id:0
			})
		}else{
			this.setData({
				group_id:options.group_id
			})
		}
		wx.request({
			url: API_URL + '/api/product/getProductById?prod_id=' + options.id,
			data: {},
			method: 'GET',
			header: {
				'content-type': 'application/json'
			},
			success: function (res) {
				console.log(res.data.data, 'get this info');
				var productInfo = res.data.data;
				// 对轮播图进行处理<默认只处理三个>
				var arr = [];
				for (var i in productInfo.prod_images) {
					var images = IMG_URL + JSON.parse(productInfo.prod_images)[0];
				}
				arr.push(images);
				arr.length = 3;
				// 对商品详情进行处理
				WxParse.wxParse('article', 'html', productInfo.prod_detail, that, 5);
				
				// 设置数据
				that.setData({
					productInfo: res.data.data, // 传到detail页面的所有数据，包括下面的几条
					prod_images: arr,  // images数组，轮播图
					single_price: productInfo.prod_single_price, // 单独购买单价
					group_price: productInfo.prod_group_price, // 拼团购买单价
					orderId: productInfo.id  // 对应商品的id，传入订单页面
				});
				
			}
		});
	},
	
	// 自定义底部弹出层
	showModal1: function () {
		// 显示遮罩层
		var animation = wx.createAnimation({
			duration: 200,
			timingFunction: "linear",
			delay: 0
		});
		this.animation = animation;
		animation.translateY(300).step();
		this.setData({
			animationData1: animation.export(),
			showModalStatus1: true
		});
		setTimeout(function () {
			animation.translateY(0).step();
			this.setData({
				animationData1: animation.export()
			});
		}.bind(this), 200);
	},
	hideModal1: function () {
		// 隐藏遮罩层
		var animation = wx.createAnimation({
			duration: 200,
			timingFunction: "linear",
			delay: 0
		});
		this.animation = animation;
		animation.translateY(300).step();
		this.setData({
			animationData1: animation.export()
		});
		setTimeout(function () {
			animation.translateY(0).step();
			this.setData({
				animationData1: animation.export(),
				showModalStatus1: false
			});
		}.bind(this), 200);
	},
	
	showModal2: function () {
		// 显示遮罩层
		var animation = wx.createAnimation({
			duration: 200,
			timingFunction: "linear",
			delay: 0
		});
		this.animation = animation;
		animation.translateY(300).step();
		this.setData({
			animationData2: animation.export(),
			showModalStatus2: true
		});
		setTimeout(function () {
			animation.translateY(0).step();
			this.setData({
				animationData2: animation.export()
			});
		}.bind(this), 200);
	},
	hideModal2: function () {
		// 隐藏遮罩层
		var animation = wx.createAnimation({
			duration: 200,
			timingFunction: "linear",
			delay: 0
		});
		this.animation = animation;
		animation.translateY(300).step();
		this.setData({
			animationData2: animation.export()
		});
		setTimeout(function () {
			animation.translateY(0).step();
			this.setData({
				animationData2: animation.export(),
				showModalStatus2: false
			});
		}.bind(this), 200);
	}
	
});