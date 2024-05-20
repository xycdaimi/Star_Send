// pages/jijianren/jijianren.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jijian: {},
    name1: '',
    tel1: '',
    area1: '',
    company1: '',
    region: ['', '', ''],
    customItem: '全部'
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  dizhi: function (e) {
    var name1=e.detail.value.ming1;
    var tel1 = e.detail.value.tele1;
    var area1=e.detail.value.area1;
    var company1=e.detail.value.company1;
    if(name1==''){
      wx.showToast({
        title: '请填写姓名',
        duration: 2000,
        icon:'none'
        });
    }
    else if(tel1==''){
      wx.showToast({
        title: '请填写电话',
        duration: 2000,
        icon:'none'
        });
    }
    else if(!(/^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/.test(tel1))){
      wx.showToast({
        title: '手机号码有误',
        duration: 2000,
        icon:'none'
        });
    }
    else if(this.data.region[0]==''&&this.data.region[1]==''&&this.data.region[2]==''){
      wx.showToast({
        title: '请选择省市区',
        duration: 2000,
        icon:'none'
        });
    }
    else if(area1==''){
      wx.showToast({
        title: '请填写地址',
        duration: 2000,
        icon:'none'
        });
    }
    else{
      var a= wx.getStorageSync('user');
      if(a['tel']!=tel1){
        wx.showToast({
          title: '请填写自己的电话',
          duration: 2000,
          icon:'none'
          });
          return
      }
      this.setData({
        name1:name1
      })
      this.setData({
        tel1:tel1
      })
      this.setData({
        area1:area1
      })
      this.setData({
        company1:company1
      })
      var pages = getCurrentPages();
      var prevPage = pages[pages.length - 2];
      prevPage.setData({
        jijian: this.data
      })
      wx.navigateBack({
        delta:1
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var t=decodeURIComponent(options.jijian);
      var jijian=JSON.parse(t);
    this.setData({
      name1:jijian.name1
    })
    this.setData({
      tel1:jijian.tel1
    })
    this.setData({
      region:jijian.region
    })
    this.setData({
      area1:jijian.area1
    })
    this.setData({
      company1:jijian.company1
    })
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