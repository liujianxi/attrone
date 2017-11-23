import Vue from 'vue'
import App from './App'
import router from './router'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css';
import {initWx,checkLogin, setCookie,setStorage, getStorage,initDateFormat,wxGetPosition,isApp,getCookie} from './util/common.js'
import {sexFilter,howLong,howFar,medicareFilter} from './filter/filter.js';
import { APP_NO_CHECK_LOGIN } from './util/const.js';

window.FastClick = require('fastclick');
FastClick.attach(document.body);

window.wx = require('weixin-js-sdk');
require('./assets/js/vconsole.min.js');

//当前页面
window.current_page = 'index';
//微信授权信息
window.wxOAuth = {
	appId     : '',	//公众号的唯一标识
	timestamp : '',	//生成签名的时间戳
	nonceStr  : '',	//生成签名的随机串
	signature : ''	//签名
}
//全局保存地理位置(默认为广州)
window.position = {
	"lat":22.540945,
	"lng":113.914623,
	"adcode":"440106",
	"citycode":"440100"
};
//当前环境配置
window.isPrd = location.host.indexOf('localhost') == -1
//最近的机构
window.nearestOrg = {
	orgId   : '',
	orgName : ''
}
//是否绑定手机
window.isBindPhone = undefined;


//初始化添加日期格式化方法
initDateFormat();


Vue.config.productionTip = false;

Vue.use(Mint);

/*
 * 注册过滤器
 */
Vue.filter('sexFilter',sexFilter);
Vue.filter('howLong',howLong);
Vue.filter('howFar',howFar);
Vue.filter('medicareFilter',medicareFilter);


if(!isApp(window)){
	/*
	* 微信H5环境
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
	checkLogin().then(function(dt){
		if(!dt.g_isLogin){
			window.location.href = dt.g_login_url;
		} else {
			window.isBindPhone = dt.isBindPhone;		
			//初始化微信SDK
			initWx('http://dev.1-1dr.com/mobile/index.html',false,[
				'checkJsApi',
				'onMenuShareTimeline',
				'onMenuShareAppMessage',
				'onMenuShareQQ',
				'onMenuShareWeibo',
				'chooseImage',
				'previewImage',
				'uploadImage',
				'downloadImage',
				'getLocation'
			]).then(function(res){
				// console.log('initWx come back!' + JSON.stringify(res));
			}).catch(function(res){
				console.error('initWx error!' + JSON.stringify(res));
			});
			
			//初始化vue实例
			new Vue({
				el: '#app',
				router,
				template: '<App/>',
				components: { App }
			});

		}
	});


}else{
	/*
	 * App环境：注册jsbridge
	 */
	function setupWebViewJavascriptBridge(callback) {
		if (window.WebViewJavascriptBridge) { 
			console.log('wvjb callback if1');
			return callback(WebViewJavascriptBridge);
		}else{
			console.log('wvjb callback if2');			
			document.addEventListener('WebViewJavascriptBridgeReady', function() {
				console.log('wvjb callback if22', !!WebViewJavascriptBridge, Object.keys(WebViewJavascriptBridge));							
				callback(WebViewJavascriptBridge);
			}, false);
		}

        if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
        window.WVJBCallbacks = [callback];
        var WVJBIframe = document.createElement('iframe');
        WVJBIframe.style.display = 'none';
        WVJBIframe.src = 'https://__bridge_loaded__';
        document.documentElement.appendChild(WVJBIframe);
        setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
    }

	function initVue(){
		window.isBindPhone = true;
		new Vue({
			el: '#app',
			router,
			template: '<App/>',
			components: { App },
		});
	}
	/**
	 * 此方法仅仅能够调用一次，所有的native回调都必须在这里注册。内部出错不会console出来
	 */
	setupWebViewJavascriptBridge(function(bridge){
		var uniqueId = 1
		function log(message, data) {
			var log = document.getElementById('log')
			var el = document.createElement('div')
			el.className = 'logLine'
			el.innerHTML = uniqueId++ + '. ' + message + ':<br/>' + JSON.stringify(data)
			if (log.children.length) { log.insertBefore(el, log.children[0]) }
			else { log.appendChild(el) }
		}

		if(/(Android);?[\s\/]+([\d.]+)?/i.test(navigator.userAgent)){		//安卓系统中初始化信息
			bridge.init(function(message, responseCallback) {
				var data = { 'web':'bridge init success!' }
				responseCallback(data);
			});
		}

		bridge.registerHandler('callLoginHandler', function(data, responseCallback){
			console.info(!!data && !!data.sid, 'main.js callLoginHandler come inbridge! ', JSON.stringify(data));
			if(!!data && !!data.sid){
				setCookie({'sid':data.sid}, 30, 'path=/');
				initVue();
				responseCallback({'loginSetCookieTime':new Date().getTime()});					 
			} else {
				bridge.callHandler('callLoginAgainHandle',{'callTime':new Date().getTime()},function(response) {
					log('callLoginAgainHandle call back!'+JSON.stringify(response));
				});
			}
		});
		
		
		// 处理登录
		var nowhash = location.hash.match(/#\/([^?]*)/i)[1];
		console.log(nowhash, JSON.stringify(APP_NO_CHECK_LOGIN), '----------', APP_NO_CHECK_LOGIN.indexOf(nowhash));
		if(APP_NO_CHECK_LOGIN.indexOf(nowhash) == -1){		//需要登录的页面
			bridge.callHandler('callLoginHandler', {'callTime':new Date().getTime()}, function(data) {});	
		} else {		//不需要登录的页面
			initVue();
		}
		

		//测试用
		document.getElementById('log').addEventListener('click', function(){
			console.log('click log div');
			bridge.callHandler('callLoginHandler', {'callTime':new Date().getTime()}, function(data) {});
		});
	});


}