const util = require('../../utils/util')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    articleList: [],
    showloading: true,
    page: 2,
    showfinish: false,
    cate: null,
    num: null,
  },
  method: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // wx.getSetting({
    //   withSubscriptions: true,   //  这里设置为true,下面才mainSwitch
    //   success: function(res){   
    //     console.log(res)
    //     console.log(res.subscriptionsSetting)
    //     // 调起授权界面弹窗
    //     if (res.subscriptionsSetting.mainSwitch) {  // 用户打开了订阅消息总开关
    //       if (res.subscriptionsSetting.itemSettings != null) {   // 用户同意总是保持是否推送消息的选择, 这里表示以后不会再拉起推送消息的授权
    //         let moIdState = res.subscriptionsSetting.itemSettings['muS1weIb7AG0fT0QkEdnGVx9rJRN3v1vyO03SvY9Y1Q','THo2N2__spaDX6-pT1gSCeqPyMPsffcaplVj8_g-FH0'];  // 用户同意的消息模板id
    //         if(moIdState === 'accept'){   
    //           console.log('接受了消息推送');

    //         }else if(moIdState === 'reject'){
    //           console.log("拒绝消息推送");

    //         }else if(moIdState === 'ban'){
    //           console.log("已被后台封禁");

    //         }
    //       }else {
    //       	// 当用户没有点击 ’总是保持以上选择，不再询问‘  按钮。那每次执到这都会拉起授权弹窗
    //         wx.showModal({
    //           title: '提示',
    //           content:'请授权开通服务通知',
    //           showCancel: true,
    //           success:  function (ress) {
    //             if (ress.confirm) {  
    //               console.log(ress)
    //             wx.requestSubscribeMessage({   // 调起消息订阅界面
    //                 tmplIds: ['muS1weIb7AG0fT0QkEdnGVx9rJRN3v1vyO03SvY9Y1Q','THo2N2__spaDX6-pT1gSCeqPyMPsffcaplVj8_g-FH0'],
    //                 success (res) { 
    //                   console.log('订阅消息 成功 ');
    //                   console.log(res);
    //                 },
    //                 fail (er){
    //                   console.log("订阅消息 失败 ");
    //                   console.log(er);
    //                 }
    //               })     
    //             }
    //           }
    //         })
    //       }
    //     }else {
    //       console.log('订阅消息未开启')
    //     }      
    //   },
    //   fail: function(error){
    //     console.log(error);
    //   },
    // })
    var _this = this;
    wx.request({
      url: `https://liudediy.com/ajax/wenzhang/cate/${"热点"}`,
      method: "GET",
      header: {
        'Content-Type': 'application/json' //GET方式是这个
      },
      success(res) {
        res.data.data.forEach(function (item, index) {
          if (item.banner) {
            item.cover = item.banner
          }
        })
        _this.setData({
          articleList: res.data.data,
          showloading: false,
          cate: '热点',
          num: res.data.num
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  //文章删除
  closelist: function (evevt) {
    this.data.articleList.splice(evevt.currentTarget.id, 1)
    this.setData({
      articleList: this.data.articleList
    })
  },
  //跳转文章详情页
  articleDetail: function (e) {
    var id = e.currentTarget.dataset.id 
    wx.navigateTo({
      url: `/views/txtdetail/index?id=${id}`
    })
  },

  //tab切换绑定函数
  onChange(event) {
    var _this = this;
    _this.setData({
      showloading: true
    })
    wx.request({
      url: `https://liudediy.com/ajax/wenzhang/cate/${event.detail.name}`,
      header: {
        'Content-Type': 'application/json', //GET方式是这个
      },
      method: "GET",
      success(res) {
        console.log(res)
        res.data.data.forEach(function (item, index) {
          if (item.banner) {
            item.cover = item.banner
          }
        })
        _this.setData({
          articleList: res.data.data,
          page: 2,
          cate: event.detail.name,
          num: res.data.num,
          showloading: false,
        })
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
    var _this = this
    console.log(_this.data.articleList.length, _this.data.num)
    if (_this.data.articleList.length + 11 !== _this.data.num) {
      _this.setData({
        page: _this.data.page + 1,
        showloading: true,
        showfinish: false,
      })
    } else {
      _this.setData({
        showloading: false,
        showfinish: true,
      })
    }
    if (_this.data.showloading) {
      setTimeout(function () {
        wx.request({
          url: `https://liudediy.com/ajax/wenzhang?page=${_this.data.page}&cate=${_this.data.cate}`,
          header: {
            'Content-Type': 'application/json', //GET方式是这个
          },
          method: "GET",
          success(res) {
            console.log(res)
            console.log(_this.data.page)
            res.data.data.forEach(function (item, index) {
              if (item.banner) {
                item.cover = item.banner
              }
            })
            _this.setData({
              showloading: false,
              articleList: _this.data.articleList.concat(res.data.data),
            })
          }
        })
      }, 1000)
    }
    console.log("触底了")
  }, 2000),


  goschool:function(){
    wx.navigateTo({
      url: `/views/index/school/index`
    })
  },
  goskilbag:function(){
    wx.navigateTo({
      url: `/views/index/silkbag/index`
    })
  },
  goGermanstudy:function(){
    wx.navigateTo({
      url: `/views/index/Germanstudy/index`
    })
  },
  goaps:function(){
    wx.navigateTo({
      url: `/views/index/aps/index`
    })
  },
  goactivity:function(){
    wx.navigateTo({
      url: `/views/index/activity/index`
    })
  },
  goproject:function(){
    wx.navigateTo({
      url: `/views/index/project/index`
    })
  },
  goshop:function(){
    wx.navigateTo({
      url: `/views/index/shop/index`
    })
  },
  gostrategy:function(){
    wx.navigateTo({
      url: `/views/index/strategy/index`
    })
  }

})