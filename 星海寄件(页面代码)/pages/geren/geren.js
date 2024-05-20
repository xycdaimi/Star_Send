// pages/geren/geren.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chang:0,
    zt:'登录',
    name:'昵称',
    tel:'头像',
    kuai:'成为快递员'
  },
  downandup:function (e) {
    if(this.data.zt=='登录'){
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
    if(this.data.zt=='退出登录'){
      var user = wx.getStorageSync('user');
      user['flag']=0;
      wx.setStorageSync('user', user);
      wx.setStorageSync('tarbar',0);
      this.jiazai();
      wx.reLaunch({
        url: '/pages/index/index',
      })
    }
  },
  jiazai:function (e) {
    var a=wx.getStorageSync('user');
    var t=wx.getStorageSync('tarbar');
    if(a){
      var b= a['flag'];
      if(b==1){
        this.setData({
          zt:'退出登录'
        })
        this.setData({
          name:a['username']
        })
        this.setData({
          tel:a['tel']
        })
        if(a['kuaidi']!=0&&t==0){
          this.setData({
            chang:1,
            kuai:'进入快递员界面'
          })
        }else if(a['kuaidi']!=0&&t==1){
          this.setData({
            chang:1,
            kuai:'返回用户界面'
          })
        }else{
          this.setData({
            chang:0
          })
        }
      }
      else if(b==0){
        this.setData({
          zt:'登录'
        })
        this.setData({
          name:'昵称'
        })
        this.setData({
          tel:'头像'
        })
        this.setData({
          chang:0,
          kuai:'成为快递员'
        })
      }
    }
    else{
      this.setData({
        zt:'登录'
      })
      this.setData({
        name:'昵称'
      })
      this.setData({
        tel:'头像'
      })
      this.setData({
        chang:0,
        kuai:'成为快递员'
      })
    }
  },
  chuangeKuai:function (e) {
    var a=wx.getStorageSync('user');
    if(a['flag']==1&&this.data.kuai=='成为快递员'&&a['kuaidi']==0){
      wx.navigateTo({
        url: '/pages/chuange/chuange',
      })
    }else if(a['flag']==1&&this.data.kuai=='进入快递员界面'&&a['kuaidi']=='1'){
      wx.setStorageSync('tarbar',1)
      wx.reLaunch({
        url: '/pages/jiedan/jiedan',
      })
    }else if(a['flag']==1&&this.data.kuai=='返回用户界面'&&a['kuaidi']=='1'){
      wx.setStorageSync('tarbar',0)
      wx.reLaunch({
        url: '/pages/main/main',
      })
    }
    else{
      wx.showToast({
        title: '请先登录', 
        icon: 'error',
        duration: 1000
      })
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
    this.jiazai();
    if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 2
        })
      }
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