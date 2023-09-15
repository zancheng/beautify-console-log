// pages/smart/index.js
const AIOTSDK = require('./../../sdk/uiot-aiot-wechat-sdk')
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    smartData: [{
      label: '获取所有可手动执行场景',
      type: 'exe',
      list: [],
    }, {
      label: '获取房间下所有场景',
      type: 'all',
      list: [],
    }, {
      label: '获取所有手动场景',
      type: 'manual',
      list: [],
    }, {
      label: '获取所有定时场景',
      type: 'timing',
      list: [],
    }, {
      label: '获取所有自动场景',
      type: 'auto',
      list: [],
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.init()
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
  init() {
    this.getExeSmart()
    this.getAllSmart()
    this.getManualSmart()
    this.getTimingSmart()
    this.getAutoSmart()
  },
  /** 
   * 获取可执行智能
  */
  getExeSmart() {
    AIOTSDK.smart.getAllExeList({
      userUnique: app.globalData.token,
      appKey: app.globalData.appKey,
      appKey: app.globalData.appKey,
      // sn: app.globalData.sn,
      thirdSn: 'dsadas',
    }).then(res => {
      const data = res
      console.log(data)
      this.setData({
        ['smartData[0].list']: data.smartList,
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
  /** 
   * 获取房间下所有智能
  */
  getAllSmart() {
    AIOTSDK.smart.getAllSmartList({
      userUnique: app.globalData.token,
      appKey: app.globalData.appKey,
      // sn: app.globalData.sn,
      thirdSn: 'dsadas',
      roomId: 4,
    }).then(res => {
      const data = res
      console.log(data)
      this.setData({
        ['smartData[1].list']: data.smartList,
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
  /** 
   * 获取手动智能
  */
  getManualSmart() {
    AIOTSDK.smart.getManualSmartList({
      appKey: app.globalData.appKey,
      // sn: app.globalData.sn,
      thirdSn: 'dsadas',
      userUnique: app.globalData.token,
    }).then(res => {
      const data = res
      console.log(data)
      this.setData({
        ['smartData[2].list']: data.smartList,
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
  /** 
   * 获取定时智能
  */
  getTimingSmart() {
    AIOTSDK.smart.getTimingSmartList({
      appKey: app.globalData.appKey,
      // sn: app.globalData.sn,
      thirdSn: 'dsadas',
      userUnique: app.globalData.token,
    }).then(res => {
      const data = res
      console.log(data)
      this.setData({
        ['smartData[3].list']: data.smartList,
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
  /** 
   * 获取自动智能
  */
  getAutoSmart() {
    AIOTSDK.smart.getAutoSmartList({
      appKey: app.globalData.appKey,
      // sn: app.globalData.sn,
      thirdSn: 'dsadas',
      userUnique: app.globalData.token,
    }).then(res => {
      const data = res
      console.log(data)
      this.setData({
        ['smartData[4].list']: data.smartList,
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
  /** 
   * 触发智能
   * 
  */
 command(e) {
    AIOTSDK.smart.controlSmart({
      appKey: app.globalData.appKey,
      sn: app.globalData.sn,
      thirdSn: 'dsadas',
      userUnique: app.globalData.token,
      smartId: e.target.dataset.id,
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
 /**
  * 点击添加智能
  * @param {*} e 
  */
 add(e) {
  const dataset = e.target.dataset
   wx.navigateTo({
     url: `/pages/smart/add?type=${dataset.type}`,
   })
 },
 /**
  * 点击修改智能
  * @param {*} e 
  */
 editSmart(e) {
  const dataset = e.target.dataset
   wx.navigateTo({
     url: `/pages/smart/edit?id=${dataset.id}&type=${dataset.type}&name=${dataset.name}`,
   })
 },
 deleteSmart(e) {
    let deleteFunction
    const dataset = e.target.dataset
     if (dataset.type === 'manual') {
      deleteFunction = AIOTSDK.smart.deleteManualSmart
     } else if (dataset.type === 'timing') {
      deleteFunction = AIOTSDK.smart.deleteTimingSmart
     } else if (dataset.type === 'auto') {
      deleteFunction = AIOTSDK.smart.deleteAutoSmart
     }
     wx.showModal({
      title: '提示',
      content: '确定要删除此智能吗？',
      success: (sm) => {
        if (sm.confirm) {
          deleteFunction({
            appKey: app.globalData.appKey,
            // sn: app.globalData.sn,
            thirdSn: 'dsadas',
            userUnique: app.globalData.token,
            smartIds: [{
              smartId: e.target.dataset.id,
            }],
          }).then(res => {
            console.log(res)
            this.init()
          }).catch(err => {
            console.log(err)
            wx.showModal({
              title: '操作失败',
              content: err.desc,
              showCancel: false,
            })
          })
        }
      },
    })
 }
})