var app = getApp()

Page({
    data: {
        connectState: app.MQTTClient?.isConnected(),
        topicMessage: [],
    },
    onLoad: function (options) {
      // Do some initialize when page load.
      console.log('index.js onLoad')
      if (app.MQTTClient?.isConnected()) {
          // 设备状态上报监听
          app.MQTTClient.onMessage('state_report', (data) => {
            console.log('设备状态上报监听', data.data)
            this.data.topicMessage.push(
              JSON.stringify(data.data, null, 2)
            )
            this.setData({
              "topicMessage": this.data.topicMessage
            })
          })
          // 设备入网上报监听
          app.MQTTClient.onMessage('network_report', (data) => {
            console.log('设备入网上报监听', data.data)
            this.data.topicMessage.push(
              JSON.stringify(data.data, null, 2)
            )
            this.setData({
              "topicMessage": this.data.topicMessage
            })
          })
          // 设备离网上报监听
          app.MQTTClient.onMessage('outwork_report', (data) => {
            console.log('设备离网上报监听', data.data)
            this.data.topicMessage.push(
              JSON.stringify(data.data, null, 2)
            )
            this.setData({
              "topicMessage": this.data.topicMessage
            })
          })
          // 环境数据上报监听
          app.MQTTClient.onMessage('env_report', (data) => {
            console.log('环境数据上报监听', data.data)
            this.data.topicMessage.push(
              JSON.stringify(data.data, null, 2)
            )
            this.setData({
              "topicMessage": this.data.topicMessage
            })
          })
          // 其他报警上报监听
          app.MQTTClient.onMessage('alarm_report', (data) => {
            console.log('其他报警上报监听', data.data)
            this.data.topicMessage.push(
              JSON.stringify(data.data, null, 2)
            )
            this.setData({
              "topicMessage": this.data.topicMessage
            })
          })
      }
    },
    onShow: function () {
        // Do something when page show.
        console.log('index.js onShow')
        this.setData({
          connectState: app.MQTTClient.isConnected()
        })
    },
    onReady: function () {
        // Do something when page ready.
    },
    onHide: function () {
        // Do something when page hide.
    },
    onUnload: function () {
        // Do something when page close.
        // 移除设备状态上报监听
        app.MQTTClient.removeMessage('state_report')
        // 移除设备入网上报监听
        app.MQTTClient.removeMessage('network_report')
        // 移除设备离网上报监听
        app.MQTTClient.removeMessage('outwork_report')
        // 移除环境数据上报监听
        app.MQTTClient.removeMessage('env_report')
        // 移除其他报警上报监听
        app.MQTTClient.removeMessage('alarm_report',)
    },
    onPullDownRefresh: function () {
        // Do something when pull down.
        this.setData({
          connectState: app.MQTTClient.isConnected()
        })
        wx.stopPullDownRefresh();
    },
    onReachBottom: function () {
        // Do something when page reach bottom.
    },
    onShareAppMessage: function () {
        // return custom share data when user share.
    },
    onPageScroll: function () {
        // Do something when page scroll
    },
    onResize: function () {
        // Do something when page resize
    },
    onTabItemTap(item) {
        console.log(item.index)
        console.log(item.pagePath)
        console.log(item.text)
    },
    // Event handler.
    viewTap: function () {
        this.setData({
            text: 'Set some data for updating view.'
        }, function () {
            // this is setData callback
        })
    },
    customData: {
        hi: 'MINA'
    }
})
