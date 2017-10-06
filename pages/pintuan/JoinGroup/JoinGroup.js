// pages/pintuan/JoinGroup/JoinGroup.js
let app = getApp();
Page({
	
	/**
	 * 页面的初始数据
	 */
	data: {},
	
	getGroupBuGroupId: function (group_id) {
		let that = this;
		let groups = that.data.productInfo.groups;
		for (let i in groups) {
			if (groups.hasOwnProperty(i)) {
				let group = groups[i];
				if (group['id'] == group_id) {
					return group;
				}
			}
		}
		return false;
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function () {
		//清空控制台
		console.clear();
		let that = this;
		//获取缓存中的selected_group_info
		let selected_group_info = wx.getStorageSync('selected_group_info');
		let productInfo = selected_group_info.productInfo;
		//解析轮播图
		let prod_images = JSON.parse(productInfo.prod_images);
		//轮播图添加前缀
		for (let i in prod_images) {
			let prod_image = prod_images[i];
			prod_image = app.globalData.path_info.path + prod_image;
			prod_images[i] = prod_image;
		}
		productInfo.prod_images = prod_images;
		that.setData({
			group_id: selected_group_info.group_id,
			productInfo: productInfo
		});
		let group = that.getGroupBuGroupId(selected_group_info.group_id);
		that.setData({
			group: group
		});
		console.log(that.data, '这是当前页面的data集合');
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