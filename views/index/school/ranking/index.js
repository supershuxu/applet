// views/index/school/ranking/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    list:['CHE德国高等教育发展中心大学排名','德国经济周刊专业排名','QS世界大学排名','泰晤士世界大学排名'],
    option1: [
      { text: '专业选择', value: 0 },
      { text: '新款商品', value: 1 },
      { text: '活动商品', value: 2 },
    ],
    value1: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onChange(event) {
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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onShareAppMessage: function () {

  }
})