// pages/room/index.js
const AIOTSDK = require('./../../sdk/uiot-aiot-wechat-sdk')
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
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
  /** 
   * 获取列表
  */
  getList() {
    AIOTSDK.room.getRoomList({
      userUnique: app.globalData.token,
      floorId: 0,
    }).then(res => {
      const data = res
      console.log(data)
      this.setData({
        list: data.roomList,
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
   * 添加
   */
  add() {
    wx.navigateTo({
      url: '/pages/room/add',
    })
  },
  /** 
   * 修改信息
   */
  edit(e) {
    console.log(e.target.dataset)
    var dataset = e.target.dataset
    wx.navigateTo({
      url: `/pages/room/edit?id=${dataset.id}&name=${dataset.name}&floorId=${dataset.floorid}`,
    })
  },
  /** 
   * 删除楼层
   */
  deleteRoom(e) {
    console.log(e.target.dataset)
    var dataset = e.target.dataset
    wx.showModal({
      title: '提示',
      content: '确定要删除房间吗？',
      success: (sm) => {
        if (sm.confirm) {
          console.log({
            userUnique: app.globalData.token,
            appKey: app.globalData.appKey,
            sn: app.globalData.sn,
            roomId: dataset.id,
            thirdSn: 'dsadas',
          })
          // 用户点击了确定 可以调用删除方法了
          AIOTSDK.room.deleteRoom({
            userUnique: app.globalData.token,
            appKey: app.globalData.appKey,
            // sn: app.globalData.sn,
            roomId: dataset.id,
            thirdSn: 'dsadas',
          }).then(res => {
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