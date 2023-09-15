const AIOTSDK = require('./sdk/uiot-aiot-wechat-sdk')
// import * as AIOTSDK from './sdk/uiot-aiot-wechat-sdk'

App({
  onLaunch(options) {
    // Do something initial when launch.
    console.log('onLaunch', AIOTSDK)
    this.init()
  },
  onShow(options) {
    console.log('onShow')
    wx.onNetworkStatusChange(function (res) {
      console.log('网络', res.isConnected);
      console.log('网络类型', res.networkType);
      this.MQTTClient.reconnect()
    })
    // 小程序返回前台，需要重新进行MQTT连接
    if (this.MQTTClient && !this.globalData.isConnected()) {
      this.MQTTClient.reconnect()
    }
  },
  onHide() {
    console.log('onHide')
    // 1. 小程序进入后台，需要停止MQTT连接，因为中间小程序会停止连接网络；
    // 2. 主动关闭后，再进入后再重连
    if (this.MQTTClient && this.MQTTClient.isConnected()) {
      this.MQTTClient.close()
    }
  },
  onError(msg) {
    console.log(msg)
  },
  init() {
    const _this = this
    // 初始化SDK配置
    // 需要注入SDK需要的配置：token、appKey、appSecret，showLog可选（true 打开SDK控制台日志， false关闭SDK控制台日志）
    AIOTSDK.initConfig({
      appKey: this.globalData.appKey,
      appSecret: this.globalData.appSecret,
      token: this.globalData.token,
      showLog: true,
    }).then(() => {
      this.MQTTClient = AIOTSDK.mqttClient()
      this.MQTTClient.connect()
      console.log(_this.globalData)
      AIOTSDK.host.getHostInfo({
        userUnique: this.globalData.token,
      }).then(res => {
        const data = res
        this.globalData.sn = data.sn
        this.globalData.isSmall = data.isSmall
      }).catch(err => {
        console.log(err)
      })
    })
  },
  globalData: {
    token: 'fc64bf5a-bf19-498e-b0e5-fa855741339d',
    appKey: 'e6x46ptx769gg1jyxx80dk7ts7s06gve',
    appSecret: 'wdrsdnUE3DjjB9uaT2P6N1CayokGkgdg',
    sn: '',
    isSmall: false,
  },
  AIOTSDK,
  MQTTClient: null,
})