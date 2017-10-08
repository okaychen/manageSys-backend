// pages/pintuan/placeOrder/placeOrder.js
var app = getApp();
var API_URL = app.globalData.path_info.api;  //服务器地址 host+url
var IMG_URL = app.globalData.path_info.path;  // 图片
Page({
	data: {
		leaveMessage: '',
		pay_params: {
			openid: app.getOpenId()
		}
	},
	/**
	 * 设置支付参数的快捷方法
	 * @param key
	 * @param val
	 */
	setPayParams: function (key, val) {
		let that = this;
		let pay_params = that.data.pay_params;
		pay_params[key] = val;
		that.setData({
			pay_params: pay_params
		});
	},
	// 留言
	leaveMessage: function (e) {
		this.setData({
			leaveMessage: e.detail.value
		});
		this.setPayParams('note', e.detail.value);
	},
//	firmOrder: function (e) {
//		console.log(this.data.leaveMessage);
//	},
	// 加载完成之后
	onLoad: function (options) {
		var that = this;
		console.log(options);
		that.setData({
			num: options.num,
			onePrice: options.onePrice
		});
		//给支付订单API准备数据
		that.setPayParams('product_id', options.product_id);
		that.setPayParams('product_num', options.num);
		that.setPayParams('purchase_method', options.purchase_method);
		that.setPayParams('group_id', options.group_id);
		wx.request({
			url: API_URL + '/api/product/getProductById',
			data: {
				applet_id: app.globalData.applet_id,
				prod_id:options.orderId
			},
			method: 'POST',
			success: function (res) {
				wx.hideLoading();
				console.log(res.data.data, 'get this info of order');
				var productInfo = res.data.data;
				// 对轮播图进行处理<默认只处理三个>
				var arr = [];
				for (var i in productInfo.prod_images) {
					var images = IMG_URL + JSON.parse(productInfo.prod_images)[0];
				}
				arr.push(images);
				arr.length = 3;
				// 设置数据
				let totalPrice = options.num * options.onePrice + productInfo.trans_price;
				that.setData({
					orderInfo: res.data.data,
					prod_images: arr,
					orderId: productInfo.id,  // 对应商品的id，传入最后的订单页面
					// 总金额 = 单价 * 数量 + 运费
					totalPrice: totalPrice
				});
				//给支付订单API准备数据
				that.setPayParams('pay_count', totalPrice);
			}
		});
	},
	selectAddress: function () {
		let that = this;
		wx.chooseAddress({
			success: function (res) {
				console.clear();
				console.log(res);
				that.setData({
					is_select_address: true,
					address:res
				});
			}
		});
	},
	//提交订单啦!!!
	submitOrder: function () {
		wx.showLoading({
			title:'加载中',
			mask:1
		});
		let that = this;
		console.log(that.data.pay_params);
		let pay_params=that.data.pay_params;
		pay_params['address']=JSON.stringify(that.data.address);
		pay_params['applet_id']=app.globalData.applet_id;
		wx.request({
			url: app.globalData.path_info.api + '/api/pay/unifiedOrder',
			data: pay_params,
			method: 'POST',
			success: function (resp) {
				console.log('成功');
				console.log(resp);
				if (resp.data.status == 'success') {
					let payObj = resp.data.data;
					payObj.success = function (resp2) {
						wx.showModal({
							title: '成功',
							content: '支付成功',
							showCancel: 0,
							success: function (res) {
								if (res.confirm) {
									console.log('用户点击确定');
									//跳转到订单详情页面
									wx.redirectTo({
										url: '../../user/minTuan/myOrder/myOrder'
									});
								}
							}
						});
					};
					payObj.fail = function (resp2) {
						console.log('支付方法调用失败,错误信息如下');
						console.log(resp2);
					};
					wx.requestPayment(payObj);
				} else {
					wx.showModal({
						title: '错误',
						content: resp.data.msg,
						showCancel: 0
					});
				}
			},
			fail: function (resp) {
				wx.showModal({
					title: '错误',
					content: '下单请求失败,请稍后重试',
					showCancel: 0,
					success: function (res) {
						//处理一下
					}
				});
			},
			complete:function () {
				wx.hideLoading();
			}
		});
	}
});

