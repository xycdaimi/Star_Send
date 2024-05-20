// pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    zhan:'',
    mima:'',
    rmima:'',
    tel:'',
    uid:''
  },
  zhuce:function (e) {
    if(this.data.zhan==''){
      wx.showToast({
        title: '请填写昵称',
        duration: 2000,
        icon:'error'
        });
    }
    else if(this.data.mima==''){
      wx.showToast({
        title: '请填写密码',
        duration: 2000,
        icon:'error'
        });
    }
    else if(this.data.rmima==''){
      wx.showToast({
        title: '请再次填写密码',
        duration: 2000,
        icon:'error'
        });
    }
    else if(this.data.mima!=this.data.rmima){
      wx.showToast({
        title: '确认密码与密码不一致',
        duration: 2000,
        icon:'error'
        });
    }
    else if(this.data.tel==''){
      wx.showToast({
        title: '请填写电话',
        duration: 2000,
        icon:'error'
        });
    }
    else if(!(/^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/.test(this.data.tel))){
      wx.showToast({
        title: '手机号码有误',
        duration: 2000,
        icon:'error'
        });
    }
    else{
      this.duqu();
      
    }
  },
  genID:function (length) {
    return Number(Math.random().toString().substr(3,length)+Date.now()).toString(36);
  },
  duqu:function (e) {
    var that = this;
    //读取数据库
    wx.request({
      url: 'http://localhost:8085/star/du.php',
      method: 'GET',
      data: {
        zhan:that.data.zhan,
        tel:that.data.tel,
        xinxi:'zhuce'
      },
      header: {
        'content-Type': 'application/json'
      },
      success(res) {
        console.log(res),
          that.setData({
            flag: res.data[0]['flag'],
          })
          if(that.data.flag!='0'){
            wx.showToast({
              title: '该账号已被注册',
              duration: 2000,
              icon:'error'
              });
          }
          else {
            that.setData({
              uid:that.genID(10)
            })
            that.xieru();
          }
      },
    });
  },
  xieru:function (e) {
    var that=this;
    //写入数据库
    wx.request({
      url: 'http://localhost:8085/star/xie.php',
      method: 'GET',
      data: {
        uid:this.data.uid,
        zhan:this.data.zhan,
        mima:this.data.mima,
        tel:this.data.tel,
        xinxi:'zhuce'
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
          var jilu = {
              username:that.data.zhan,
              password:that.data.mima,
              uid:that.data.uid,
              tel:that.data.tel,
              flag:1,
              kuaidi:0
          }
          wx.setStorageSync('user', jilu)
          wx.setStorageSync('tarbar', 0)
          wx.showToast({
            title: '提交成功！！！', 
            icon: 'success',
            duration: 1000
          })
          wx.switchTab({
            url: '/pages/main/main',
          })
        }
      }
    });
  },
  onsetname:function (e) {
    this.setData({
      zhan:e.detail.value
    })
  },
  onsetpass:function (e) {
    this.setData({
      mima:e.detail.value
    })
  },
  onsetrpass:function (e) {
    this.setData({
      rmima:e.detail.value
    })
  },
  onsettel:function (e) {
    this.setData({
      tel:e.detail.value
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