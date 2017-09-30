//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    selectPerson: false,
    selectPerson2: false,
    selectPerson3: true,
  },


  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  //dropdown
  clickDown1: function () {
    var selectPerson = this.data.selectPerson;
    if (selectPerson == true) {
      this.setData({
        selectPerson: false,
      })
    } else {
      this.setData({
        selectPerson: true,
      })
    }
  },

  //dropdown
  clickDown2: function () {
    var selectPerson2 = this.data.selectPerson2;
    if (selectPerson2 == true) {
      this.setData({
        selectPerson2: false,
      })
    } else {
      this.setData({
        selectPerson2: true,
      })
    }
  },

  //dropdown
  clickDown3: function () {
    var selectPerson3 = this.data.selectPerson3;
    if (selectPerson3 == true) {
      this.setData({
        selectPerson3: false,
      })
    } else {
      this.setData({
        selectPerson3: true,
      })
    }
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
