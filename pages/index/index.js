//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    navbar:['精选','景点'],
    currentNavbar: '0',
    swipers: [
"https://hbimg.huabanimg.com/112e70edbbc97163d1e5e410d4021974e179c120dc41-9azZq8_fw658",
"https://hbimg.huabanimg.com/378d3fbfbfac76f345cd053a74a3c4c1c33194dd6ef2-DjpIna_fw658",
"https://hbimg.huabanimg.com/a40ebd571180c2a0c7dda29b1394e70b696b586f1017d-F3EDy7_fw658",
"https://hbimg.huabanimg.com/8343241621a028dc0e00a6023c9995128b599fc410d02-5c696S_fw658", 
"https://hbimg.huabanimg.com/bd78af5fe096576acadedf8bab87a6fcd15c857ca85f-xx4te7_fw658",
"https://hbimg.huabanimg.com/4b16af5288c13519de48b51dad7701d26286d09118afe-pasLcg_fw658",    "https://hbimg.huabanimg.com/04df552670a9985d89d68f73a83cf14aa0cb5f9011381-p9982F_fw658",   "https://hbimg.huabanimg.com/5970d4fdd51a6cefbb39ab4880bba3a38da436ae143b3-FEWw6v_fw658", "https://hbimg.huabanimg.com/d0c89d68d2fae039bf43f28b12c0eb56ba149fabee9f-26HSH3_fw658",
"https://hbimg.huabanimg.com/d88888ef66d0aacbf594c9affd4df139b2638f5d12b9b-e9291e_fw658"],
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
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
  pullUpLoad (e) {
    wx.startPullDownRefresh
    // wx.stopPullDownRefresh()
  }
})
