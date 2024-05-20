// pages/send/send.js
const app = getApp();
var startX, endX;  //首先创建2个变量 来记录触摸时的原点
var moveFlag = true;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    xian:{
      订单号:'订单号',
      寄件人uid:'寄件人ID',
      寄件人姓名:'寄件人姓名',
      寄件人地址:'寄件人地址',
      寄件人电话:'寄件人电话',
      寄件人公司:'寄件人公司',
      收件人uid:'收件人ID',
      收件人姓名:'收件人姓名',
      收件人地址:'收件人地址',
      收件人电话:'收件人电话',
      收件人公司:'收件人公司',
      物品类型:0,
      物品重量:0,
      物流状态:0,
      派件时间:'派件时间',
      送达时间:'送达时间',
      签收时间:'签收时间',
      寄件方式:0,
      付款方式:0,
      快递员uid:'快递员ID',
      快递员电话:'快递员电话'
    },
    da:{
      订单号:'订单号',
      寄件人uid:'寄件人ID',
      寄件人姓名:'寄件人姓名',
      寄件人地址:'寄件人地址',
      寄件人电话:'寄件人电话',
      寄件人公司:'寄件人公司',
      收件人uid:'收件人ID',
      收件人姓名:'收件人姓名',
      收件人地址:'收件人地址',
      收件人电话:'收件人电话',
      收件人公司:'收件人公司',
      物品类型:0,
      物品重量:0,
      物流状态:0,
      派件时间:'派件时间',
      送达时间:'送达时间',
      签收时间:'签收时间',
      寄件方式:0,
      付款方式:0,
      快递员uid:'快递员ID',
      快递员电话:'快递员电话'
    },
    sear:0,
    page:1,
    ani:'',
    send:''
  },
  onInfo() {
  },
  shanchu:function (e) {
    var that=this;
    var u;
    console.log(that.data);
    if(that.data.xian!=null){
    if(that.data.sear==0){
      u=that.data.xian['订单号'];
    }else{
      u=that.data.da['订单号'];
    }
    //写入数据库
    wx.request({
      url: 'http://localhost:8085/star/xie.php',
      method: 'GET',
      data: {
        danhao:u,
        xinxi:'shanchu'
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
            url: '/pages/send/send',
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
        danhao:that.data.send,
        xinxi:'chakuaidi'
      },
      header: {
        'content-Type': 'application/json'
      },
      success(res) {
        console.log(res);
        if(res.data==''){
          wx.showToast({
            title: '没有找到该快递', 
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
      send:e.detail.value
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
      that.sd();
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
      that.sd();
    }, 200)
  },
  sd:function (e) {
    var that = this;
    //寄件信息
    wx.request({
      url: 'http://localhost:8085/star/du.php',
      method: 'GET',
      data: {
        page:this.data.page,
        xinxi:'send'
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
    this.sd();
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