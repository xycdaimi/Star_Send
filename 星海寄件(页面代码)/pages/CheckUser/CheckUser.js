const app = getApp();
var startX, endX;  //首先创建2个变量 来记录触摸时的原点
var moveFlag = true;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    xian:{
      uid:'用户ID',
      username:'用户昵称',
      password:'用户密码',
      sex:null,
      tel:'手机号',
      area:'地址',
      kuaidi:4
    },
    da:{
      uid:'用户ID',
      username:'用户昵称',
      password:'用户密码',
      sex:null,
      tel:'手机号',
      area:'地址',
      kuaidi:4
    },
    info:{
      4:'用户权限',
      0:'普通用户',
      1:'快递员',
      2:'客服',
      3:'管理员'
    },
    sear:0,
    page:1,
    ani:'',
    yonghu:''
  },
  shanchu:function (e) {
    var that=this;
    var u;
    if(that.data.xian!=null){
    if(this.data.sear==0){
      u=this.data.xian['uid'];
    }else{
      u=this.data.da['uid'];
    }
    //写入数据库
    wx.request({
      url: 'http://localhost:8085/star/xie.php',
      method: 'GET',
      data: {
        uid:u,
        xinxi:'shan'
      },
      header: {
        'content-Type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        console.log(res.data);
        if (res.data.status == 0) {
          wx.showToast({
            title: '删除失败！！！',
            icon: 'loading',
            duration: 1500
          })
        } else if(res.data.status ==1) {
          wx.showToast({
            title: '删除成功！！！', 
            icon: 'success',
            duration: 1000
          })
          wx.redirectTo({
            url: '/pages/CheckUser/CheckUser',
          })
        }
      }
    });
    }else{
      wx.showToast({
        title: '已无记录！！！', 
        icon: 'error',
        duration: 1000
      })
    }
  },
  onInfo() {
  },
  search:function (e) {
    this.duqu();
  },
  duqu:function (e) {
    var that = this;
    //读取数据库
    wx.request({
      url: 'http://localhost:8085/star/du.php',
      method: 'GET',
      data: {
        yonghu:that.data.yonghu,
        xinxi:'chayonghu'
      },
      header: {
        'content-Type': 'application/json'
      },
      success(res) {
        console.log(res);
        if(res.data==''){
          wx.showToast({
            title: '没有该用户', 
            icon: 'error',
            duration: 1000
          })
        }else{
          that.setData({
            da: res.data[0],
          })
          that.setData({
            sear:1
          })
        }
      },
    });
  },
  onsetsearch:function (e) {
    if(e.detail.value==''){
      this.setData({
        sear:0
      })
    }
    this.setData({
      yonghu:e.detail.value
    })
  },
  touchStart: function (e) {
 
    startX = e.touches[0].pageX; // 获取触摸时的原点
 
    moveFlag = true;
 
  },
  // 触摸移动事件
  touchMove: function (e) {
    endX = e.touches[0].pageX; // 获取触摸时的原点
    if (moveFlag) {
      if (endX - startX > 50) {
        console.log("move right");
        this.move2right();
        moveFlag = false;
      }
      if (startX - endX > 50) {
        console.log("move left");
        this.move2left();
        moveFlag = false;
      }
    }
  },
  // 触摸结束事件
  touchEnd: function (e) {
    moveFlag = true; // 回复滑动事件
  },
  //向左滑动操作
  move2left() {
    var that = this;
    if (this.data.page >= this.data.totalPage) { 
      return
    }
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
      delay: 100
    });
    animation.opacity(0.2).translate(-500, 0).step()
    this.setData({ 
      ani: animation.export() 
    })
    animation.opacity(1).translate(0, 0).step()
    setTimeout(function () {
      that.setData({
        page: ++that.data.page, 
        ani: animation.export()
      });
      that.yonghu();
    }, 200) 
  },
 
  //向右滑动操作
  move2right() {
    var that = this;
    if (this.data.page == 1) {
      return
    }
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
      delay: 100
    });
    animation.opacity(0.2).translate(500, 0).step()
    this.setData({
      ani: animation.export()
    })
    animation.opacity(1).translate(0, 0).step()
    setTimeout(function () {
      that.setData({
        page: --that.data.page,
        ani: animation.export()
      });
      that.yonghu();
    }, 200)
  },
  yonghu:function (e) {
    var that = this;
    //寄件信息
    wx.request({
      url: 'http://localhost:8085/star/du.php',
      method: 'GET',
      data: {
        page:this.data.page,
        xinxi:'yonghu'
      },
      header: {
        'content-Type': 'application/json'
      },
      success(res) {
          that.setData({
            xian: res.data[0][0],
            totalPage:res.data[1]
          })
          console.log(res.data);
      },
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.yonghu();
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