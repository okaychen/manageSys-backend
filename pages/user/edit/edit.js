//index.js
//获取应用实例
let app = getApp();
Page({
	data: {
		motto: 'Hello World',
		items: [
			{name: '男', value: '1', checked: 'true'},
			{name: '女', value: '0'}
		],
		//表单要提交的数据
		form_data: {
			openid: app.getOpenId()//初始化一个openid
		}
	},
	
	formSubmit: function () {
		let that = this;
		//加载中
		wx.showLoading({
			title: '正在提交',
			mask: true
		});
		//发起请求
		let form_data=that.data.form_data;
		form_data['applet_id']=app.globalData.applet_id;
		wx.request({
			url: app.globalData.path_info.api+ '/api/user/setUser',
			data: form_data,
			method: 'POST',
			success: function (resp) {
				wx.hideLoading();
				if (resp.data.status == 'success') {
					wx.showToast({
						title: '更新成功',
						icon: 'success',
						duration: 2000
					});
				} else {
					wx.showToast({
						title: '更新失败',
						duration: 2000
					});
					console.log('更新失败');
					console.log(resp);
				}
			},
			fail: function (resp) {
				wx.hideLoading();
				wx.showToast({
					title: '更新失败',
					duration: 2000
				});
			}
		});
	},
	
	
	onLoad: function () {
		console.log('onLoad');
		let that = this;
		//调用应用实例的方法获取全局数据
		app.getUserInfo(function (userInfo) {
			//更新数据
			that.setData({
				userInfo: userInfo
			});
			let form_data=that.data.form_data;
			form_data['user_img']=userInfo.avatarUrl;
			that.setData({
				form_data: form_data
			});
		});
		//获取服务器上面的用户数据
		//加载中
		wx.showLoading({
			title: '加载中',
			mask: true
		});
		//发起请求
		let form_data=that.data.form_data;
		form_data['applet_id']=app.globalData.applet_id;
		wx.request({
			url: app.globalData.path_info.api + '/api/user/setUser',
			data: form_data,
			method: 'POST',
			success: function (resp) {
				wx.hideLoading();
				if (resp.data.status == 'success') {
					console.log('获取数据成功');
					console.log(resp.data.data);
					that.setData({
						form_data: resp.data.data
					});
				} else {
					console.log('获取失败');
					console.log(resp);
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
	}
});
