import http from '../service/api.js';
import {
  Toast,Indicator
} from 'mint-ui';


export function initDateFormat() {
  Date.prototype.format = function (fmt) {
    var o = {
      "M+": this.getMonth() + 1, //月份         
      "d+": this.getDate(), //日         
      "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时         
      "H+": this.getHours(), //小时         
      "m+": this.getMinutes(), //分         
      "s+": this.getSeconds(), //秒         
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度         
      "S": this.getMilliseconds() //毫秒         
    };
    var week = {
      "0": "/u65e5",
      "1": "/u4e00",
      "2": "/u4e8c",
      "3": "/u4e09",
      "4": "/u56db",
      "5": "/u4e94",
      "6": "/u516d"
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[this.getDay() + ""]);
    }
    for (var k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      }
    }
    return fmt;
  }
}

export function isEmpty(obj) {
  for (var name in obj) {
    return false;
  }
  return true;
}


export function initWx(curUrl, isDebug, jsApiList) {
  return new Promise(function (resolve, reject) {
    //发送请求
    http.post('/json/GetWxOAuth', {
      curUrl: curUrl
    }).then(function (res) {
      try {
        let appId = res.body.wxOAuth.appId;
        let timestamp = res.body.wxOAuth.timestamp;
        let nonceStr = res.body.wxOAuth.nonceStr;
        let signature = res.body.wxOAuth.signature;
        // console.log(res);
        window.wx.config({
          debug: isDebug, //开启调试模式
          appId: appId, // 必填，公众号的唯一标识
          timestamp: timestamp, // 必填，生成签名的时间戳
          nonceStr: nonceStr, // 必填，生成签名的随机串
          signature: signature, // 必填，签名
          jsApiList: jsApiList //必填，需要使用的JS接口列表
        });
        window.wxOAuth.appId = appId;
        window.wxOAuth.timestamp = timestamp;
        window.wxOAuth.nonceStr = nonceStr;
        window.wxOAuth.signature = signature;

        window.wx.error(function () {
          console.error("wx error!");
          reject();
        })
        resolve();
      } catch (e) {
        reject();
      }
    });
  });
};

export function checkLogin() {
  let str = window.location.href.split('#')[1].split('/')[1];
  console.log('str:' + str);
  return new Promise((resolve, reject) => {
    http.post('/json/CheckLogin', {
        state: str,
      })
      .then((dt) => {
        resolve(dt.body);
      });
  });

}

export function wxGetPosition() {
  return new Promise(function (resolve, reject) {
    if (!window.isPrd) { //测试环境默认广州
      resolve({
        lat: window.position.lat,
        lng: window.position.lng
      });
    }

    if (window.wx.ready) {
      window.wx.ready(function () {
        console.info('common wx.ready come in!');
        let flag=true;
        Indicator.open();
        wx.getLocation({
          //默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
          type: 'wgs84',
          success: function (res) {
            console.info('common wx.getLocation success!');
            flag=false;
            var lng = (parseFloat(res.longitude) + 0.005173);
            var lat = (parseFloat(res.latitude) + -0.002888);
            resolve({
              lng: lng,
              lat: lat
            });
          },
          fail: function (res) {
            console.info('common wx.getLocation fail!');
            flag=false;
            reject(res);
          }
        });
        setTimeout(function(){
          if(flag){//没有进入getlocation
            reject();
          }
        },2000)
      });
    } else {
      console.error('wxGetPosition error!wx.ready undefined');
      reject();
    }

  });
}

export function amapGetPosition(context, lnglat) {
  // console.info('common amapGetPosition come in!');
  return new Promise(function (resolve, reject) {
    context.getAddress(lnglat, function (status, result) {
      if (status === 'complete' && result.info === 'OK') {
        // console.info('common amapGetPosition success!');
        //获取地址信息成功
        var citycode = result.regeocode.addressComponent.citycode;
        var adcode = result.regeocode.addressComponent.adcode;
        resolve({
          citycode: citycode,
          adcode: adcode
        });
      } else {
        reject(result);
      }
    });
  });
}

export function isApp(w) {
  if (w.navigator.userAgent.toLocaleLowerCase().match(/MicroMessenger/i) == 'micromessenger') {
    return false;
  } else {
    return true;
  }
}


//setCookie({'storeId':t_storeid}, undefined, " path=/;");
export function setCookie(cook, expiredays, path) { //按天数设置, encodeURIComponent加密需要服务器端解密, expire和max-age都是设置过期时间，max-age更新一些
  var path = path || '';
  for (var i in cook) {
    if (expiredays === undefined) { //未设置当作session cookie
      document.cookie = i + '=' + encodeURIComponent(cook[i]) + ';' + path;
    } else {
      if (expiredays < 0)
        document.cookie = i + '=' + encodeURIComponent(cook[i]) + "; max-age=-1;" + path; //max-age负数，仅在窗口生效
      else if (expiredays == 0)
        document.cookie = i + '=' + encodeURIComponent(cook[i]) + "; max-age=0;" + path; //为0删除cookie
      else
        document.cookie = i + '=' + encodeURIComponent(cook[i]) + "; max-age=" + expiredays * 24 * 60 * 60 + ';' + path; //按秒计算
    }
  }
}

