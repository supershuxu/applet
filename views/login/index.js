// views/login/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: false,
    show: true,
    data: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    var value = wx.getStorageSync('data')
    if (!value) {
      _this.getcode()
      _this.setData({
        show: true,
        flag: false
      })
    } else {
      _this.setData({
        // show: false,
        flag: true
      })
    }
  },
  getcode: function () {
    wx.login({
      success: res => {
        wx.request({
          // 自行补上自己的 APPID 和 SECRET
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wxed3ffd5985a200cd&secret=b7b546562a8ab84492e4d2a00d170334&js_code=' + res.code + '&grant_type=authorization_code',
          success: res => {
            // 获取到用户的 openid
            wx.setStorage({
              key: "openid",
              data: res.data.openid
            })
            wx.setStorage({
              key: "sessionkey",
              data: res.data.session_key
            })
            // wx.setStorage({
            //   key: "data",
            //   data: res.data
            // })
          }
        });

      }
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
  getUserInfo: function (e) {
    var that = this;
    if (e.detail.errMsg == "getUserInfo:ok") {
      that.getcode()
      wx.request({
        url: 'https://liudediy.com/ajax/getUserPhone', //仅为示例，并非真实的接口地址
        data: {
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv,
          sessionKey: wx.getStorageSync("sessionkey")
        },
        method: "POST",
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          wx.setStorage({
            key: "data",
            data: res.data,
          })
          that.login(res.data.avatarUrl, res.data.city, res.data.country, res.data.gender, res.data.language, res.data.nickName, res.data.openId, res.data.province,res.data.unionId)
          console.log(res)
        }
      })
      // wx.setStorage({
      //   key: "userinfoo",
      //   data: e.detail.userInfo,
      // })
      // that.setData({
      //   show: false,
      //   flag: true
      // })
    } else {
      wx.showToast({
        title: '取消登录',
        icon: "none"
      })
    }
  },
  goback: function () {
    wx.switchTab({
      url: "/pages/mine/index"
    })
  },
  login: function (avatarUrl, city,country,gender,language,nickName,openId,province,unionId) {
    var _this=this
    console.log(avatarUrl, city,country,gender,language,nickName,openId,province,unionId)
    wx.request({
      url: 'https://liudediy.com/ajax/wechatinfo', //仅为示例，并非真实的接口地址
      data: {
        avatarUrl:avatarUrl,
        city:city,
        country:country,
        gender:gender,
        language:language,
        nickName,nickName,
        openId: openId,
        province:province,
        unionId: unionId,
      },
      method: "POST",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        _this.setData({
          data:res.data
        })
        wx.reLaunch({
          url: '/pages/mine/index'
        })
      }
    })

  },
  // getPhoneNumber: function (e) {
  //   var that = this;
  //   wx.checkSession({
  //     success: function () {
  //       wx.request({
  //         url: 'https://liudediy.com/ajax/getUserPhone', //自己的解密地址
  //         data: {
  //           encryptedData: e.detail.encryptedData,
  //           iv: e.detail.iv,
  //           sessionKey: wx.getStorageSync("sessionkey")
  //         },
  //         method: "post",
  //         header: {
  //           'content-type': 'application/json'
  //         },
  //         success: function (res) {
  //           console.log(res)
  //           // wx.reLaunch({
  //           //   url: '/pages/mine/index'
  //           // })
  //           var userInfo = wx.getStorageSync('data')
  //           console.log(userInfo.openId,userInfo.unionId, res.data.phoneNumber)
  //           wx.request({
  //             url: 'https://liudediy.com/ajax/wechatinfo', //仅为示例，并非真实的接口地址
  //             data: {
  //               openId: userInfo.openId,
  //               unionId: userInfo.unionId,
  //               phoneNumber: res.data.phoneNumber
  //             },
  //             method: "POST",
  //             header: {
  //               'content-type': 'application/json' // 默认值
  //             },
  //             success(res) {
  //               console.log(res)
  //             }
  //           })



  //           // if (res.data.r == "T") {
  //           //   that.onshow(that.data.openid, that.data.userInfo, res.data.d.phoneNumber); //调用onshow方法，并传递三个参数
  //           //   console.log("登录成功")
  //           //   console.log(res.data.d.phoneNumber) //成功后打印微信手机号
  //           // } else {
  //           //   console.log(res);
  //           // }
  //         }
  //       })
  //     },
  //     fail: function () {
  //       console.log(1111)
  //       that.setData({
  //         show: true,
  //         flag: false
  //       })
  //       that.getcode()
  //       wx.request({
  //         url: 'https://liudediy.com/ajax/getUserPhone', //自己的解密地址
  //         data: {
  //           encryptedData: e.detail.encryptedData,
  //           iv: e.detail.iv,
  //           sessionKey: wx.getStorageSync("sessionkey")
  //         },
  //         method: "post",
  //         header: {
  //           'content-type': 'application/json'
  //         },
  //         success: function (res) {

  //           wx.reLaunch({
  //             url: '/pages/mine/index'
  //           })
  //           // if (res.data.r == "T") {
  //           //   that.onshow(that.data.openid, that.data.userInfo, res.data.d.phoneNumber); //调用onshow方法，并传递三个参数
  //           //   console.log(res.data.d.phoneNumber) //成功后打印微信手机号
  //           // } else {
  //           //   console.log(res);
  //           // }
  //         }
  //       })
  //     }
  //   })
  // },

})