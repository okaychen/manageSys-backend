var app = getApp();
var API_URL = app.globalData.path_info.api;  //服务器地址 host+url
var IMG_URL = app.globalData.path_info.path;  // 图片
var WxParse = require('../../../wxParse/wxParse.js');
var util = require('../../../utils/util.js');
Page({
  data: {
    num: 1,
    num1: 1,
    // 使用data数据对象设置样式名
    minusStatus: 'disabled',
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    // 是否隐藏页面拼团模块
    hideTuan: true,
    // 当前时间
    orderData: util.formatTime(new Date),
  },


  /* 点击减号 */
  bindMinus1: function () {
    var num1 = this.data.num1;
    // 如果大于1时，才可以减
    if (num1 > 1) {
      num1--;
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态
    var minusStatus1 = num1 <= 1 ? 'disabled' : 'normal';
    // 将数值与状态写回
    this.setData({
      num1: num1,
      minusStatus1: minusStatus1
    });
  },
  /* 点击加号 */
  bindPlus1: function () {
    var num1 = this.data.num1;
    // 不作过多考虑自增1
    num1++;
    // 只有大于一件的时候，才能normal状态，否则disable状态
    var minusStatus1 = num1 < 1 ? 'disabled' : 'normal';
    // 将数值与状态写回
    this.setData({
      num1: num1,
      minusStatus1: minusStatus1
    });
  },
  /* 输入框事件 */
  bindManual1: function (e) {
    var num1 = e.detail.value1;
    // 将数值与状态写回
    this.setData({
      num1: num1
    });
  },

  /* 一人团 */
  bindMinus: function () {
    var num = this.data.num;
    if (num > 1) {
      num--;
    }
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },
  bindPlus: function () {
    var num = this.data.num;
    num++;
    var minusStatus = num < 1 ? 'disabled' : 'normal';
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },
  bindManual: function (e) {
    var num = e.detail.value;
    this.setData({
      num: num
    });
  },

  // 加载完成之后
  onLoad: function (options) {
    var that = this;
    console.log('传递的参数是：' + options.id);
    if (!options.group_id) {
      this.setData({
        group_id: 0
      });
    } else {
      this.setData({
        group_id: options.group_id
      });
    }
    wx.request({
      url: API_URL + '/api/product/getProductById?prod_id=' + options.id,
      data: {},
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.hideLoading();
        console.log(res.data.data, 'get this info');
        let productInfo = res.data.data;
        // 对轮播图进行处理
        let arr = [];
        let prod_images = JSON.parse(productInfo.prod_images);
        for (let i in prod_images) {
          let images = IMG_URL + prod_images[i];
          arr.push(images);
        }
        // 对商品详情进行处理（rich-text）
        WxParse.wxParse('article', 'html', productInfo.prod_detail, that, 5);
        // 判断是否存在正在拼团<每个商品显示开团的第一组>
        if (productInfo.groups[0] == null) {
          that.setData({
            hideTuan: true
          })
        } else {
          that.setData({
            hideTuan: false
          })
        }

        // 拼团剩余时间处理<时间差>
        var timestamp3 = productInfo.groups[0].create_time
        var date1 = timestamp3 * 1000,  //开始时间  
          date2 = new Date(),        //结束时间  
          date3 = date2.getTime() - new Date(date1).getTime(),   //时间差的毫秒数        
          //计算出相差天数  
          days = Math.floor(date3 / (24 * 3600 * 1000)),
          //计算出小时数  
          leave1 = date3 % (24 * 3600 * 1000),   //计算天数后剩余的毫秒数  
          hours = Math.floor(leave1 / (3600 * 1000)),
          //计算相差分钟数  
          leave2 = leave1 % (3600 * 1000),      //计算小时数后剩余的毫秒数  
          minutes = Math.floor(leave2 / (60 * 1000)),
          //计算相差秒数  
          leave3 = leave2 % (60 * 1000),     //计算分钟数后剩余的毫秒数  
          seconds = Math.round(leave3 / 1000);
        console.log("相差 " + days + "天 " + hours + "小时 " + minutes + "分钟 " + seconds + "秒")
        // 相差时间与24小时做差
        var TotalS = 86400;
        var RemandS = hours * 3600 + minutes * 60 + seconds * 1; //相差时间<秒>
        var diffS = TotalS - RemandS;
        // 剩余秒数转化为时分秒
        var chours = Math.floor(diffS / 3600),
          cmin = Math.floor((diffS - chours * 3600) / 60),
          csec = diffS - cmin * 60 - chours * 3600;
        // 最终时间<拼团结束时间> 
        chours < 10 ? chours = '0' + chours : chours;
        cmin < 10 ? cmin = '0' + cmin : cmin;
        csec < 10 ? csec = '0' + csec : csec;
        var fTime = chours + ':' + cmin + ':' + csec;
        console.log(fTime)




        // 给页面设置数据
        that.setData({
          productInfo: res.data.data, // 传到detail页面的所有数据，包括下面的几条
          prod_images: arr,  // images数组，轮播图
          single_price: productInfo.prod_single_price, // 单独购买单价
          group_price: productInfo.prod_group_price, // 拼团购买单价
          orderId: productInfo.id,  // 对应商品的id，传入订单页面
          fTime: fTime
        });

      }
    });
  },

  // 自定义底部弹出层
  showModal1: function () {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    });
    this.animation = animation;
    animation.translateY(300).step();
    this.setData({
      animationData1: animation.export(),
      showModalStatus1: true
    });
    setTimeout(function () {
      animation.translateY(0).step();
      this.setData({
        animationData1: animation.export()
      });
    }.bind(this), 200);
  },
  hideModal1: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    });
    this.animation = animation;
    animation.translateY(300).step();
    this.setData({
      animationData1: animation.export()
    });
    setTimeout(function () {
      animation.translateY(0).step();
      this.setData({
        animationData1: animation.export(),
        showModalStatus1: false
      });
    }.bind(this), 200);
  },

  showModal2: function () {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    });
    this.animation = animation;
    animation.translateY(300).step();
    this.setData({
      animationData2: animation.export(),
      showModalStatus2: true
    });
    setTimeout(function () {
      animation.translateY(0).step();
      this.setData({
        animationData2: animation.export()
      });
    }.bind(this), 200);
  },
  hideModal2: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    });
    this.animation = animation;
    animation.translateY(300).step();
    this.setData({
      animationData2: animation.export()
    });
    setTimeout(function () {
      animation.translateY(0).step();
      this.setData({
        animationData2: animation.export(),
        showModalStatus2: false
      });
    }.bind(this), 200);
  }

});