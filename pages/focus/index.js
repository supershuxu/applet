// pages/focus/index.js
var time = require('../../utils/util');
Page({

  /**
   * 页面的初始数据
   */
  data: {
active:0,
questionList: '',//精选问题列表
showloading: true,//加载中loading
showfinish: false,//数据加载完成loading


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var _this = this;
    wx.request({
      url: `https://liudediy.com/ask`,
      method: "POST",
      header: {
        'Content-type': 'application/x-www-form-urlencoded'
        // 'Content-Type': 'application/json'
      },
      success(res) {
        console.log(res.data)
        res.data.data.forEach(function (item, index) {
          item.mess.time = time.formatTimeTwo(item.mess.time, 'Y-M-D h:m:s');
        })
        res.data.data.forEach(function (item, index) {
          item.time = time.formatTimeTwo(item.time, 'Y-M-D h:m:s');
        })
        _this.setData({
          questionList: res.data.data,
          showloading: false,
          showfinish:true
        })
      }
    })
  },
  onChange(event) {
    wx.showToast({
      title: `切换到标签 ${event.detail.name}`,
      icon: 'none',
    });
  },
  answerDetail: function (e) {
    var id = e.currentTarget.dataset.id //获取点击产品时拿到的id，就是data-id传过来的值
    // wx.navigateTo跳转页面的方法
    //URL是传递的是详情页的路径，把id拼接传过去就可以啦
    wx.navigateTo({
      url: `/views/answerdetail/index?id=${id}`
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