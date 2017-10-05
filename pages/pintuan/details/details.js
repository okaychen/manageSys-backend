var API_URL = 'https://ssl.snowboy99.com/weidogs/weipintuan/public/index.php';  //服务器地址 host+url
var IMG_URL = 'https://ssl.snowboy99.com/weidogs/weipintuan/public';  // 图片
var WxParse = require('../../../wxParse/wxParse.js');
var app = getApp();
Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000
  },

  onLoad: function (options) {
    var that = this;
    console.log('传递的参数是：' + options.id);

    // wx.request({
    //   url: API_URL + '/api/product/getProductById?prod_id=' + options.id,
    //   method: 'GET',
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   success: function (res) {
    //     console.log('路由传递api '+res.data.data)
    //   }
    // })
    
    //----------------------------- 
    // product con<商品>
    //----------------------------- 
    wx.request({
      url: API_URL + '/api/product/getProductById?prod_id=' + options.id,
      data: {},
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data.data, 'get this info');
        var productInfo = res.data.data;
        // 对轮播图进行处理
        var arr=[];
        for(var i in productInfo.prod_images){
         var images = IMG_URL + JSON.parse(productInfo.prod_images)[0]
        }
        arr.push(images)
        arr.length = 3;
        // 对商品详情进行处理
        WxParse.wxParse('article', 'html', productInfo.prod_detail, that, 5);

        // 设置数据
        that.setData({
          productInfo:res.data.data,
          prod_images:arr
        })
      }
    })
  },

  showModal1: function () {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData1: animation.export(),
      showModalStatus1: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData1: animation.export()
      })
    }.bind(this), 200)
  },
  hideModal1: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData1: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData1: animation.export(),
        showModalStatus1: false
      })
    }.bind(this), 200)
  },

  showModal2: function () {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData2: animation.export(),
      showModalStatus2: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData2: animation.export()
      })
    }.bind(this), 200)
  },
  hideModal2: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData2: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData2: animation.export(),
        showModalStatus2: false
      })
    }.bind(this), 200)
  }



})