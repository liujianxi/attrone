import Vue from 'vue'
import {Popup,Swipe, SwipeItem,Picker,DatetimePicker,TabContainer, TabContainerItem,Loadmore,Cell} from 'mint-ui';
import App from './App'
import router from './router'
import {initWx,checkLogin,setCookie,initDateFormat,wxGetPosition,isApp, getCookie} from './util/common.js'
import {sexFilter,howLong, howFar,medicareFilter,numberCountFilter} from './filter/filter.js';
Vue.component(Popup.name,Popup);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Picker.name, Picker);
Vue.component(DatetimePicker.name, DatetimePicker);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);
Vue.component(Loadmore.name, Loadmore);
Vue.component(Cell.name, Cell);
require('./assets/js/fastclick.js');
window.FastClick.attach(document.body);
window.wx = require('weixin-js-sdk');
//当前页面
window.current_page = 'index';
//微信授权信息
window.wxOAuth = {
  appId: '', //公众号的唯一标识
  timestamp: '', //生成签名的时间戳
  nonceStr: '', //生成签名的随机串
  signature: '', //签名
  longitude: '', //lng
  latitude: '' //lat
}
//"lat": 22.540945,"lng": 113.914623,"adcode": "440305","citycode": "0755"

//当前环境配置
window.env = 'dev';
//最近的机构
window.nearestOrg = {
  orgId: '',
  orgName: ''
}
//是否绑定手机
window.isBindPhone = undefined;
//初始化添加日期格式化方法
initDateFormat();
//是否dev-1.com环境
window.isPrd = false;
Vue.config.productionTip = false;
/*
 * 注册过滤器
 */
Vue.filter('sexFilter', sexFilter);
Vue.filter('howLong', howLong);
Vue.filter('howFar', howFar);
Vue.filter('medicareFilter', medicareFilter);
Vue.filter('numberCountFilter', numberCountFilter);
window.position = {};
if (window.location.hostname == 'www.1-1dr.com') {
  // window.position = {
  //   "lat": 0.0,
  //   "lng": 0.0,
  //   "adcode": "",
  //   "citycode": ""
  // };
}else{
  // if (window.location.hostname == 'dev.1-1dr.com'){
  //   require('./assets/js/vconsole.min.js');
  // }
  //当前地理位置(默认为深圳)
  // window.position = {
  //   "lat": 22.540945,
  //   "lng": 113.914623,
  //   "adcode": "440305",
  //   "citycode": "0755"
  // };
}
/*
 * 微信H5环境
 */
