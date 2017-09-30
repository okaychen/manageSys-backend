//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    items: [
      { name: '男', value: '男', checked: 'true' },
      { name: '女', value: '女'}
    ]
  },


  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },

  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })


  }
})
