// pages/host/access_network.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    state: false,
    topicMessage: [],
    form: {
      deviceModel: "l_zf_three_switch",
    },
    nowAccessNetworkDeviceModel: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (app.MQTTClient?.isConnected()) {
      // 设备入网上报监听
      app.MQTTClient.onMessage('network_report', (data) => {
        console.log('设备入网上报监听', data.data)
        const deviceList = data.data.deviceList
        for (let i = 0; i < deviceList.length; i++) {
          const device = deviceList[i]
          if (device.model === this.data.form.deviceModel) {
            // 移除设备入网上报监听
            app.MQTTClient.removeMessage('network_report')
            wx.hideLoading()
            wx.showToast({
              title: '入网成功',
            })
            break
          }
        }
        // this.data.topicMessage.push(
        //   JSON.stringify(data.data, null, 2)
        // )
        // this.setData({
        //   "topicMessage": this.data.topicMessage
        // })
        console.log(data.data)
      })
    }
    this.getAccessNetworkState()
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
    // 移除设备入网上报监听
    app.MQTTClient.removeMessage('network_report')
    app.AIOTSDK.host.closeHostNetwork({
      ...app.globalData,
      deviceModelList: [this.data.form.deviceModel]
    })
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
   * 开始入网
   */
  formSubmit(e) {
    if (this.data.state) {
      wx.showModal({
        title: '提示',
        content: '智能服务器正在进行入网流程，不可重复操作',
        showCancel: false,
      })
      return
    }
    app.AIOTSDK.host.openHostNetwork({
      ...app.globalData,
      deviceModelList: [e.detail.value.deviceModel]
    }).then(res => {
      console.log(res)
      wx.showLoading({
        title: '正在入网',
      })
      this.getAccessNetworkState()
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
   * 获取当前智能服务器入网状态
   */
  getAccessNetworkState() {
    app.AIOTSDK.host.getHostNetworkInfo({
      userUnique: app.globalData.token,
    }).then(res => {
      this.setData({
        state: res.remainTime !== -1,
        nowAccessNetworkDeviceModel: res.model,
      })
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
  /** 
   * 关闭入网状态
  */
 close() {
  app.AIOTSDK.host.closeHostNetwork({
    ...app.globalData,
    deviceModelList: [this.data.nowAccessNetworkDeviceModel]
  }).then(res => {
    console.log(res)
    this.getAccessNetworkState()
    wx.hideLoading()
  }).catch(err => {
      console.log(err)
      wx.showModal({
        title: '操作失败',
        content: err.desc,
        showCancel: false,
      })
    })
 },
})