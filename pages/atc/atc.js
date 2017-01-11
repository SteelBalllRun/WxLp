var atc_number = require("./atc_number.js")
var atc_relation = require("./atc_relationship.js")
Page({
  data:{
    result:'null',
    cbuffer:[]
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    console.log('onLoad')
    wx.showNavigationBarLoading()
  },
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
    console.log('onReady')
    wx.hideNavigationBarLoading()
    this.setData({result:'answer here'})
  },
  onShow:function(){
    // 生命周期函数--监听页面显示
    console.log('onShow')
  },
  onHide:function(){
    // 生命周期函数--监听页面隐藏
    console.log('onHide')
  },
  onUnload:function(){
    // 生命周期函数--监听页面卸载
   console.log('onUnload')
   atc_number.cleanUp()
  },
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作
    console.log('onRefresh')
  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数
    console.log('onReachBottom')
  },

  onClick: function(e) {
    console.log('clicked')
    var value = e['target']['dataset']['value']
    console.log(e)
    console.log(value)
    // var display_value = atc_number.getNumberDisplay(value)
    var display_value = atc_relation.getStrinDisplay(value)
    this.setData({ result : display_value })
  },

  onShareAppMessage: function() {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  }
})