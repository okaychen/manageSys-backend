//app.js
let base_domain = 'https://ssl.snowboy99.com';
let api_path = '/weidogs/weipintuan/public/index.php';
let server_root = '/weidogs/weipintuan/public';
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
		path_info: {
			domain: base_domain,
			api: base_domain + api_path,
			path: base_domain + server_root
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
					url: that.globalData.path_info.api + '/api/applet/getOpenIdByCode',
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
