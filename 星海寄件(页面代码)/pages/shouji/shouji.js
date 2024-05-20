// pages/shouji/shouji.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code:'',
    countTime: 30, //用于存放验证码接口里获取到的code
    codename:'获取验证码'
  },
  onsettel:function (e) {
    this.setData({
      tel:e.detail.value
    })
  },
   //验证码函数
   getVerificationCode() {
    var that = this; //防止this指向问题
    var countTime = that.data.countTime
    // setInterval() 方法可按照指定的周期（以毫秒计）来调用函数或计算表达式，简单来说就是定时执行
    countDown = setInterval(function () {
      countTime--; // 倒计时开始递减
      // 更新按钮中的显示内容
      that.setData({
        codename: countTime + ' 秒'
      })
      // 如果倒计时时间小于或者等于0，也就是倒计时结束，显示 “重新发送” 字样
      if (countTime <= 0) {
        clearInterval(countDown); //停止执行countDown函数
        // 更新按钮中的显示内容
        that.setData({
          codename: '重新发送',
          countTime: 30,
        })
      }
    }, 1000)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})