if (!isApp(window)) {
  console.log('wechat');
  /*
   * 微信H5环境
   */
  AMap.service('AMap.Geocoder', function () {
    window.amap = new AMap.Geocoder({
      city: "010"
    });
  });
  AMap.service('AMap.PlaceSearch', function () { //回调函数
    //实例化PlaceSearch
    window.placeSearch = new AMap.Autocomplete({
      city: '0755'
    });
  });
  checkLogin().then(function (dt) {
    // console.log(dt);
    if (!dt.g_isLogin) {
      window.location.href = dt.g_login_url;
    } else {
      window.isBindPhone = dt.isBindPhone;
      let a_str = window.location.href.split('=')[1];//第一次进
      let b_str = window.location.href.split('#/')[1].split('?')[0];//之后进
      let t_url=a_str?a_str:b_str;
      console.log(a_str);
      console.log(a_str==undefined);
      console.log(b_str);
      if(!dt.isBindPhone){//未绑定手机
        window.location.href=window.location.protocol + '//' + window.location.host + '/mobile/index.html#/login?returnuri='+t_url;
      }
      console.log('初始化wx:   ' + window.location);
      window.curr_url = location.hash.match(/#\/([^?]*)/i)[1];
      console.log(window.curr_url);
      //初始化微信SDK
      initWx(window.location.protocol + '//' + window.location.host + '/mobile/index.html', false, [
        'checkJsApi',
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'chooseImage',
        'previewImage',
        'uploadImage',
        'downloadImage',
        'getLocation',
        'scanQRCode'
      ]).then(function (res) {
        // console.log('initWx come back!' + JSON.stringify(res));
      }).catch(function (res) {
        // console.error('initWx error!' + JSON.stringify(res));
      });
      
      //初始化vue实例
      new Vue({
        el: '#app',
        router,
        template: '<App/>',
        components: {
          App
        }
      });
    }
  });
  // window.isBindPhone = true;
  // new Vue({
  // 	el: '#app',
  // 	router,
  // 	template: '<App/>',
  // 	components: { App }
  // });

} else {
  console.log('app');
  /*
   * App环境：注册jsbridge
   */
  // console.log('jsbridge init come in!');
  window.pageBridge = null;

  function setupWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) {
      return callback(WebViewJavascriptBridge);
    }
    if (window.WVJBCallbacks) {
      return window.WVJBCallbacks.push(callback);
    }
    //for android，添加监听
    document.addEventListener('WebViewJavascriptBridgeReady', function () {
      callback(WebViewJavascriptBridge)
    }, false);
    window.WVJBCallbacks = [callback];
    var WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'https://__bridge_loaded__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function () {
      document.documentElement.removeChild(WVJBIframe)
    }, 0);
  }
  if (!window.setupWebViewJavascriptBridge) {
    window.setupWebViewJavascriptBridge = setupWebViewJavascriptBridge;
  }

  //已实例化
  // if(!window.pageBridge){
  setupWebViewJavascriptBridge(function (bridge) {
    window.pageBridge = bridge;
    try {
      //初始化信息非常重要，如果缺少该方法，则Android系统无法使用
      bridge.init(function (message, responseCallback) {
        var data = {
          'web': 'bridge init success!'
        };
        responseCallback(data);
      });
    } catch (e) {
      console.error(e.message);
    }
    bridge.registerHandler('callLoginHandler', window.callLoginHandler);
    bridge.registerHandler('getKinsInfoCallback', window.getKinsInfoCallback);
  });
  // }
  window.getKinsInfoCallback = function (data) {
    console.log('data.kinsId--------' + data.kinsId);
    window.getKinsInfoCallbackId = data.kinsId;
    new Vue({
      el: '#app',
      router,
      template: '<App/>',
      components: {
        App
      },
    });
  }
  /**
   * 调用APP登录
   * @param {Object} id
   */
  window.callLoginAgainHandle = function () {
    window.pageBridge.callHandler('callLoginAgainHandle', {
        'callTime': new Date().getTime()
      },
      function (response) {
        console.info('callLoginAgainHandle call back!' + JSON.stringify(response));
      }
    );
  }

  //不检查登录的pageName
  let allowList = ['agreement', 'newsList01', 'newsList02', 'newsList03', ];
  let agreeFlag = false;
  let login_flag = true;

  function isAllow() {
    var url = location.hash.match(/#\/([^?]*)/i)[1];
    console.log('url:' + url);
    if (url == 'agreement') {
      agreeFlag = true;
    }
    if (url == 'login') {
      login_flag = false; //login在app不执行
    }
    for (let i = 0; i < allowList.length; i++) {
      if (url.indexOf(allowList[i]) != -1) { //不需要检测登录
        return true;
      }
    }
    return false;
  }
  console.info('allowList:  ' + allowList);
  let cookie_sid = getCookie('sid');
  if(cookie_sid){
    window.sid=cookie_sid;
  }
  //	Toast({message: cookie_sid,duration:3000});
  let isAllowFlag = isAllow();
  var vue_init = false;
  console.info('main.js sid:' + cookie_sid + ',isAllow:' + isAllowFlag + ',allowList:  ' + allowList);
  console.info(cookie_sid != '');
  console.info(!!cookie_sid);
  //如果不需要检查用户登录，或者sid不为空的情况下加载Vue容器
  if (isAllowFlag || !!cookie_sid) {
    if (!login_flag) {
      Toast({
        message: "请在微信上打开",
        duration: 1000
      });
    } else {
      new Vue({
        el: '#app',
        router,
        template: '<App/>',
        components: {
          App
        },
      });
      vue_init = true;
    }
  }
  /**
   * APP登录回调设置cookie
   * @param {Object} sid
   */
  window.callLoginHandler = function (data, responseCallback) {
    console.info('main.js callLoginHandler come in! ' + JSON.stringify(data));
    console.log(data);
    console.log(data.sid);
    console.log('!!data:  ' + !agreeFlag);
    if (!!data && !!data.sid && !agreeFlag) {
      setCookie({
        'sid': data.sid
      }, 30, '/');
      window.sid=data.sid;
      var cookieSid = getCookie('sid');
      console.log('main-cookieSid:   ' + cookieSid);
      responseCallback({
        'loginSetCookieTime': new Date().getTime()
      });
      if (!vue_init) {
        new Vue({
          el: '#app',
          router,
          template: '<App/>',
          components: {
            App
          },
        });
      }

    }
  }
}
