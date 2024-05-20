// pages/login/login.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    zhan:'',
    mima:''
  },
  duqu:function (e) {
    var that = this;
    //读取数据库
    wx.request({
      url: 'http://localhost:8085/star/du.php',
      method: 'GET',
      data: {
        zhan:that.data.zhan,
        mima:that.data.mima,
        xinxi:'denglu'
      },
      header: {
        'content-Type': 'application/json'
      },
      success(res) {
        console.log(res.data[0]),
          that.setData({
            user:res.data[0]
          })
          if(that.data.user['flag']==1){
            wx.setStorageSync('user', that.data.user)
            wx.setStorageSync('tarbar', 0)
            wx.showToast({
              title: '登录成功！！！', 
              icon: 'success',
              duration: 1000
            })
            if(that.data.user['kuaidi']==3)
            {
              wx.reLaunch({
                url: '/pages/Guanli/Guanli',
              })
            }else{
              wx.switchTab({
                url: '/pages/main/main',
              })
            }
          }
          else if(that.data.user['flag']==0){
            wx.showToast({
              title: '该账号暂未注册或密码错误！！！',
              icon: 'error',
              duration: 1500
            })
          }
      },
    });
  },
  denglu: function(e) {
    var zhan= this.data.zhan;
    var mima = this.data.mima;
    if(zhan==''){
      wx.showToast({
        title: '请填写账号',
        duration: 2000,
        icon:'none'
        });
    }
    if(mima==''){
      wx.showToast({
        title: '请填写密码',
        duration: 2000,
        icon:'none'
        });
    }
    this.duqu();
  },
  zhuce:function (e) {
    wx.navigateTo({
      url: '/pages/register/register',
    })
  },
  onsetzhan:function (e) {
    this.setData({
      zhan:e.detail.value
    })
  },
  onsetpass:function (e) {
    this.setData({
      mima:e.detail.value
    })
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