
Page({

  /**
   * 页面的初始数据
   */
  data: {
    but:'签收',
    js:0,
    xinxi:{},
    background: ['/l1.jpg', '/l2.jpg', '/l3.jpg'],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    premar: 0,
    nemar: 0,
    info:['快递未接单','快递未揽件,如有问题，请联系','快递已揽收,如有问题，请联系','正在派件,如有问题，请联系','快递已送达,如有问题，请联系','快递已签收'],
    type:0,
    into:['接单','揽收','派件','送达'],
    tel:'',
    uid:'暂未有快递员派送'
  },
  onInfo() {
  },
  changeIndicatorDots() {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },

  changeAutoplay() {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },

  intervalChange(e) {
    this.setData({
      interval: e.detail.value
    })
  },

  durationChange(e) {
    this.setData({
      duration: e.detail.value
    })
  },
  qianshou:function (e) {
    var that=this;
    var ty=++that.data.type;
    //写入数据库
    wx.request({
      url: 'http://localhost:8085/star/xie.php',
      method: 'GET',
      data: {
        danhao:this.data.xinxi['订单号'],
        type:ty,
        xinxi:'qianshou'
      },
      header: {
        'content-Type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        console.log(res.data);
        if (res.data.status == 0) {
          wx.showToast({
            title: '签收失败！！！',
            icon: 'loading',
            duration: 1500
          })
        } else if(res.data.status ==1) {
          that.setData({
            type:ty,
            but:'已签收'
          })
          wx.showToast({
            title: '签收成功！！！', 
            icon: 'success',
            duration: 1000
          })
        }
      }
    });
  },
  jie:function (e) {
    var that=this;
    var ty=++that.data.type;
    //写入数据库
    wx.request({
      url: 'http://localhost:8085/star/xie.php',
      method: 'GET',
      data: {
        danhao:this.data.xinxi['订单号'],
        type:ty,
        userkuai:JSON.stringify(wx.getStorageSync('user')),
        xinxi:'jiedan'
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
          that.setData({
            type:ty,
          })
          
          if(that.data.type==1){
            wx.showToast({
              title: '接单成功！！！', 
              icon: 'success',
              duration: 1000
            })
          wx.switchTab({
            url: '/pages/jiedan/jiedan',
          })
          }else if(that.data.type==5){
            wx.showToast({
              title: '订单送达！！！', 
              icon: 'success',
              duration: 1000
            })
          }
        }
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var t=decodeURIComponent(options.xinxi);
      var xinxi=JSON.parse(t);
      this.setData({
        xinxi:xinxi,
        js:options.js,
        type:xinxi['物流状态']
      })
      console.log(this.data.xinxi);
      if(this.data.xinxi['物流状态']!=0){
        this.setData({
          tel:xinxi['快递员电话'],
          uid:xinxi['快递员uid'],
          js:options.js
        })
        console.log(this.data.js)
      }
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