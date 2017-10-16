import { Notification,Loading } from 'element-ui';
export function setCookie(cook, expiredays, path) {      //按天数设置, encodeURIComponent加密需要服务器端解密, expire和max-age都是设置过期时间，max-age更新一些
	var path = path || '';
	for (var i in cook) {
		if (expiredays === undefined) {     //未设置当作session cookie
			document.cookie = i + '=' + encodeURIComponent(cook[i]) + ';' + path;
		} else {
			if (expiredays < 0)
				document.cookie = i + '=' + encodeURIComponent(cook[i]) + "; max-age=-1;" + path;     //max-age负数，仅在窗口生效
			else if (expiredays == 0)
				document.cookie = i + '=' + encodeURIComponent(cook[i]) + "; max-age=0;" + path;      //为0删除cookie
			else
				document.cookie = i + '=' + encodeURIComponent(cook[i]) + "; max-age=" + expiredays * 24 * 60 * 60 + ';' + path;       //按秒计算
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
/**
 * 自定义http请求
 */
class Http {
	constructor() {
		//es6多次引入是引入引用，所以这里的xmlhttp也是单例的。不能应用多次请求
		this.xmlhttp = new XMLHttpRequest();
	}

	post(url, params) {
		let self = this;
		let xmlhttp = new XMLHttpRequest();
		//sid设置在cookie不生效，如果不为空的和重新设置在请求头
		let cookieSid = getCookie('sid');
		//         console.warn('api sid:' + cookieSid);
		// console.log('post:' + cookieSid);
		if (window.location.hostname != 'localhost') {
			window.isPrd = true;
		}
		return new Promise((resolve, reject) => {
			var timer = setTimeout(() => {				//请求500ms未结束显示indicator
				let loadingInstance = Loading.service({
					text:'拼命加载中'
				});
			}, 500);
			if (window.isPrd) {//线上环境
				xmlhttp.onreadystatechange = () => {
					if (xmlhttp.readyState == 4) {
						if (xmlhttp.status == 200) {
							clearTimeout(timer);
							loadingInstance.close();
							var temp = JSON.parse(xmlhttp.responseText);
							if (temp.errorCode == 0) {
								resolve(temp);
							} else if (temp.errorCode == 1) {
								Notification.error({ message: '用户未登录', position: 'bottom', duration: 2000 });
								reject(temp);
							} else {
								if (temp.msg != '订单已过期') {
									Notification.error({ message: temp.msg, position: 'middle', duration: 2000 });
								}
								reject(temp);
							}
						} else {
							loadingInstance.close();
							Notification.error({ message: '加载错误', position: 'bottom', duration: 2000 });
							reject();
						}
					}
				};
				xmlhttp.open("POST", url, true);
				xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				xmlhttp.setRequestHeader("Accept", "application/json, text/javascript, */*; q=0.01");
				if (cookieSid ) {
					xmlhttp.setRequestHeader("sid", decodeURIComponent(cookieSid));
				}
				xmlhttp.send(JSON.stringify(params));
			} else {
				setCookie({ 'sid': 'NnPd3LWCPlz%2FFX%2BwO9DOTjuQK7%2BYj6jUJvV%2BKyMe4dM%3D' });
				xmlhttp.onreadystatechange = () => {
					if (xmlhttp.readyState == 4) {
						if (xmlhttp.status == 200) {
							clearTimeout(timer);
							loadingInstance.close();

							var temp = JSON.parse(xmlhttp.responseText);
							if (temp.errorCode == 0) {
								resolve(temp);
							} else if (temp.errorCode == 1) {
								//用户未登录
								Notification.error({ message: '用户未登录', position: 'bottom', duration: 5000 });
								reject(temp);
							} else {
								if (temp.msg != '订单已过期') {
									Notification.error({ message: temp.msg, position: 'middle', duration: 2000 });
								}
							}
						} else {
							loadingInstance.close();
							console.log('wr')
							Notification.error({ message: '加载错误', position: 'bottom', duration: 5000 });
							reject();
						}
					}
				};
				xmlhttp.open("POST", 'http://localhost/' + url, true);
				xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				xmlhttp.setRequestHeader("Accept", "application/json, text/javascript, */*; q=0.01");
				xmlhttp.setRequestHeader("sid", decodeURIComponent("NnPd3LWCPlz%2FFX%2BwO9DOTjuQK7%2BYj6jUJvV%2BKyMe4dM%3D"));
				xmlhttp.send(JSON.stringify(params));
			}
		});
	}
}

var http = new Http();
export default http;