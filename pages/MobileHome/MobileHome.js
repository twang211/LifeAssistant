// pages/MobileHome/MobileHome.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile: "",
    show: false,
    getdata: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 获取用户输入 
   */
  mobile: function (e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  /**
   *用户点击获取数据事件 
   */
  
  getdata: function (e) {
    var that = this;
    wx.showLoading({
      title: '加载中',
    });
    var mobile = this.data.mobile;
    var reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
    if (reg.test(mobile) === false) {
      wx.showToast({
        title: '输入不合法',
        icon: 'none',
        image:'../../images/error.png',
        duration: 2000
      })
      return false;
    }
    // 请求数据
    wx.request({
      url: "https://api.jisuapi.com/shouji/query",
      data: {
        'appkey' : '193ae6f1d404cbe8', //您申请的手机号码归属地查询接口的appkey
        'shouji' : mobile //需要查询的手机号
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res)
        wx.hideLoading();
        if (res.data.status == "0") {
          if (res.data.result == "" || res.data.result == "null" || res.data.result == null || res.data.result == "undefined" || res.data.result == undefined) {
            wx.showModal({
              title: '提示',
              content: "暂无数据",
              success: function (res) {
                that.setData({
                  show: false
                })
              }
            })
          } else {
            that.setData({
              show: true,
              getdata: res.data.result
            })
          }

        } else {
          wx.showModal({
            title: '提示',
            content: res.data.msg,
            success: function (res) {
              that.setData({
                show: false
              })
            }
          })
        }
      }
    })
  }
  // getdata: function (e) {
  //   var that = this;
  //   wx.showLoading({
  //     title: '加载中',
  //   });
  //   var mobile = this.data.mobile;
  //   var reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
  //   if (reg.test(mobile) === false) {
  //     wx.showToast({
  //       title: '输入不合法',
  //       icon: 'none',
  //       image:'../../images/error.png',
  //       duration: 2000
  //     })
  //     return false;
  //   }
  //   // 请求数据
  //   wx.request({
  //     url: "https://apis.juhe.cn/mobile/get",
  //     data: {
  //       'key' : '362b2f6e17f39a7e30d73feb64bee58a', //您申请的手机号码归属地查询接口的appkey
  //       'phone' : mobile //要查询的手机号码
  //     },
  //     header: {
  //       'content-type': 'application/json' // 默认值
  //     },
  //     success: function (res) {
  //       console.log(res.data.result,"that.setDatathat.setData")
  //       wx.hideLoading();
  //       if (res.data.error_code == "0") {
  //         if (res.data.result == "" || res.data.result == "null" || res.data.result == null || res.data.result == "undefined" || res.data.result == undefined) {
  //           wx.showModal({
  //             title: '提示',
  //             content: "暂无数据",
  //             success: function (res) {
  //               that.setData({
  //                 show: false
  //               })
  //             }
  //           })
  //         } else {
  //           that.setData({
  //             show: true,
  //             getdata: res.data.result
  //           })
  //         }

  //       } else {
  //         wx.showModal({
  //           title: '提示',
  //           content: res.data.msg,
  //           success: function (res) {
  //             that.setData({
  //               show: false
  //             })
  //           }
  //         })
  //       }
  //     }
  //   })
  // }
})