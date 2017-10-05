// pages/pintuan/placeOrder/placeOrder.js
var API_URL = 'https://ssl.snowboy99.com/weidogs/weipintuan/public/index.php';  //服务器地址 host+url
var IMG_URL = 'https://ssl.snowboy99.com/weidogs/weipintuan/public';  // 图片
var app = getApp();
Page({
  data: {
    leaveMessage:'',
    selectAddress:''
  },
  // 选择地址
  selectAddress:function(e){
    this.setData({
      selectAddress:e.detail.value
    })
  },
  // 留言
  leaveMessage:function(e){
    this.setData({
      leaveMessage:e.detail.value
    })
  },
  firmOrder:function(e){
    console.log(this.data.leaveMessage)
    console.log(this.data.selectAddress)
    if (this.data.selectAddress == '') {
     
    }
  },
  // 加载完成之后 
  onLoad: function (options) {
    var that = this;

    console.log('orderId：' + options.orderId +';数量'+ options.num +';单价'+options.onePrice);
    that.setData({
      num:options.num,
      onePrice:options.onePrice
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
          orderId: productInfo.id,  // 对应商品的id，传入最后的订单页面
          // 总金额 = 单价 * 数量 + 运费
          totalPrice: options.num * options.onePrice + productInfo.trans_price
        })
      }
    })
  },



})