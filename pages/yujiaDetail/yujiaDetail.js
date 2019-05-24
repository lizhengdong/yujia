// pages/yujiaDetail/yujiaDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    yujia: {},
    yujiaId: '',
    yujiaName: '',
    markers: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log('传参的id:' + options.id)
    this.setData({
      yujiaId: options.id,
    });
    this.getYujiaInfo();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.getYujiaInfo();
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    let yujiaName = this.data.yujiaName;
    let yujiaId = this.data.yujiaId;
    console.log('转发页面')
    console.log(yujiaName)
    console.log(yujiaId)
    let shareObj = {
      title: yujiaName,
      path: 'pages/yujiaDetail/yujiaDetail?id=' + yujiaId
    }
    return shareObj
  },

  getYujiaInfo(e) {
    console.log('加载渔家信息,id:' + this.data.yujiaId)
    var that = this
    wx.cloud.init()
    wx.cloud.callFunction({
      // 云函数名称
      name: 'getYujiaItem',
      data: {
        id: that.data.yujiaId
      },
      success(res) {
        console.log('请求渔家信息')
        that.setData({
          yujia: []
        })
        console.log(res.result)
        that.setData({
          yujia: res.result.data
        })
        that.setData({
          yujiaName: res.result.data.name
        })
        if (res.result.data.hasLocation) {
          that.setData({
            markers: []
          })
          let markerItem = {
            id: 1,
            latitude: res.result.data.latitude,
            longitude: res.result.data.longitude,
            name: res.result.data.name
          }
          that.setData({
            markers: [markerItem]
          })
        }
      },
      fail: console.error
    })
  },
})