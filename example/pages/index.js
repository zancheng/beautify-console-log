var app = getApp()

Page({
    data: {},
    onLoad: function (options) {
      // Do some initialize when page load.
      console.log('index.js onLoad')
    },
    onShow: function () {
        // Do something when page show.
        console.log('index.js onShow')
    },
    onReady: function () {
        // Do something when page ready.
    },
    onHide: function () {
        // Do something when page hide.
    },
    onUnload: function () {
        // Do something when page close.
    },
    onPullDownRefresh: function () {
        // Do something when pull down.
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
    },
    customData: {
    }
})
