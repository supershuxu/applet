// views/txtdetail/index.js
var time = require('../../utils/util');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    article: '',
    showloading: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // options.id 就是首页传过来的id，接下来循环找到id所匹配的数据就可以进行渲染啦！
    this.setData({
      id: options.id
    })
    console.log(this.data.id)

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var _this = this;
    wx.request({
      url: `https://liudediy.com/ajax/wenzhangxiangqing?id=${_this.data.id}`,
      method: "GET",
      header: {
        'Content-Type': 'application/json' //GET方式是这个
      },
      success(res) {
        res.data.time = time.formatTimeTwo(res.data.time, 'Y-M-D');
        console.log(res)
        _this.setData({
          article: res,
          showloading: false
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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