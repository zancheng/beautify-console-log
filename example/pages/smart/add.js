// pages/smart/add.js
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
      // sn: app.globalData.sn,
      thirdSn: 'dsadas',
      userUnique: app.globalData.token,
      smartName: '',
      imageUrl: '',
      smartGroups: [],
      createSource: undefined,
      execSwitch: undefined,
      globalConfig: {},
      isManualExec: undefined,
      runType: undefined,
      triggerSources: undefined,
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const {
      type
    } = options;
    this.setData({
      'type': type,
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
    let addFunction
    if (this.data.type === 'manual') {
      addFunction = AIOTSDK.smart.addManualSmart
      this.data.form.smartGroups = [{
        "condId": -1,
        "groupId": null,
        "orderNum": 0,
        "type": 1,
        "conditions": [],
        "actions": [{
          "sourceType": 2,
          "objId": 49,
          "deviceProperty": "motorSwitch",
          "orderNum": 1,
          "deviceModel": "wc_smart_roller_motor",
          "interval": null,
          "type": "action",
          "title": "卷帘电机",
          "notifyInfo": [],
          "value": "off",
          "multiGroup": null
        }]
      }]
    } else if (this.data.type === 'timing') {
      addFunction = AIOTSDK.smart.addTimingSmart
      this.data.form.smartGroups = [{
        "condId": -1,
        "groupId": null,
        "orderNum": 0,
        "type": 1,
        "conditions": [],
        "actions": [{
          "sourceType": 2,
          "objId": 49,
          "deviceProperty": "motorSwitch",
          "orderNum": 1,
          "deviceModel": "wc_smart_roller_motor",
          "interval": null,
          "type": "action",
          "title": "卷帘电机",
          "notifyInfo": [],
          "value": "off",
          "multiGroup": null
        }]
      }]
      this.data.form.triggerSources = {"sources":[{"orderNum":1,"type":"timeTrigger","title":"1687767078706","deviceId":null,"multiGroup":null,"repeatData":"0,1,2,3,4,5,6","sourceType":1,"valueEnd":null,"deviceProperty":null,"deviceModel":null,"startTime":null,"endTime":null,"isRepeat":3,"value":"16:13","operation":null}],"operation":"1"}
      this.data.form.globalConfig = {"holidaySwitch":null,"repeatData":"0,1,2,3,4,5,6","execStatus":null,"notifyMsg":null,"offdaySwitch":null,"triggerDelayTime":null,"startTime":"00:00","endTime":"23:59","notifyUsers":null,"isRepeat":1}
    } else if (this.data.type === 'auto') {
      addFunction = AIOTSDK.smart.addAutoSmart
      this.data.form.triggerSources = {"sources":[{"orderNum":1,"type":"deviceTrigger","title":"窗帘电机","deviceId":219,"multiGroup":"","repeatData":null,"valueEnd":"","deviceProperty":"motorSwitch","deviceModel":"wc_smart_curtain_motor","startTime":null,"endTime":null,"isRepeat":null,"value":"on","operation":""}],"operation":"1"}
      this.data.form.globalConfig = {"holidaySwitch":null,"repeatData":"0,1,2,3,4,5,6","execStatus":null,"notifyMsg":null,"offdaySwitch":null,"triggerDelayTime":null,"startTime":"00:00","endTime":"23:59","notifyUsers":null,"isRepeat":1}
      this.data.form.smartGroups = [{"condId":-1,"groupId":null,"orderNum":1,"type":1,"conditions":[],"actions":[{"sourceType":2,"objId":2391,"deviceProperty":"powerSwitch","orderNum":1,"deviceModel":"l_zf_three_switch","interval":null,"type":"action","title":"NULL","notifyInfo":null,"value":"on","multiGroup":null}]}]
    }
    console.log('添加智能', {
      ...this.data.form,
      ...form,
    })
    addFunction({
      ...this.data.form,
      ...form,
    }).then(res => {
      console.log(res)
      let pages = getCurrentPages(); //获取小程序页面栈
      let beforePage = pages[pages.length - 2]; //获取上个页面的实例对象
      beforePage.init(); //触发上个页面自定义的shuaxin方法
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