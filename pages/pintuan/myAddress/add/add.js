// pages/user/minTuan/myAddress/add/add.js
let app = getApp();
Page({
	
	/**
	 * 页面的初始数据
	 */
	data: {
    is_select:true
  },
	
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
   
	},

  // 返回下订单页面
  pageBack:function(){
    wx.navigateBack({
      data:{
        delta: 1  // 为1返回上一页面
      }
    })
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

          // 给上一页面设置数据
          var pages = getCurrentPages();
          var currPage = pages[pages.length - 1];   //当前页面
          var prevPage = pages[pages.length - 2];  //上一个页面

          //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
          prevPage.setData({
            mydata: {
              name: resp.data.data[0].name,
              phone: resp.data.data[0].phone,
              address: resp.data.data[0].shipping_address,
            }
          })
          
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