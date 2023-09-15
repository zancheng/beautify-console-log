// pages/floor/index.js
const AIOTSDK = require('./../../sdk/uiot-aiot-wechat-sdk')
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: "",
    list: [],
    isSmall: app.globalData.isSmall,
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
  getList() {
    AIOTSDK.floor.getAllFloorAndRoom({
      userUnique: app.globalData.token,
    }).then(res => {
      const data = res
      console.log(data)
      this.setData({
        list: data.floorList,
        content: JSON.stringify(data, null, 2)
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
   * 添加楼层
   */
  add() {
    wx.navigateTo({
      url: '/pages/floor/add',
    })
  },
  /** 
   * 修改楼层信息
   */
  edit(e) {
    console.log(e.target.dataset)
    var dataset = e.target.dataset
    wx.navigateTo({
      url: `/pages/floor/edit?id=${dataset.id}&name=${dataset.name}`,
    })
  },
  /** 
   * 删除楼层
   */
  deleteFloor(e) {
    console.log(e.target.dataset)
    var dataset = e.target.dataset
    wx.showModal({
      title: '提示',
      content: '确定要删除楼层吗？',
      success: function (sm) {
        if (sm.confirm) {
          // 用户点击了确定 可以调用删除方法了
          AIOTSDK.floor.deleteFloor({
            userUnique: app.globalData.token,
            appKey: app.globalData.appKey,
            appKey: app.globalData.appKey,
            sn: app.globalData.sn,
            floorId: dataset.id,
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
  },
})