// pages/answer/index.js
var time = require('../../utils/util');
var util = require('../../utils/util');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',//搜索框的值
    questionList: '',//精选问题列表
    answerlist: '',//回答列表
    showloading: true,//加载中loading
    page: 2,//上拉刷新页数
    showfinish: false,//数据加载完成loading
    total: null,//获取到数据的总条数
    cate: null,//标签
    list:''//备份list
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
          cate: 'choice',
        })
      }
    })
  },

  //搜索框绑定的函数
  onchange(e) {
    this.setData({
      value: e.detail,
    });
    if (this.data.cate === 'choice') {
      var _this = this;
      wx.request({
        url: `https://liudediy.com/ask/index.html?search=${_this.data.value}`,
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
          })
        }
      })
    } else {
      var _this = this;
      wx.request({
        url: `https://liudediy.com/ask/index/cate/${_this.data.cate}.html?search=${_this.data.value}`,
        method: "POST",
        header: {
          'Content-type': 'application/x-www-form-urlencoded'
          // 'Content-Type': 'application/json'
        },
        success(res) {
          console.log(res.data)
          res.data.data.forEach(function (item, index) {
            item.time = time.formatTimeTwo(item.time, 'Y-M-D h:m:s');
          })
          _this.setData({
            answerlist: res.data.data,
          })
        }
      })
    }
    console.log(this.data.value, this.data.cate)
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

  //切换tab函数
  onChange(event) {
    var _this = this;
    wx.request({
      url: `https://liudediy.com/ask/index/cate/${event.detail.name}`,
      method: "POST",
      header: {
        'Content-type': 'application/x-www-form-urlencoded'
        // 'Content-Type': 'application/json'
      },
      success(res) {
        res.data.data.forEach(function (item, index) {
          item.time = time.formatTimeTwo(item.time, 'Y-M-D h:m:s');
        })
        _this.setData({
          answerlist: res.data.data,
          total: res.data.total,
          list: res.data.data,
          page: 2,
          cate: event.detail.name,
        })
        console.log(res.data, _this.data.cate,_this.data.answerlist)
      }
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
  onReachBottom: util.throttle(function (e) {
    if (this.data.cate === 'choice') { //当cate为choice时 精选问题页面没有下拉刷新
      this.setData({
        showloading: false,
        showfinish: true,
      })
    } else {
      var _this = this
      if (_this.data.answerlist.length + 10 !== _this.data.total) { //数组的长度不等于数据的总长度时
        _this.setData({
          page: _this.data.page + 1, //页码数加一
          showloading: true, //加载中出现
          showfinish: false, //数据加载完隐藏
        })
      } else {
        _this.setData({
          showloading: false, //否则加载中消失
          showfinish: true, //数据加载完出现
        })
      }
      if (_this.data.showloading) { //当数据加载中出现时
        setTimeout(function () {
          wx.request({
            url: `https://liudediy.com/ask/index/cate/${_this.data.cate}.html?page=${_this.data.page}`,
            header: {
              'Content-Type': 'application/json', //GET方式是这个
            },
            method: "POST",
            success(res) {
              console.log(res.data)
              res.data.data.forEach(function (item, index) { //循环把数组中每一项中的时间戳都处理成日期格式
                item.time = time.formatTimeTwo(item.time, 'Y-M-D h:m:s');
              })
              _this.setData({
                showloading: false, //数据调取出来后把  加载中  隐藏
                answerlist: _this.data.answerlist.concat(res.data.data), //把新取来的数组拼接到原数组中
              })
            }
          })
        }, 1000)
      }
    }
    console.log('触底')
  }, 2000),

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
})