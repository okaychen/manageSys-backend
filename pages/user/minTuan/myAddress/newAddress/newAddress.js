// pages/user/minTuan/myAddress/newAddress/newAddress.js
let app = getApp();
Page({
	
	/**
	 * 页面的初始数据
	 */
	data: {
		form_data: {
			openid: app.getOpenId()
		}
	},
	
	/**
	 * 通用表单数据处理器
	 * @param e 事件
	 */
	formInput: function (e) {
		//获取到key
		let key = e.currentTarget.dataset.key;
		//获取到value
		let value = e.detail.value;
		//获取当前的form_data
		let form_data = this.data.form_data;
		//更新
		form_data[key] = value;
		//设置回去
		this.setData({
			form_data: form_data
		});
		//打印debug
		console.log(this.data.form_data);
	},
	submitForm: function () {
		let that = this;
		//加载中
		wx.showLoading({
			title: '正在保存',
			mask: true
		});
		//发起请求
		wx.request({
			url: app.globalData.api.base_domain + app.globalData.api.path_info + '/api/address/addAddress',
			method: 'POST',
			data: this.data.form_data,
			success: function (resp) {
				wx.hideLoading();
				if (resp.data.status == 'success') {
					wx.showToast({
						title: '添加成功',
						complete: function () {
							setTimeout(function () {
								// 删除完成之后所进行的操作,例如跳转到地址列表
								wx.navigateBack({
									delta:1
								});
							}, 2000);
						}
					});
				} else {
					wx.showModal({
						title: '错误',
						content: resp.data.msg,
						showCancel: false
					});
					console.log('添加失败');
					console.log(resp);
				}
			},
			fail: function (resp) {
				wx.hideLoading();
				wx.showToast({
					title: '添加失败',
					duration: 2000
				});
			}
		});
	},
	editAddress: function () {
		let that = this;
		//加载中
		wx.showLoading({
			title: '加载中',
			mask: true
		});
		//发起请求
		wx.request({
			url: app.globalData.api.base_domain + app.globalData.api.path_info + '/api/address/addAddress',
			method: 'POST',
			data: this.data.form_data,
			success: function (resp) {
				wx.hideLoading();
				if (resp.data.status == 'success') {
					console.log('添加成功');
					console.log(resp);
					// 添加完成之后所进行的操作,例如跳转到地址列表
					wx.showToast({
						title: '修改成功',
						mask: 1,
						complete: function () {
							setTimeout(function () {
								wx.navigateBack({
									delta:1
								});
							}, 2000);
						}
					});
				} else {
					wx.showModal({
						title: '错误',
						content: resp.data.msg,
						showCancel: false
					});
					console.log('添加失败');
					console.log(resp);
				}
			},
			fail: function (resp) {
				wx.hideLoading();
				wx.showToast({
					title: '添加失败',
					duration: 2000
				});
			}
		});
	},
	delAddress: function () {
		let that = this;
		wx.showModal({
			title: '删除',
			content: '确认删除吗？',
			success: function (res) {
				if (res.confirm) {
					//加载中
					wx.showLoading({
						title: '加载中',
						mask: true
					});
					//发起请求
					wx.request({
						url: app.globalData.api.base_domain + app.globalData.api.path_info + '/api/address/delAddress',
						method: 'POST',
						data: {openid: app.getOpenId(), addr_id: that.data.address.id},
						success: function (resp) {
							wx.hideLoading();
							if (resp.data.status == 'success') {
								wx.showToast({
									title: '删除成功',
									complete: function () {
										setTimeout(function () {
											// 删除完成之后所进行的操作,例如跳转到地址列表
											wx.navigateBack({
												delta:1
											});
										}, 2000);
									}
								});
							} else {
								wx.showModal({
									title: '错误',
									content: resp.data.msg,
									showCancel: false
								});
								console.log('删除失败');
								console.log(resp);
							}
						},
						fail: function (resp) {
							wx.hideLoading();
							wx.showToast({
								title: '删除失败',
								duration: 2000
							});
						}
					});
				} else if (res.cancel) {
					console.log('用户点击取消');
				}
			}
		});
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let that = this;
		let addr_id = options.addr_id;
		if (!addr_id) {//如果不是编辑
			that.setData({
				update: false
			});
			return true;
		} else {//如果是编辑
			that.setData({
				update: true
			});
		}
		//发起请求获取要编辑的地址
		wx.request({
			url: app.globalData.api.base_domain + app.globalData.api.path_info + '/api/address/getAddress',
			data: {addr_id: addr_id, openid: app.getOpenId()},//带上参数addr_id去获取单独的一条而不是列表
			method: 'POST',
			success: function (resp) {
				wx.hideLoading();
				if (resp.data.status == 'success') {
					let form_data = resp.data.data;
					form_data['openid'] = app.getOpenId();
					form_data['addr_id'] = form_data['id'];
					that.setData({
						address: resp.data.data,
						form_data: form_data
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
				wx.showModal({
					title: '错误',
					content: '请稍后重试',
					showCancel: false
				});
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