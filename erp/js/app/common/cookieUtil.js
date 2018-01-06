$.cookie = {
	/** 
	 * 读取cookie 
	 * 
	 * @param {String} n=名称 
	 * @return {String} cookie值 
	 * @example 
	 *      $.cookie.get('id_test'); 
	 */
	get: function(n) {
		var m = document.cookie.match(new RegExp("(^| )" + n + "=([^;]*)(;|$)"));
		return !m ? "" : unescape(m[2]);
	},
	/** 
	 * 设置cookie 
	 * @param {String} name cookie名称 --必填 
	 * @param {String} value cookie值  --必填 
	 * @param {String} domain 所在域名 
	 * @param {String} path 所在路径 
	 * @param {Number} hour 存活时间，单位:小时 
	 * @example 
	 *  $.cookie.set('value1','cookieval',"id.qq.com","/test",24); //设置cookie 
	 */
	set: function(name, value, domain, path, hour) {
		var expire = new Date();
		expire.setTime(expire.getTime() + (hour ? 3600000 * hour : 30 * 24 * 60 * 60 * 1000));

		document.cookie = name + "=" + value + "; " + "expires=" + expire.toGMTString() + "; path=" + (path ? path : "/") + "; " + (domain ? ("domain=" + domain + ";") : "");
	},

	/** 
	 * 删除指定cookie,复写为过期 !!注意path要严格匹配， /id 不同于/id/ 
	 * 
	 * @param {String} name cookie名称 
	 * @param {String} domain 所在域 
	 * @param {String} path 所在路径 
	 * @example 
	 *      $.cookie.del('id_test'); //删除cookie 
	 */
	del: function(name, domain, path) {
		document.cookie = name + "=; expires=Mon, 26 Jul 1997 05:00:00 GMT; path=" + (path ? path : "/") + "; " + (domain ? ("domain=" + domain + ";") : "");
	},
	/** 
	 * 删除所有cookie -- 这里暂时不包括目录下的cookie 
	 * @example 
	 *      $.cookie.clear(); //删除所有cookie 
	 */

	clear: function() {
		var rs = document.cookie.match(new RegExp("([^ ;][^;]*)(?=(=[^;]*)(;|$))", "gi"));
		// 删除所有cookie  
		for(var i in rs) {
			document.cookie = rs[i] + "=;expires=Mon, 26 Jul 1997 05:00:00 GMT; path=/; ";
		}
	},
	/** 
	 * uin -- 针对业务,对外开源请删除 
	 * 
	 * @return {String} uin值 
	 * @example 
	 *      $.cookie.uin(); 
	 */
	uin: function() {
		var u = $.cookie.get("uin");
		return !u ? null : parseInt(u.substring(1, u.length), 10);
	}
};