var API_URL = 'https://ssl.snowboy99.com/weidogs/weipintuan/public/index.php';  //服务器地址 host+url
var IMG_URL = 'https://ssl.snowboy99.com/weidogs/weipintuan/public';  // 图片
var app = getApp();
Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000
  },

  onLoad:function(){
    var that = this;
    console.log('onLoad');

    //----------------------------- 
    // product con<商品>
    //----------------------------- 
    wx.request({
      url: API_URL + '/api/product/productList?offset=0&limit=7',
      data: {},
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data.data, 'product data acquisition success');
        // 分离出无分类的数据<待做处理>
        var product = res.data.data;  // 获取接口提供的数据
        var productList = [];
        var arr = [];
        for (var i = 0; i < product.length; i++) {
          if (product[i].cate_id !== 0) {
            productList.push(product[i]);
          }
        }
        // 根据cate_id排序
        function compare(cate_id) {
          return function (a, b) {
            var cate_id1 = a[cate_id];
            var cate_id2 = b[cate_id];
            return cate_id1 - cate_id2;
          }
        }
        console.log(productList.sort(compare('cate_id'))); // console.log(productList);
        // 对图片路径进行处理
        for (var i in productList) {
          console.log(productList[i].prod_images = IMG_URL + JSON.parse(productList[i].prod_images));
        }
        that.setData({ productList: productList });
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