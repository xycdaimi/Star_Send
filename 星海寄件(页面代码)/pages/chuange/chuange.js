// pages/chuange/chuange.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gou:''
  },
  set:function (e) {
    this.setData({
      gou:e.detail.value
    })
  },
  chen:function (e) {
    if(this.data.gou!=1){
      wx.showToast({
        title: '请勾选条例', 
        icon: 'none',
        duration: 1000
      })
    }else{
      var a=wx.getStorageSync('user');
      
      var that=this;
    //写入数据库
    wx.request({
      url: 'http://localhost:8085/star/xie.php',
      method: 'GET',
      data: {
        uid:a['uid'],
        kuaidi:1,
        xinxi:'change'
      },
      header: {
        'content-Type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        console.log(res.data);
        if (res.data.status == 0) {
          wx.showToast({
            title: '提交失败！！！',
            icon: 'loading',
            duration: 1500
          })
        } else if(res.data.status ==1) {
          
          wx.showToast({
            title: '提交成功！！！', 
            icon: 'success',
            duration: 1000
          })
          a['kuaidi']=1;
          wx.setStorageSync('user', a);
          wx.redirectTo({
            url: '/pages/index/index',
          })
        }
      }
    });
      
    }
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