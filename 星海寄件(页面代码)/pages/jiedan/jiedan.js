// pages/jiedan/jiedan.js
const app = getApp();
var startX, endX;  //首先创建2个变量 来记录触摸时的原点
var moveFlag = true;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    da:'',
    ani:'',
    t:0,
    flag:0,
    danhao:'',
    page:1,
    sear:0
  },
  search:function (e) {
    this.setData({
      da:'',
    })
    if(this.data.t==1){
      this.duqu();
    }
    else{
      wx.showToast({
        title: '请登录', 
        icon: 'error',
        duration: 1000
      })
    }
  },
  duqu:function (e) {
    var that = this;
    //读取数据库
    wx.request({
      url: 'http://localhost:8085/star/du.php',
      method: 'GET',
      data: {
        danhao:that.data.danhao,
        xinxi:'chakuaidi'
      },
      header: {
        'content-Type': 'application/json'
      },
      success(res) {
        console.log(res),
          that.setData({
            da: res.data[0],
          })
          that.setData({
            sear:1
          })
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
      danhao:e.detail.value
    })
  },
  jiedan:function (e) {
    var that = this;
    //寄件信息
    wx.request({
      url: 'http://localhost:8085/star/du.php',
      method: 'GET',
      data: {
        page:this.data.page,
        xinxi:'jiedan'
      },
      header: {
        'content-Type': 'application/json'
      },
      success(res) {
          that.setData({
            ding: res.data[0],
            totalPage:res.data[1]
          })
          console.log(that.data);
      },
    });
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
      that.jiedan();
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
      that.jiedan();
    }, 200)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      ding:''
    })
    var a=wx.getStorageSync('user');
    if(a){
      var t=a['flag'];
      if(t==1){
        this.setData({
          t:1
        })
      }else{
        this.setData({
          t:0
        })
      }
      
    if(this.data.t==1){
    var that = this;
    //初始化
    wx.request({
      url: 'http://localhost:8085/star/du.php',
      method: 'GET',
      data: {
        page:1,
        xinxi:'jiedan'
      },
      header: {
        'content-Type': 'application/json'
      },
      success(res) {
          that.setData({
            ding: res.data[0],
            totalPage:res.data[1]
          })
          console.log(that.data.ding);
      },
    });
    }
    }
  },
  xiangqing:function (e) {
    var i=e.currentTarget.dataset.value;
    if(this.data.sear==0&&this.data.t==1){
      var xinxi=JSON.stringify(this.data.ding[i]);
      wx.navigateTo({
        url: '/pages/CheckPackage/CheckPackage?xinxi='+encodeURIComponent(xinxi)+'&js=3',
      })
    }else if(this.data.sear==1){
      var xinxi=JSON.stringify(this.data.da);
      wx.navigateTo({
        url: '/pages/CheckPackage/CheckPackage?xinxi='+encodeURIComponent(xinxi)+'&js=3',
      })
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
    if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 0
        })
      }
      var cc=wx.getStorageSync('user');
      if(cc){
        if(cc['uid']!=this.data.ding['寄件人uid']){
          this.setData({
            ding:''
          })
          this.jiedan();
        }var r=cc['flag'];
        if(r==1){
          this.setData({
            t:1
          })
        }
        else{
          this.setData({
            t:0
          })
        }
      }else{
        this.setData({
          t:0
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