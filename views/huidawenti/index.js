// views/huidawenti/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    id:null,
    title:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      id: options.id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var _this = this
    wx.request({
      url: `https://liudediy.com/ask/detail/id/${_this.data.id}`, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method: "POST",
      success(res) {
        _this.setData({
          title: res.data.title,
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  onChange :function(event) {
    // event.detail 为当前输入的值
    this.setData({
      value:event.detail
    })
  },
  goback:function(){
    wx.navigateBack({
      delta: 1
    })
    
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})