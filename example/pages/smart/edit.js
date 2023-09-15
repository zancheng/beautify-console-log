// pages/smart/edit.js
const AIOTSDK = require('./../../sdk/uiot-aiot-wechat-sdk')
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: '',
    form: {
      appKey: app.globalData.appKey,
      sn: app.globalData.sn,
      thirdSn: 'dsadas',
      userUnique: app.globalData.token,
      smartId: '',
      smartName: '',
      roomId: '',
      imageUrl: '',
      smartGroups: [],
      createSource: undefined,
      execSwitch: undefined,
      globalConfig: {},
      isManualExec: undefined,
      recommendCreateCode: "",
      runType: undefined,
      triggerSources: undefined,
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const { type, id, name } = options;
    this.setData({
      'type': type,
      'form.smartId': id,
      'form.smartName': name,
    });
    this.getDetails()
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
   * 获取详情
  */
  getDetails() {
    wx.showLoading({
      title: '获取详情信息...',
    })
    let getDetailsFunction
    if (this.data.type === 'manual') {
     getDetailsFunction = AIOTSDK.smart.getManualSmartDetails
    } else if (this.data.type === 'timing') {
      getDetailsFunction = AIOTSDK.smart.getTimingSmartDetails
    } else if (this.data.type === 'auto') {
      getDetailsFunction = AIOTSDK.smart.getAutoSmartDetails
    }
    getDetailsFunction({
      smartId: this.data.form.smartId,
      userUnique: app.globalData.token,
      appKey: app.globalData.appKey,
      // sn: app.globalData.sn,
      thirdSn: 'dsadas',
    }).then(res => {
      console.log(res)
      console.log(JSON.stringify(res))
      const cloneObj = this.data.form
      Object.assign(cloneObj, res)
      this.setData({
        'form': cloneObj,
      })
    }).catch(err => {
      wx.showModal({
        title: '获取详情失败',
        content: err.desc,
        showCancel: false,
      })
    }).finally(() => wx.hideLoading())
  },
  /**
   * 提交
   * @param {*} e 
   */
  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value, this.data.form)
    const form = e.detail.value
    console.log({
      data: {
        ...this.data.form,
        ...form,
      }
    })
    let updatesFunction
    if (this.data.type === 'manual') {
      updatesFunction = AIOTSDK.smart.updateManualSmart
    } else if (this.data.type === 'timing') {
      updatesFunction = AIOTSDK.smart.updateTimingSmart
    } else if (this.data.type === 'auto') {
      updatesFunction = AIOTSDK.smart.updateAutoSmart
    }
    console.log('修改智能', {
      ...this.data.form,
      ...form,
    })
    updatesFunction({
      ...this.data.form,
      ...form,
    }).then(res => {
      console.log(res)
      let pages = getCurrentPages();   //获取小程序页面栈
      let beforePage = pages[pages.length - 2];  //获取上个页面的实例对象
      beforePage.init();   //触发上个页面自定义的shuaxin方法
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