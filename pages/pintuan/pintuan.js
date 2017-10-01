var app = getApp();
var API_URL = 'https://ssl.snowboy99.com';  //服务器地址
Page({
  data: {
    winHeight: "",//窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    expertList: [{ //假数据
      img: "",
      name: "",
      tag: "",
      answer: 134,
      listen: 2234
    }]
  },
  // 滚动切换标签样式
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
    this.checkCor();
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var cur = e.target.dataset.current;
    if (this.data.currentTaB == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    }
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function () {
    if (this.data.currentTab > 4) {
      this.setData({
        scrollLeft: 300
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  },
  onLoad: function () {
    var that = this;
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 180;
        console.log(calc)
        that.setData({
          winHeight: calc
        });
      }
    });
    console.log('iv');
    // ------------------ login
    wx.login({
      success: function (res) { // 登录成功
        if (res.code) {
          var code = res.code;
          wx.getUserInfo({  // 获取用户信息
            success: function (res2) { // 获取userinfo成功
              console.log(res2);
              var encryptedData = encodeURIComponent(res2.encryptedData); // <必须> 把加密串转化为url编码
              var iv = res2.iv;
              // 请求自己的服务器 调用Login函数
              Login(code, encryptedData, iv);
            }
          })
        } else {
          console.log('获取用户登录失败' + res.errMsg);
        }
      }
    })

    // ------------------- Login登录函数
    function Login(code, encryptedData,iv){
      console.log('code=' + code + '&encryptedData=' + encryptedData + '&iv=' + iv);
      wx.showToast({
        title: '正在登录...',
        icon:'loading',
        duration:1000
      });
      wx.request({
        url: API_URL,
        data:{
          code:code,
          encryptedData: encryptedData,
          iv: iv
        },
        method:'GET',
        header:{
          'content-type': 'application/json'
        },  // 设置请求的header
        success:function(res){
          // success
          wx.hideToast();
          console.log('服务器返回'+res.data);
        }
      })
    }
  },
  footerTap: app.footerTap
})