// pages/room/edit.js
var app = getApp()
const AIOTSDK = require('../../sdk/uiot-aiot-wechat-sdk')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    form: {
      appKey: app.globalData.appKey,
      sn: app.globalData.sn,
      thirdSn: 'dsadas',
      userUnique: app.globalData.token,
      roomName: '',
      floorId: '',
      roomIcon: 'default',
      roomCategoryType: '',
      roomIconType: 1,
      roomIcon: 'https://chk3.unisiot.com:8362/wechat/smartHome/images/all/5_0/devicon_cloudvoicebox_a9.png',
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const { floorId, name, id } = options;
    this.setData({
      'form.floorId': floorId,
      'form.roomName': name,
      'form.roomId': id,
    });
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
  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value, this.data.form)
    const form = e.detail.value
    console.log({
      data: {
        ...this.data.form,
        ...form,
      }
    })
    AIOTSDK.room.updateRoom({
      ...this.data.form,
      ...form,
    }).then(res => {
      console.log(res)
      let pages = getCurrentPages();   //获取小程序页面栈
      let beforePage = pages[pages.length - 2];  //获取上个页面的实例对象
      beforePage.getList();   //触发上个页面自定义的shuaxin方法
      wx.navigateBack()
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