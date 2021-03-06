//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: '测试入口--计算器',
    motto_second: '测试入口--亲族计算器',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  bindEntranceTap: function() {
    wx.navigateTo({
      url: '../atc/atc?atc_type=atc_number'
    })
  },
  bindEntrance2Tap: function() {
    wx.navigateTo({
      url: '../atc/atc?atc_type=atc_relation'
    })
  },

  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
