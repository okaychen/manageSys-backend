var app = getApp()
Page({
  data: {
    stars: [0, 1, 2, 3, 4],
    normalSrc: '../../../image/normal.png',
    selectedSrc: '../../../image/selected.png',
    halfSrc: '../../../image/half.png',
    key: 1,//评分
    path: ''
  },
  onLoad: function () {
  },

  //点击右边,半颗星
  selectLeft: function (e) {
    var key = e.currentTarget.dataset.key
    if (this.data.key == 0.5 && e.currentTarget.dataset.key == 0.5) {
      //只有一颗星的时候,再次点击,变为0颗
      key = 0;
    }
    console.log("得" + key + "分")
    this.setData({
      key: key
    })

  },
  //点击左边,整颗星
  selectRight: function (e) {
    var key = e.currentTarget.dataset.key
    console.log("得" + key + "分")
    this.setData({
      key: key
    })
  },



   upload: function () {
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        wx.uploadFile({
          url: 'http://example.weixin.qq.com/upload',
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'user': 'test'
          },
          success: function (res) {
            var data = res.data
            wx.showModal({
              title: '上传文件返回状态',
              content: '成功',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                }
              }
            })                          //do something
          },
          fail: function (res) {
            console.log(res)
          }
        })
        that.setData({
          path: tempFilePaths
        })
      }
    })
  }




})