//app.js
App({
	onLaunch: function () {
		//调用API从本地缓存中获取数据
		var logs = wx.getStorageSync('logs') || [];
		logs.unshift(Date.now());
		wx.setStorageSync('logs', logs);
		//进入的时候,如果openid不存在,则进行获取
		if (!wx.getStorageSync('openid')) {
			this.requestOpenId();
		}
	},
	
	
	getUserInfo: function (cb) {
		var that = this;
		if (this.globalData.userInfo) {
			typeof cb == "function" && cb(this.globalData.userInfo);
		} else {
			//调用登录接口
			wx.getUserInfo({
				withCredentials: false,
				success: function (res) {
					that.globalData.userInfo = res.userInfo;
					typeof cb == "function" && cb(that.globalData.userInfo);
				}
			});
		}
	},
	
	globalData: {
		userInfo: null,
		api: {
			base_domain: 'https://ssl.snowboy99.com',
			path_info: '/weidogs/weipintuan/public/index.php'
		}
	},
	
	
	/**
	 * |||||||
	 * Jeffrey
	 * |||||||
	 */
	//登录并缓存code
	requestOpenId: function (e) {
		const that = this;
		console.log('调用了登录');
		wx.login({
			success: function (resp) {
				console.log('js_code是：' + resp.code);
				wx.setStorageSync('js_code', resp.code);
				wx.request({
					url: that.globalData.api.base_domain+that.globalData.api.path_info+'/api/applet/getOpenIdByCode',
					data: {
						js_code: wx.getStorageSync('js_code')
					},
					method: 'POST',
					success: function (resp) {
						wx.setStorageSync('openid', resp.data.data.openid);
					}, fail: function (resp) {
						console.log('requestOpenId fail');
					}
				});
			}, fail: function () {
				console.log('login error');
			}
		});
	},
	//全局获取openid的方法
	getOpenId: function () {
		return wx.getStorageSync('openid');
	}
	
});
