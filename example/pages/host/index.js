// pages/host/index.js
const AIOTSDK = require('./../../sdk/uiot-aiot-wechat-sdk')
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    AIOTSDK.host.getHostInfo({
      userUnique: app.globalData.token,
    }).then(res => {
      const data = res
      this.setData({
        content: JSON.stringify(data, null, 2)
      })
      console.log(data)
    }).catch(err => {
      console.log(err)
      wx.showModal({
        title: '操作失败',
        content: err.desc,
        showCancel: false,
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  /**
   * 重启智能服务器
   */
  restart() {
    wx.showModal({
      title: '提示',
      content: '确定要重启智能服务器吗（重启过程大概1分钟）？',
      success: function (sm) {
        if (sm.confirm) {
          AIOTSDK.host.rebootHost({
            ...app.globalData,
          }).then(res => {
            console.log(res)
            wx.showToast({
              title: '操作成功',
            })
          }).catch(err => {
            console.log(err)
            wx.showModal({
              title: '操作失败',
              content: err.desc,
              showCancel: false,
            })
          })
        } else if (sm.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  /** 
   * 跳转到设备入网
  */
 accessNetwork() {
   wx.navigateTo({
     url: '/pages/host/access_network',
   })
 },
})