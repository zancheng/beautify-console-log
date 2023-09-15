// pages/device/index.js
const AIOTSDK = require('./../../sdk/uiot-aiot-wechat-sdk')
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: '',
    deviceList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getList()
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
    this.getList()
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
  switchChange(e) {
    console.log('控制设备->', e)
    AIOTSDK.device.controlDevice({
      userUnique: app.globalData.token,
      deviceId: e.target.dataset.deviceid,
      properties: {
        powerSwitch: e.detail.value ? 'on' : 'off'
      },
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
      wx.showModal({
        title: '操作失败',
        content: err.desc,
        showCancel: false,
      })
    })
  },
  getList() {
    AIOTSDK.device.getDeviceList({
      userUnique: app.globalData.token,
    }).then(res => {
      const data = res.deviceList.sort((a, b) => b.deviceOnlineState - a.deviceOnlineState)
      console.log(data)
      this.setData({
        deviceList: data,
      })
    }).catch(err => {
      console.log(err)
      wx.showModal({
        title: '操作失败',
        content: err.desc,
        showCancel: false,
      })
    })
  },
  updateDevice(e) {
    var dataset = e.target.dataset
    wx.navigateTo({
      url: `/pages/device/editDevice?deviceId=${dataset.id}&deviceName=${dataset.name}&roomId=${dataset.roomid}&roomName=${dataset.roomname}`,
    })
  },
  updateRoom(e) {
    var dataset = e.target.dataset
    wx.navigateTo({
      url: `/pages/device/editRoom?deviceId=${dataset.id}&deviceName=${dataset.name}&roomId=${dataset.roomid}&roomName=${dataset.roomname}`,
    })
  },
  deleteDevice(e) {
    var dataset = e.target.dataset
    wx.showModal({
      title: '提示',
      content: '确定要删除吗？',
      success: function (sm) {
        if (sm.confirm) {
            // 用户点击了确定 可以调用删除方法了
            AIOTSDK.device.deleteDevice({
              userUnique: app.globalData.token,
              appKey: app.globalData.appKey,
              appKey: app.globalData.appKey,
              sn: app.globalData.sn,
              deviceList: [{
                deviceId: dataset.id,
              }],
              thirdSn: 'dsadas',
            }).then(res => {
              const data = res.deviceList.sort((a, b) => b.deviceOnlineState - a.deviceOnlineState)
              console.log(data)
              this.getList()
            }).catch(err => {
              console.log(err)
              wx.showModal({
                title: '删除失败',
                content: err.desc,
                showCancel: false,
              })
            })
          } else if (sm.cancel) {
            console.log('用户点击取消')
          }
        }
      })
  }
})