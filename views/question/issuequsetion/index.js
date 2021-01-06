// views/question/issuequsetion/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    mincon: '',
    bankuai: '',
    option1: [{
        text: '版块分类',
        value: '版块分类'
      },
      {
        text: '新款商品',
        value: '新款商品'
      },
      {
        text: '活动商品',
        value: '活动商品'
      },
    ],
    option2: [{
        text: '标签分类',
        value: '标签分类'
      }
    ],
    value1: '版块分类',
    value2: '标签分类',
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

  },
  goback: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  onChange(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
  },
  change(e) {

    console.log(e)
  },
  change2(e) {
    console.log(e)
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