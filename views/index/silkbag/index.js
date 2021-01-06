// views/index/silkbag/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    _num:1
  },

  onChange(e) {
    this.setData({
      value: e.detail,
    });
    console.log(this.data.value)
  },
  handleNav: function(e) {
    this.setData({
      _num: e.currentTarget.dataset.num
    })
    console.log(e)
   },
  
})