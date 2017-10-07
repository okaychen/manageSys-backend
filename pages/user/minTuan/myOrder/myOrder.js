// pages/user/minTuan/myOrder/myOrder.js
let app = getApp();
Page({
	
	/**
	 * 页面的初始数据
	 */
	data: {
		have_order: false
	},
	getOrder: function (orderId) {
		let that = this;
		let orders = that.data.orders;
		for (let i in orders) {
			if (orders.hasOwnProperty(i)) {
				let order = orders[i];
				if (order['id'] == orderId) {
					return order;
				}
			}
		}
		return false;
	},
	showOrder: function (e) {
		let that = this;
		let orderId = e.currentTarget.dataset.orderId;
		let order = that.getOrder(orderId);
		wx.setStorageSync('selected_order', order);
		console.log(order);
		wx.navigateTo({
			url: '../../../pintuan/orderDetail/orderDetail'
		});
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let that = this;
		//加载中
		wx.showLoading({
			title: '加载中',
			mask: 1
		});
		//请求数据
		wx.request({
			url: app.globalData.path_info.api + '/api/order/getOrdersByOpenId',
			data: {
				applet_id:app.globalData.applet_id,
				openid: app.getOpenId()
			},
			method: 'POST',
			success: function (resp) {
				if (resp.data.status == 'success') {
					let orders = resp.data.data;
					if (orders.length != 0) {
						that.setData({
							have_order: true
						});
						for (let i in orders) {
							if (orders.hasOwnProperty(i)) {
								let order = orders[i];
								let prod_images = JSON.parse(order.product.prod_images);
								order.first_image = app.globalData.path_info.path + prod_images[0];
								orders[i] = order;
							}
						}
						that.setData({
							orders: orders
						});
						console.log(orders);
						
					}
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
					content: '请求失败',
					showCancel: 0
				});
			},
			complete: function () {
				wx.hideLoading();
			}
		});
	},
	
	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {
	
	},
	
	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
	
	},
	
	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {
	
	},
	
	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {
	
	},
	
	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {
	
	},
	
	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {
	
	},
	
	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {
	
	}
});