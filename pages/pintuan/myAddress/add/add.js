// pages/user/minTuan/myAddress/add/add.js
let app = getApp();
Page({
	
	/**
	 * 页面的初始数据
	 */
	data: {},
	
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
	
	},
	showDetail: function (e) {
		let that = this;
		let addrId = e.currentTarget.dataset.addrId;
		wx.navigateTo({
			url: '../newAddress/newAddress?addr_id=' + addrId
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
		let that = this;
		//获取服务器上面的收货地址
		//加载中
		wx.showLoading({
			title: '加载中',
			mask: true
		});
		//发起请求
		wx.request({
			url: app.globalData.api.base_domain + app.globalData.api.path_info + '/api/address/getAddress',
			data: {openid: app.getOpenId()},
			method: 'POST',
			success: function (resp) {
				wx.hideLoading();
				if (resp.data.status == 'success') {
					console.log('获取数据成功');
					console.log(resp.data.data);
					that.setData({
						addrList: resp.data.data
					});
				} else {
					wx.showModal({
						title: '错误',
						content: resp.data.msg,
						showCancel: false
					});
				}
			},
			fail: function (resp) {
				wx.hideLoading();
				wx.showToast({
					title: '获取信息失败',
					duration: 2000
				});
			}
		});
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