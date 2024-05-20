// pages/main/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    t:0,
    tel1: '',
    are1: '请输入真实信息',
    tel2: '',
    are2: '请输入真实信息',
    shoujian:{},
    jijian: {},
    zhong:0,
    wu:'',
    fanshi:'',
    fukuan:'',
    danhao:''
  },
  genID:function (length) {
    return Number(Math.random().toString().substr(3,length)+Date.now()).toString(36);
  },
  fu:function (e) {
    if(this.data.t==1){
    this.setData({
      fukuan:e.detail.value
    })
  }
  else{
    wx.showToast({
      title: '请登录', 
      icon: 'error',
      duration: 1000
    })
  }
  },
  fan:function (e) {
    if(this.data.t==1){
    this.setData({
      fanshi:e.detail.value
    })
  }
  else{
    wx.showToast({
      title: '请登录', 
      icon: 'error',
      duration: 1000
    })
  }
  },
lei:function (e) {
  if(this.data.t==1){
  this.setData({
    wu:e.detail.value
  })
   let wu=this.data.wu;
  switch (wu) {
    case '1':
      wu=1;
      break;
    case '2':
      wu=3;
      break;
    case '3':
      wu=1;
      break;
    case '4':
      wu=8;
      break;
    case '5':
      wu=20;
      break;
    case '6':
      wu=10;
      break;
    default:
      wu=1;
      break;
  }
  this.setData({
    zhong:wu
  })
}
else{
  wx.showToast({
    title: '请登录', 
    icon: 'error',
    duration: 1000
  })
}
},
jian:function(e) {
  if(this.data.t==1){
  var zhong=this.data.zhong;
  if(zhong>0){
    zhong--;
  }
  this.setData({
    zhong:zhong
  })
}
else{
  wx.showToast({
    title: '请登录', 
    icon: 'error',
    duration: 1000
  })
}
},
jia:function(e) {
  if(this.data.t==1){
  var zhong=this.data.zhong;
  if(zhong<1000){
    zhong++;
  }
  this.setData({
    zhong:zhong
  })
}
else{
  wx.showToast({
    title: '请登录', 
    icon: 'error',
    duration: 1000
  })
}
},
zhuan1:function (e) {
  if(this.data.t==1){
  console.log(this.data.jijian);
  var jijian = JSON.stringify(this.data.jijian);
  wx.navigateTo({
    url: '/pages/jijianren/jijianren?jijian='+encodeURIComponent(jijian),
  })
}
else{
  wx.showToast({
    title: '请登录', 
    icon: 'error',
    duration: 1000
  })
}
},
zhuan2:function (e) {
  if(this.data.t==1){
  var shoujian=JSON.stringify(this.data.shoujian);
  wx.navigateTo({
    url: '/pages/shoujianren/shoujianren?shoujian='+encodeURIComponent(shoujian),
  })
}
else{
  wx.showToast({
    title: '请登录', 
    icon: 'error',
    duration: 1000
  })
}
},
cun:function (e) {
  if(this.data.t==1){
  if(!this.data.tel1){
    wx.showToast({
      title: '请填写寄件人信息', 
      icon: 'error',
      duration: 1000
    })
  }
  else if(!this.data.tel2){
    wx.showToast({
      title: '请填写收件人信息', 
      icon: 'error',
      duration: 1000
    })
  }
  else if(!this.data.wu){
    wx.showToast({
      title: '请选择物品类型', 
      icon: 'error',
      duration: 1000
    })
  }
  else if(this.data.zhong==0){
    wx.showToast({
      title: '请填写好物品重量', 
      icon: 'error',
      duration: 1000
    })
  }
  else if(!this.data.fanshi){
    wx.showToast({
      title: '请选择寄件方式', 
      icon: 'error',
      duration: 1000
    })
  }
  else if(!this.data.fukuan){
    wx.showToast({
      title: '请选择付款方式', 
      icon: 'error',
      duration: 1000
    })
  }
  else{
    this.setData({
      danhao:this.genID(18)
    })
    var biao={
      danhao:this.data.danhao,
      name1:this.data.jijian.name1,
      name2:this.data.shoujian.name2,
      area1:this.data.are1,
      area2:this.data.are2,
      tel1:this.data.tel1,
      tel2:this.data.tel2,
      company1:this.data.jijian.company1,
      company2:this.data.shoujian.company2,
      weight:this.data.zhong,
      type:this.data.wu,
      fanshi:this.data.fanshi,
      fukuan:this.data.fukuan
    }
    this.xieru(biao);
  }
  }
  else{
    wx.showToast({
      title: '请登录', 
      icon: 'error',
      duration: 1000
    })
  }
},
xieru:function (biao) {
  var that=this;
  //写入数据库
  wx.request({
    url: 'http://localhost:8085/star/xie.php',
    method: 'GET',
    data: {
      biao:JSON.stringify(biao),
      xinxi:'dindan'
    },
    header: {
      'content-Type': 'application/x-www-form-urlencoded'
    },
    success(res) {
      console.log(biao);
      console.log(res.data);
      if (res.data.status == 0) {
        wx.showToast({
          title: '提交失败！！！',
          icon: 'loading',
          duration: 1500
        })
      } else if(res.data.status == 1){
        wx.showToast({
          title: '提交成功！！！', 
          icon: 'success',
          duration: 1000
        })
      }
      wx.reLaunch({
        url: '/pages/index/index',
      })
    }
  });
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
    var tr=wx.getStorageSync('user');
    if(tr){
      if(tr['flag']==1){
        this.setData({
          t:1
        })
      }
      else if(tr['flag']==0){
        this.setData({
          t:0
        })
      }
    }else{
      this.data.t=0;
    }
    if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 0
        })
      }
    if(this.data.shoujian.area2!=null){
      this.setData({
        tel2:this.data.shoujian.tel2
      })
      this.setData({
        are2:this.data.shoujian.region[0]+this.data.shoujian.region[1]+this.data.shoujian.region[2]+this.data.shoujian.area2
      })
    }
    if(this.data.jijian.area1!=null){
      this.setData({
        tel1:this.data.jijian.tel1
      })
      this.setData({
        are1:this.data.jijian.region[0]+this.data.jijian.region[1]+this.data.jijian.region[2]+this.data.jijian.area1
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