// pages/pintuan/placeOrder/placeOrder.js
var API_URL = 'https://ssl.snowboy99.com/weidogs/weipintuan/public/index.php';  //服务器地址 host+url
var IMG_URL = 'https://ssl.snowboy99.com/weidogs/weipintuan/public';  // 图片
var util = require('../../../utils/util.js')
var app = getApp();
Page({
  data: {
    orderData: util.formatTime(new Date),
    windowHeight: 654,
    maxtime: "",
    isHiddenLoading: true,
    isHiddenToast: true,
    dataList: {},
    countDownHour: 0,
    countDownMinute: 0,
    countDownSecond: 0,  
  },

  // 加载完成之后 
  onLoad: function (options) {
    var that = this;

    that.setData({
      windowHeight: wx.getStorageSync('windowHeight'),  
      num: options.num,
      onePrice: options.onePrice,
      lm:options.lm, // 留言
      name:options.name,
      phone:options.phone,
      address:options.address
    })
    wx.request({
      url: API_URL + '/api/product/getProductById?prod_id=' + options.orderId,
      data: {},
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.hideLoading();
        console.log(res.data.data, 'get this info of order');
        var productInfo = res.data.data;
        // 对轮播图进行处理<默认只处理三个>
        var arr = [];
        for (var i in productInfo.prod_images) {
          var images = IMG_URL + JSON.parse(productInfo.prod_images)[0]
        }
        arr.push(images)
        arr.length = 3;
        // 设置数据
        that.setData({
          orderInfo: res.data.data,
          prod_images: arr,
          // 商品金额
          prodPrice: options.num * options.onePrice,
          // 运费
          tranPrice: productInfo.trans_price,
          // 总金额 = 单价 * 数量 + 运费
          totalPrice: options.num * options.onePrice + productInfo.trans_price
        })
      }
    })
  },

  // 页面渲染完成后 调用  
  onReady: function () {
    var totalSecond = 86400;

    var interval = setInterval(function () {
      // 秒数  
      var second = totalSecond;

      // 天数位  
      var day = Math.floor(second / 3600 / 24);
      var dayStr = day.toString();
      if (dayStr.length == 1) dayStr = '0' + dayStr;

      // 小时位  
      var hr = Math.floor((second - day * 3600 * 24) / 3600);
      var hrStr = hr.toString();
      if (hrStr.length == 1) hrStr = '0' + hrStr;

      // 分钟位  
      var min = Math.floor((second - day * 3600 * 24 - hr * 3600) / 60);
      var minStr = min.toString();
      if (minStr.length == 1) minStr = '0' + minStr;

      // 秒位  
      var sec = second - day * 3600 * 24 - hr * 3600 - min * 60;
      var secStr = sec.toString();
      if (secStr.length == 1) secStr = '0' + secStr;

      this.setData({
        countDownDay: dayStr,
        countDownHour: hrStr,
        countDownMinute: minStr,
        countDownSecond: secStr,
      });
      totalSecond--;
      if (totalSecond < 0) {
        clearInterval(interval);
        wx.showToast({
          title: '订单时间已到',
        });
        this.setData({
          countDownDay: '00',
          countDownHour: '00',
          countDownMinute: '00',
          countDownSecond: '00',
        });
      }
    }.bind(this), 1000);
  },

  //cell事件处理函数  
  bindCellViewTap: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../babyDetail/babyDetail?id=' + id
    });
  }  


})