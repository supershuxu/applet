// views/index/school/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    active: 0,
    _num:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onChange(e) {
    this.setData({
      value: e.detail,
    });
    console.log(this.data.value)
  },
  Change(event) {
    wx.showToast({
      title: `切换到标签 ${event.detail.name}`,
      icon: 'none',
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
  handleNav: function(e) {
    this.setData({
      _num: e.target.dataset.num
    })
    console.log(11)
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