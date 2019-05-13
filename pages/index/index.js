//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    navbar:['精选','景点'],
    currentNavbar: '0',
    swipers: [],
    yujiaList: []
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    // 加载滑屏图片
    this.getIndexSwipers()
    this.getYujiaList()
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  /**
   * 切换导航页tab
   */
  switchNav (e) {
    this.setData({
      currentNavbar:e.currentTarget.dataset.idx
    })
  },
  /**
   * 下拉刷新，这里只显示刷新图标即可
   */
  onPullDownRefresh (e) {
    // wx.startPullDownRefresh
    console.log('pull down refresh');
    this.getIndexSwipers()
    this.getYujiaList()
    // wx.stopPullDownRefresh()
  },
  getIndexSwipers(e) {
    var that = this
    wx.cloud.init()
    wx.cloud.callFunction({
      // 云函数名称
      name:'getIndexSwipers',
      data: {

      },
      success(res) {
        console.log('主页滑屏')
        that.setData({
          swipers: []
        })
        let picArray = []
        let data = res.result.data
        for(let i=0,len=data.length;i<len;i++){
          let swiperItem = data[i]
          picArray.push(swiperItem['pic']);
        }
        that.setData({
          swipers: picArray
        })
      },
      fail: console.error
    })
  },
  getYujiaList(e) {
    var that = this
    wx.cloud.init()
    wx.cloud.callFunction({
      // 云函数名称
      name: 'getYujiaRecommend',
      data: {

      },
      success(res) {
        console.log('渔家列表')
        that.setData({
          yujiaList: []
        })
        console.log(res.result)
        that.setData({
          yujiaList: res.result.data
        })
      },
      fail: console.error
    })
  }
})
