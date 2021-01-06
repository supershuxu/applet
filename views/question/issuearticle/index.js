// views/question/issuearticle/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    fileList: [],
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
  onChange(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
  },
  goback:function(){
    wx.navigateBack({
      delta: 1
    })
  },
  afterRead(event) {
    console.log(event)
    const { file } = event.detail;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
      url: 'https://example.weixin.qq.com/upload', // 仅为示例，非真实的接口地址
      filePath: file.url,
      name: 'file',
      formData: { user: 'test' },
      success(res) {
        console.log(1111)
        // 上传完成需要更新 fileList
        const { fileList = [] } = this.data;
        fileList.push({ ...file, url: res.data });
        this.setData({ fileList });
      },
    });
  },
})