export function getCookie(key) {
  var matchs = document.cookie.match(new RegExp('\\S*' + key + '=([^;]*)', 'i'));
  if (!!matchs && matchs.length > 1) {
    return decodeURIComponent(matchs[1]);
  }
  return false;
}

export function delCookie(name) {
  window.document.cookie = name + '=;expires=' + new Date().toUTCString() + ';path=/';
  console.log('delcookie1:    ' + window.document.cookie);
  window.document.cookie = name + '=;expires=' + new Date().toUTCString();
  window.document.cookie = name + '=;expires=' + new Date().toUTCString();
  console.log('delcookie2:    ' + window.document.cookie);
  window.document.cookie = name + '=;expires=' + new Date().toUTCString() + ';path="/mobile/"';
}

export function setStorage(key, value) {
  if (window.sessionStorage) {
    if (typeof value == 'object') {
      sessionStorage.setItem(key, JSON.stringify(value));
    } else {
      sessionStorage.setItem(key, value);
    }
  } else {
    window.key = value;
  }
}

export function getStorage(key) {
  if (window.sessionStorage) {
    var item = sessionStorage.getItem(key);
    if (item != null) { //存在这个
      try {
        return JSON.parse(item);
      } catch (e) {
        return item;
      }
    }
    return false;
  } else {
    return window.key;
  }
}

export function getCurrentUrl(current_page) {
  var currentUrlStr = 'returnUri=/';
  if (current_page) {
    currentUrlStr += current_page;
  }
  currentUrlStr = encodeURIComponent(currentUrlStr);
  return currentUrlStr;
}

export function wxUploadImage(wx, id) {
  return new Promise(function (resolve, reject) {
    wx.uploadImage({
      //需要上传的图片的本地ID，由chooseImage接口获得
      localId: id,
      // 默认为1，显示进度提示
      isShowProgressTips: 0,
      success: function (res) {
        /**
         * 成功响应
         * {"serverId":"1EfilXo0oXv09LpfD21fDVeEogQewNyshARujVqJW1Jw44NVgCeus-3bIy1NwNxx","mediaUrl":"","errMsg":"uploadImage:ok"}
         */
        resolve(res);
      },
      fail: function (res) {
        reject(res);
      }
    });
  });
}
export function wxUploadQrcode(wx){
  return new Promise(function (resolve, reject) {
    wx.scanQRCode({
      needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
      scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
      success: function (res) {
          resolve(res.resultStr); // 当needResult 为 1 时，扫码返回的结果
      },
      fail:function(res){
        reject(res);
      },
    });
  })
}
export function wxChooseImage(wx, options) {
  return new Promise(function (resolve, reject) {
    wx.chooseImage({
      // 选择照片数量，默认9
      count: 1,
      // 可以指定是原图还是压缩图，默认二者都有
      sizeType: ['original', 'compressed'],
      // 可以指定来源是相册还是相机，默认二者都有
      sourceType: ['album', 'camera'],
      success: function (res) {
        /*
         * 1.选择相册响应
         * {"sourceType":"album","localIds":["weixin://resourceid/ecfe2cc41aee65d414c1129844937234"],"errMsg":"chooseImage:ok"}
         * 2.选择拍照响应
         * {"sourceType":"camera","localIds":["weixin://resourceid/c2532c819be02f059b80ddfec3977755"],"errMsg":"chooseImage:ok"}
         */
        resolve(res);
      },
      fail: function (res) {
        reject(res);
      }
    });
  });
}

export function isEmptyStr(str) {
  if (str == null || str == undefined || str == '') {
    return true;
  } else {
    return false;
  }
}

export default {
  isEmptyStr(str) {
    if (str == null || str == undefined || str == '') {
      return true;
    } else {
      return false;
    }
  },
  isContains(arr, item) {
    for (let i in arr) {
      if (arr[i] == item) {
        return true;
      }
    }
    return false;
  },
  reportErr(context, msg, errObj) {
    console.error(msg + ':' + JSON.stringify(errObj));
  },
  format(date, fmt) {
    var o = {
      "M+": date.getMonth() + 1, //月份
      "d+": date.getDate(), //日
      "h+": date.getHours(), //小时
      "m+": date.getMinutes(), //分
      "s+": date.getSeconds() //秒
    };
    if (/(y+)/.test(fmt)) {

    }
  }
}
