App({
  onLaunch: function (options) {
    
    wx.getStorage({
      key: 'history',
      success: (res) => {
          this.globalData.history = res.data
      },
      fail: (res) => {
          console.log("get storage failed")
          console.log(res)
          this.globalData.history = []
      }
    })

    console.log('生命周期函数--监听小程序初始化' + JSON.stringify(options))
  },
  
  // 权限询问
  getRecordAuth: function() {
    wx.getSetting({
      success(res) {
        console.log("succ")
        console.log(res)
        if (!res.authSetting['scope.record']) {
          wx.authorize({
            scope: 'scope.record',
            success() {
                // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
                console.log("succ auth")
            }, fail() {
                console.log("fail auth")
            }
          })
        } else {
          console.log("record has been authed")
        }
      }, fail(res) {
          console.log("fail")
          console.log(res)
      }
    })
  },
  onShow: function () {
    console.log('生命周期函数--监听小程序显示')
  },
  onHide: function () {
    wx.stopBackgroundAudio()
    console.log('生命周期函数--监听小程序隐藏')
  },
  globalData: {

    history: [],
    hasLogin: false
  }
})
