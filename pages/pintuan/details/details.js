var app = getApp();
var API_URL = app.globalData.path_info.api;  //服务器地址 host+url
var IMG_URL = app.globalData.path_info.path;  // 图片
var WxParse = require('../../../wxParse/wxParse.js');
var util = require('../../../utils/util.js');
var num_util = require('../../../utils/num_util.js');
Page({
	data: {
		num: 1,
		num1: 1,
		// 使用data数据对象设置样式名
		minusStatus: 'disabled',
		indicatorDots: true,
		autoplay: true,
		interval: 3000,
		duration: 1000,
		// 是否隐藏页面拼团模块
		hideTuan: true,
		// 当前时间
		orderData: util.formatTime(new Date)
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
		if (!options.group_id) {
			this.setData({
				group_id: 0
			});
		} else {
			this.setData({
				group_id: options.group_id
			});
			that.showModal2();
		}
		wx.request({
			url: API_URL + '/api/product/getProductById',
			data: {
				applet_id: app.globalData.applet_id,
				prod_id: options.id
			},
			method: 'POST',
			success: function (res) {
				wx.hideLoading();
				let productInfo = res.data.data;
				// 对轮播图进行处理
				let arr = [];
				let prod_images = JSON.parse(productInfo.prod_images);
				for (let i in prod_images) {
					let images = IMG_URL + prod_images[i];
					arr.push(images);
				}
				// 对商品详情进行处理（rich-text）
				WxParse.wxParse('article', 'html', productInfo.prod_detail, that, 5, app.globalData.Urln);
				// 判断是否存在正在进行的拼团
				if (productInfo.groups[0] == null) {
					that.setData({
						hideTuan: true
					});
				} else {
					that.setData({
						hideTuan: false
					});
				}
				//取出拼团列表
				let groups = productInfo.groups;
				//修改拼团对象,添加参数
				for (let i in groups) {
					if (groups.hasOwnProperty(i)) {
						let group = groups[i];
						group['time_out'] = num_util.getTimeOut(group.create_time);
						groups[i] = group;
					}
				}
				//赋值替换回去
				productInfo.groups = groups;
				// 给页面设置数据
				that.setData({
					productInfo: productInfo, // 传到detail页面的所有数据，包括下面的几条
					prod_images: arr,  // images数组，轮播图
					single_price: productInfo.prod_single_price, // 单独购买单价
					group_price: productInfo.prod_group_price, // 拼团购买单价
					orderId: productInfo.id  // 对应商品的id，传入订单页面
				});
				
			}
		});
	},
	redirectToJoinGroup: function (e) {
		let that = this;
		let group_id = e.currentTarget.dataset.groupId;
		wx.setStorageSync('selected_group_info', {
			group_id: group_id,
			productInfo: that.data.productInfo
		});
		wx.redirectTo({
			url: '../JoinGroup/JoinGroup'
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
	},
	onShareAppMessage: function (e) {
		let that = this;
		return {
			title: '微拼团-' + that.data.productInfo.prod_name,
			success: function () {
				wx.showToast({
					title: '转发成功'
				});
			}
		};
	}
	
});