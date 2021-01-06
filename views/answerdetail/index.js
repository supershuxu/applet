// views/answerdetail/index.js
var time = require('../../utils/util');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    flag: true,
    miaoshu: "展开描述",
    list: '',
    showloading: true,
    showmiaoshu:true
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
        if(res.data.desc===''){
        console.log(res.data.desc==='')

          _this.setData({
            showmiaoshu:false
          })
        }else{
          _this.setData({
            showmiaoshu:true
          })
        }
        // console.log(res.data.desc.length)
          res.data.time = time.formatTimeTwo( res.data.time, 'Y-M-D h:m:s');
          res.data.pl.forEach(function (item, index) {
            item.child.forEach(function (item, index) {
              item.time = time.formatTimeTwo(item.time, 'Y-M-D h:m:s');
            })
          })
        _this.setData({
          list: res.data,
          showloading: false
        })
        console.log(res.data)
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  huidawenti:function(e){
    var id = e.currentTarget.dataset.id //获取点击产品时拿到的id，就是data-id传过来的值
    // wx.navigateTo跳转页面的方法
    //URL是传递的是详情页的路径，把id拼接传过去就可以啦
    wx.navigateTo({
      url: `/views/huidawenti/index?id=${id}`
    })
  },
  opendesc: function () {
    this.setData({
      flag: !this.data.flag
    })
    if (this.data.flag) {
      this.setData({
        miaoshu: "展开描述"
      })
    } else {
      this.setData({
        miaoshu: "关闭描述"
      })
    }
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