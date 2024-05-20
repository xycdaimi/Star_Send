// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    wx.loadFontFace({
      family: 'Pmzdqst',
      source: 'url("/font/庞门正道轻松体.otf")',
      global:true,
      success:res =>{
        console.log('加载字体完成');
      },
      fail:res=> {
      },
    })
  },
  globalData: {
    userInfo: null
  },
})
