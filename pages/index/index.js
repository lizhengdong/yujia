//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    navbar: ['精选', '景点'],
    currentNavbar: '0',
    swipers: [],
    yujiaList: [],
    attractions: []
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
    // 加载滑屏图片
    this.getIndexSwipers()
    this.getYujiaList()
    this.getAttractions()
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
  switchNav(e) {
    this.setData({
      currentNavbar: e.currentTarget.dataset.idx
    })
  },
  /**
   * 下拉刷新，这里只显示刷新图标即可
   */
  onPullDownRefresh(e) {
    // wx.startPullDownRefresh
    console.log('pull down refresh');
    this.getIndexSwipers()
    this.getYujiaList()
    this.getAttractions()
    wx.stopPullDownRefresh()
  },
  getIndexSwipers(e) {
    console.log('加载首页滑屏')
    let that = this
    wx.cloud.init()
    wx.cloud.callFunction({
      // 云函数名称
      name: 'getIndexSwipers',
      data: {

      },
      success(res) {
        console.log('主页滑屏')
        that.setData({
          swipers: []
        })
        let picArray = []
        let data = res.result.data
        for (let i = 0, len = data.length; i < len; i++) {
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
    console.log('加载渔家列表')
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
  },
  copyTel: function(e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.tel,
      success: function(res) {
        wx.getClipboardData({
          success: function(res) {
            wx.showToast({
              title: '复制手机号成功'
            })
          }
        })
      }
    })
  },
  addViewNum: function(e) {
    let that = this;
    let id = e.currentTarget.dataset.id;
    console.log('开始增加pv:' + id)
    wx.cloud.init()
    wx.cloud.callFunction({
      // 云函数名称
      name: 'addYujiaPv',
      data: {
        id: id,
      },
      success(res) {
        console.log('增加pv完成')
      },
      fail: console.error
    })
  },
  getAttractions: function(e) {
    console.log('加载景点列表')
    var that = this
    wx.cloud.init()
    wx.cloud.callFunction({
      // 云函数名称
      name: 'getAttractions',
      data: {

      },
      success(res) {
        console.log('景点列表')
        that.setData({
          attractions: []
        })
        console.log(res.result)
        that.setData({
          attractions: res.result.data
        })
      },
      fail: console.error
    })
  },
  onShareAppMessage: function () {
    return {
      title: '日照渔家乐精选',
      path: '/index/index'
    }
  },
})