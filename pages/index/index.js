//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js')

Page({
  data: {
    userInfo: {},
    place:{
      start:"",
      end:""
    }
  },
  onLoad:function (options) {
    console.log('加载完毕');
    console.log(options)
    if (!options.d){
      // 默认在start内的默认定位
      util.coordinates((data) => {
        console.log(data);
        app.globalData.selectPlace.start = data.address_component.city;
        wx.setStorage({
          key: "placeStart",
          data: data.address_component.city
        });
        this.setData({
          "place.start": data.address_component.city || "北京"
        })
      });
    }
    let obj = app.globalData.selectPlace;
    if (obj.start == "" || obj.end == ""){
      obj.start = wx.getStorage({ key: 'placeStart'});
      obj.end = wx.getStorage({ key: 'placeEnd' });
    }
    this.setData({
      "place.start": obj.start,
      "place.end": obj.end
    })
    // if (options.d == "start") {
      // this.setData({
      //   "place.start": options.place
      // })
    // }else {
    //   this.setData({
    //     "place.end": options.place
    //   })
    // }
  },
  // 事件处理函数
  btnFn:function (e) {
    util.pageTo({
      url:"../place/place?d=" + e.target.dataset.d
    });
  }
})
