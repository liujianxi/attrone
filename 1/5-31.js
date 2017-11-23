import Vue from 'vue'
import App from './App'
import router from './router'
import Mint from 'mint-ui'
// import VueResource from 'vue-resource';
import 'mint-ui/lib/style.css';
import {initWx,setCookie,initDateFormat,wxGetPosition,isApp,getCookie} from './util/common.js'
import {sexFilter,howLong,howFar,medicareFilter} from './filter/filter.js';
import Event from './util/Event.js'

window.FastClick = require('fastclick');
window.wx = require('weixin-js-sdk');
// require('./assets/js/vconsole.min.js');

//当前页面
window.current_page = 'index';
//微信授权信息
window.wxOAuth = {
	appId     : '',	//公众号的唯一标识
	timestamp : '',	//生成签名的时间戳
	nonceStr  : '',	//生成签名的随机串
	signature : '',	//签名
	longitude : '',	//lng
	latitude  : ''	//lat
}
//当前地理位置(默认为广州)
window.position = {
	"lat":22.540945,
	"lng":113.914623,
	"adcode":"440305",
	"citycode":"0755"
};
//当前环境配置
window.env = 'dev';
//最近的机构
window.nearestOrg = {
	orgId   : '',
	orgName : ''
}

//初始化添加日期格式化方法
initDateFormat();


//设置触屏
FastClick.attach(document.body);

Vue.config.productionTip = false;

Vue.use(Mint);

/*
 * 注册过滤器
 */
Vue.filter('sexFilter',sexFilter);
Vue.filter('howLong',howLong);
Vue.filter('howFar',howFar);
Vue.filter('medicareFilter',medicareFilter);

/*
 * 微信H5环境
 */
if(!isApp(window)){
	// console.log('wx init come in!');
	//js接口
	var jsApiList = ['checkJsApi','onMenuShareTimeline',
	'onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo',
	'chooseImage','previewImage','uploadImage','downloadImage',
	'getLocation'];
	//当前页面地址
	var curUrl = 'http://dev.1-1dr.com/mobile/index.html';
	//初始化微信SDK
	initWx(curUrl,false,jsApiList).then(function(res){
		// console.log('initWx come back!' + JSON.stringify(res));
	}).catch(function(res){
		console.error('initWx error!' + JSON.stringify(res));
	});

	// console.log('AMap init come in!');
	/**
	 * 实例化AMap Geocoder 
	 */
	AMap.service('AMap.Geocoder',function(){
	    window.amap = new AMap.Geocoder({
	        city: "010"
	    });
	});

	AMap.service('AMap.PlaceSearch',function(){//回调函数
	    //实例化PlaceSearch
	    window.placeSearch= new AMap.Autocomplete({
	    	city : '0755'
	    });
	});


	/* eslint-disable no-new */
	new Vue({
	  el: '#app',
	  router,
	  template: '<App/>',
	  components: { App },
	});
	
}else{
	/*
	 * App环境：注册jsbridge
	 */
	// console.log('jsbridge init come in!');
	window.pageBridge = null;
	function setupWebViewJavascriptBridge(callback){
		if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
		if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
		//for android，添加监听
	    document.addEventListener('WebViewJavascriptBridgeReady', function() {
			callback(WebViewJavascriptBridge)
		}, false);
		window.WVJBCallbacks = [callback];
		var WVJBIframe = document.createElement('iframe');
	    WVJBIframe.style.display = 'none';
	    WVJBIframe.src = 'https://__bridge_loaded__';
	    document.documentElement.appendChild(WVJBIframe);
	    setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0);
	}
	if(!window.setupWebViewJavascriptBridge){
		window.setupWebViewJavascriptBridge = setupWebViewJavascriptBridge;
	}

	//已实例化
	// if(!window.pageBridge){
		setupWebViewJavascriptBridge(function(bridge){
			window.pageBridge = bridge;
			try{
				//初始化信息非常重要，如果缺少该方法，则Android系统无法使用
				bridge.init(function(message, responseCallback) {
					var data = { 'web':'bridge init success!' }
					responseCallback(data);
				});
			}catch(e){
				console.error(e.message);
			}
			bridge.registerHandler('callLoginHandler', window.callLoginHandler);
		});
	// }
	 
	/**
	 * 调用APP登录
	 * @param {Object} id
	 */
	window.callLoginAgainHandle = function(){
		window.pageBridge.callHandler('callLoginAgainHandle',{'callTime':new Date().getTime()},
			function(response) {
				console.info('callLoginAgainHandle call back!'+JSON.stringify(response));
	   		}
		);
	}

	//不检查登录的pageName
	let allowList = ['agreement'];
	function isAllow(){
		var url = window.location.href;
		// console.log('url:'+url);
		for(let i=0;i<allowList.length;i++){
			if(url.indexOf(allowList[i]) != -1){
				return true;
			}
		}
		return false;
	}

	let cookie_sid = getCookie('sid');
	let isAllowFlag = isAllow();
	var vue_init = false;

	console.info('main.js sid:'+cookie_sid+',isAllow:'+isAllowFlag);
	
	//如果不需要检查用户登录，或者sid不为空的情况下加载Vue容器
	if(isAllowFlag || !!cookie_sid){
		new Vue({
		  el: '#app',
		  router,
		  template: '<App/>',
		  components: { App },
		});
		vue_init = true;
	}

	/**
	 * APP登录回调设置cookie
	 * @param {Object} sid
	 */
	window.callLoginHandler = function(data, responseCallback){
		console.info('main.js callLoginHandler come in! ' +JSON.stringify(data));
		try{
			setCookie({'sid':data.sid});
			responseCallback({'loginSetCookieTime':new Date().getTime()});
			//app需要等app设置完sid后再加载vue
			if(!vue_init){
				new Vue({
				  el: '#app',
				  router,
				  template: '<App/>',
				  components: { App },
				});
			}
		}catch(e){
			console.error(e.message);
		}
	}


	new Vue({
	  el: '#app',
	  router,
	  template: '<App/>',
	  components: { App },
	});
}