let app = getApp()
let wxSortPickerView = require('../../wxSortPickerView/wxSortPickerView.js');
let getCity = require('../../utils/getCity.js')
let util = require('../../utils/util.js')


Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotCity:[],
    allCity:[],
    selectCity:"",
    source:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var list = [];
    for (var index in getCity.City[0]) {
      if (index != "hot") {
        getCity.City[0][index].map(function (item) {
          list.push(item.name)
        })
      }
    };
    this.setData({
      "hotCity": getCity.City[0].hot,
      "allCity": list,
      "source": options.d
    });
  },
  wxSortPickerViewItemTap: function (e) {
    let source = this.data.source;
    let place = "";
    if (e.currentTarget.dataset.p) {
      place = e.currentTarget.dataset.p;
    }else{
      place = e.target.dataset.text;
    }
    if(source == "start") {
      // 存入全局和缓存
      app.globalData.selectPlace.start = place;
      wx.setStorage({
        key: "placeStart",
        data: place
      });
    }else{
      app.globalData.selectPlace.end = place;
      wx.setStorage({
        key: "placeEnd",
        data: place
      });
    }
    util.pageTo({
      url: "../index/index?place=" + place + "&d=" + source,
      opentype:4
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let list = this.data.allCity;
    var that = this;
    wxSortPickerView.init(list, that);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },


  

})