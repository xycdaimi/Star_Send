Component({
  data: {
    id:0,
    selected: 0,
    color: "#8E8E8E",
    selectedColor: "#67CBF8",
    list: [],
    user: [
      {
        pagePath: "/pages/main/main",
        text: "寄快递",
        iconPath: "/img/首页.png",
        selectedIconPath: "/img/首页-2.png"
      },
      {
        pagePath: "/pages/kuaidi/kuaidi",
        text: "查快递",
        iconPath: "/img/寄件.png",
        selectedIconPath: "/img/寄件-2.png"
      },
      {
        pagePath: "/pages/geren/geren",
        text: "我",
        iconPath: "/img/个人.png",
        selectedIconPath: "/img/个人-2.png"
      }
    ],
    kuai:[
      {
        pagePath: "/pages/jiedan/jiedan",
        text: "接单",
        iconPath: "/img/包裹.png",
        selectedIconPath: "/img/包裹-2.png"
      },
      {
        pagePath: "/pages/paisong/paisong",
        text: "待派送",
        iconPath: "/img/物流.png",
        selectedIconPath: "/img/物流-2.png"
      },
      {
        pagePath: "/pages/geren/geren",
        text: "我",
        iconPath: "/img/个人.png",
        selectedIconPath: "/img/个人-2.png"
      }
    ]
  },
  attached() {
    var t=wx.getStorageSync('user');
    var c=wx.getStorageSync('tarbar');
    console.log(t);
    if(t){
    this.setData({
      id:c
    })}
    if(this.data.id==0){
    this.setData({
      list:this.data.user
    })
    }else if(this.data.id==1&&t['flag']==1){
      this.setData({
        list:this.data.kuai
      })
    }
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
    }
  }
})