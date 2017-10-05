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
	//根据一个addr_id获取当前页面data.addrList中的某个收货地址
	getAddrById: function (addr_id) {
		let that = this;
		let addrList = that.data.addrList;
		for (let i in addrList) {
			if (addrList.hasOwnProperty(i)) {
				if (addrList[i]['id'] == addr_id) {
					return addrList[i];
				}
			}
		}
		return false;
	},
	// Tap事件触发,返回下订单页面
	selectAddress: function (e) {
		let that = this;
		let addr_id = e.currentTarget.dataset.addrId;
		let addr = that.getAddrById(addr_id);
		// 给上一页面设置数据
		let pages = getCurrentPages();
		let prevPage = pages[pages.length - 2];  //上一个页面
		//直接调用上一个页面的setData()方法，把数据存到上一个页面中去
		prevPage.setData({
			selected_address: addr
		});
		prevPage.setPayParams('addr_id', addr_id);
		wx.navigateBack({
			data: {
				delta: 1
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
		let that = this;
		//获取服务器上面的收货地址
		//加载中
		wx.showLoading({
			title: '加载中',
			mask: true
		});
		//发起请求
		wx.request({
			url: app.globalData.path_info.api + '/api/address/getAddress',
			data: {openid: app.getOpenId()},
			method: 'POST',
			success: function (resp) {
				wx.hideLoading();
				if (resp.data.status == 'success') {
					console.log('获取数据成功');
					console.log(resp.data.data);
					//当前页面
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