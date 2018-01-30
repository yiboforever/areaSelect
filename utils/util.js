const app = getApp();
//正式网，测试网；
const sendType = true;
let ajaxSendUrl = sendType ? "" : "";
// 网络请求函数
const ajax = function (options, callback) {
  let userObject = app.globalData.userInfo;
  let _url = options.url;
  let data = options.data || {};


  if (_url.indexOf("http") < 0) {
    _url = ajaxSendUrl + _url;
  }

  if (userObject != null) {
    data.token = userObject.token;
    data.uid = userObject.uid;
  } else {
    data.token = "0";
    data.uid = "0";
  }

  wx.request({
    url: _url,
    data: data,
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    method: options.method || "POST",
    success: function (res) {
      let data = res.data;

      if (callback) callback(data);
    },
    fail: function (res) {
      toast({ title: "服务器响应失败" });
    }
  });
}


//toast弹窗
const toast = function (options) {
  let data = {
    title: options.title,
    icon: options.icon || "success",
    duration: options.duration || 2000
  }
  if (typeof options.icon == "undefined") {
    data.image = "../../src/Error.png";
  }
  wx.showToast(data);
}


// 路径跳转函数
const pageTo = function (options) {
  let data = {
    url: options.url,
    success: function () {
      if (options.callback) options.callback();
    }
  };
  switch (parseInt(options.opentype)) {
    case 1:
      wx.redirectTo(data);
      break;
    case 2:
      wx.switchTab(data);
      break;
    case 3:
      wx.navigateBack(data);
      break;
    case 4:
      wx.reLaunch(data);
      break;
    default:
      wx.navigateTo(data);
      break;
  }
}

// 获取当前坐标的城市
const coordinates = function (callback) {
  let latitude, longitude;
  wx.getLocation({
    type: 'wgs84',
    success: function (res) {
      latitude = res.latitude
      longitude = res.longitude
      getCity(latitude, longitude);
    }
  });
  var getCity = (lat,lon) => {
    ajax({
      url:"http://apis.map.qq.com/ws/geocoder/v1/",
      data:{
        location:lat + "," + lon,
        key:"OLIBZ-MBG3P-NYXDX-VP2F4-J62DE-NKFQZ"
      }
    },(res) => {
      // 请求错误
      if(res.status != 0) {
        toast({
          title:res.message
        })
        return;
      }else {
        if (callback) callback(res.result);
      }
    })
  }
}


module.exports = {
  ajax:ajax,
  toast: toast,
  pageTo: pageTo,
  coordinates: coordinates
}

