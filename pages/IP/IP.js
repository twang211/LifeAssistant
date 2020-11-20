// pages/IP/IP.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ip: "",
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
  ip: function (e) {
    this.setData({
      ip: e.detail.value
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
    var ip = this.data.ip;
    
    if (ip == "") {
      wx.showToast({
        title: '输入不合法',
        icon: 'none',
        image: '../../images/error.png',
        duration: 2000
      })
      return false;
    }

    // 请求数据
    wx.request({
      url: "https://api.jisuapi.com/ip/location",
      data: {
        'appkey' : '193ae6f1d404cbe8', //您申请的手机号码归属地查询接口的appkey
        'ip' : ip //需要查询的身份证
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
  //   var ip = this.data.ip;
    
  //   if (ip == "") {
  //     wx.showToast({
  //       title: '输入不合法',
  //       icon: 'none',
  //       image: '../../images/error.png',
  //       duration: 2000
  //     })
  //     return false;
  //   }
  //   // 请求数据
  //   wx.request({
  //     url: "https://apis.juhe.cn/ip/ipNew",
  //     data: {
  //       'key' : '39081f6d99696428de150a9739cbcea4', //您申请的手机号码归属地查询接口的appkey
  //       'ip' : ip //需要查询的IP地址或域名
  //     },
  //     header: {
  //       'Content-Type': 'application/json'
  //     },
  //     success: function (res) {
  //       console.log(res,"resresres")
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
  //           content:"查询失败",
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