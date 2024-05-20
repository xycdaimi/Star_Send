// pages/shoujianren/shoujianren.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name2: '',
    tel2: '',
    area2: '',
    company2: '',
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
    var name2=e.detail.value.ming2;
    var tel2 = e.detail.value.tele2;
    var area2 = e.detail.value.area2;
    var company2=e.detail.value.company2;
    if(name2==''){
      wx.showToast({
        title: '请填写姓名',
        duration: 2000,
        icon:'none'
        });
    }
    else if(tel2==''){
      wx.showToast({
        title: '请填写电话',
        duration: 2000,
        icon:'none'
        });
    }
    else if(!(/^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/.test(tel2))){
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
    else if(area2==''){
      wx.showToast({
        title: '请填写地址',
        duration: 2000,
        icon:'none'
        });
    }
    else{
      this.setData({
        name2:name2
      })
      this.setData({
        tel2:tel2
      })
      this.setData({
        area2:area2
      })
      this.setData({
        company2:company2
      })
      
      var pages = getCurrentPages();
      var prevPage = pages[pages.length - 2];
      prevPage.setData({
        shoujian: this.data
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
    var t=decodeURIComponent(options.shoujian);
      var shoujian=JSON.parse(t);
    this.setData({
      name2:shoujian.name2
    })
    this.setData({
      tel2:shoujian.tel2
    })
    this.setData({
      region: shoujian.region
    })
    this.setData({
      area2:shoujian.area2
    })
    this.setData({
      company2:shoujian.company2
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