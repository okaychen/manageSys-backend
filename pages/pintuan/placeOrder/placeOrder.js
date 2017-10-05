// pages/pintuan/placeOrder/placeOrder.js
var API_URL = 'https://ssl.snowboy99.com/weidogs/weipintuan/public/index.php';  //服务器地址 host+url
var IMG_URL = 'https://ssl.snowboy99.com/weidogs/weipintuan/public';  // 图片
var app = getApp();
Page({
  data: {
 
  },

  // 加载完成之后 
  onLoad: function (orderId) {
    var that = this;
    console.log('传递的参数是：' + orderId.id);

    wx.request({
      url: API_URL + '/api/product/getProductById?prod_id=' + orderId.id,
      data: {},
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data.data, 'get this info');
        var productInfo = res.data.data;

        // 设置数据
        that.setData({
          productInfo: res.data.data,
        })
      }
    })
  },



})