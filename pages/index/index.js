// //index.js
// //获取应用实例
// var app = getApp()
// Page({
//   data: {
//     motto: 'Hello World',
//     userInfo: {}
//   },
//   //事件处理函数
//   bindViewTap: function() {
//     wx.navigateTo({
//       url: '../logs/logs'
//     })
//   },
//   onLoad: function () {
//     console.log('onLoad')
//     var that = this
//     //调用应用实例的方法获取全局数据
//     app.getUserInfo(function(userInfo){
//       //更新数据
//       that.setData({
//         userInfo:userInfo
//       })
//     })
//   }
// })

var app = getApp();
Page({
  data: {

  },
  onLoad: function () {
    var that = this;
    console.log('onLoad')
    wx.request({
      //上线接口地址要是https测试可以使用http接口方式
      url: 'https://ssl.snowboy99.com/weidogs/weipintuan/public/index.php/api/category/categoryList',
      data: {},
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({ goodslist: res.data.data });
        console.log(res.data.data, 1111111);
      },

    })
  },
})