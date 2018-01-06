/***
 * HTTP请求辅助类 
 * add by lianghuilin (2017.03.17)
 */
//构造函数
function HttpUtil() {}

//HttpUtil.prototype.test = function(){
//	console.info("http test come in");
//}

HttpUtil.prototype.getTabParams = function(targ) {
	var target = $("div.ttt_item_tit.selected", parent.document);
	var urlStr = target.attr("data-path");
	if(urlStr.indexOf('?') != -1) {
		urlStr = urlStr.substring(urlStr.indexOf('?') + 1, urlStr.length);
	}

	var result = {};
	var param_list = urlStr.split('&'); //参数列表
	//循环赋值
	for(item in param_list) {
		var itemStr = param_list[item];
		var i = itemStr.indexOf('=');
		var key = itemStr.substring(0, i);
		var value = itemStr.substring(i + 1, itemStr.length);
		if(key != '') {
			eval('result.' + key + '=\"' + value + '\"')
		}
	}
	if(JSON.stringify(result) == '{}') {
		urlStr = target.attr("data-url");
		if(urlStr.indexOf('?') != -1) {
			urlStr = urlStr.substring(urlStr.indexOf('?') + 1, urlStr.length);
		}
		param_list = urlStr.split('&'); //参数列表
		for(item in param_list) {
			var itemStr = param_list[item];
			var i = itemStr.indexOf('=');
			var key = itemStr.substring(0, i);
			var value = itemStr.substring(i + 1, itemStr.length);
			if(key != '') {
				eval('result.' + key + '=\"' + value + '\"')
			}
		}
	}
	return result;
}

HttpUtil.prototype.ajax = function(options, header) {
	//请求超时时间
	var REQ_TIMEOUT = 20000;
	/***
	 * 异步请求
	 * @param {Object} options 配置对象
	 * @param {Object} header  头部参数对象
	 */
	var dtd = $.Deferred(),
		self = this;;
	//参数的非空判断
	options.url = options.url || '';
	options.params = options.params || {};
	header = header || {};
	//异步请求代理
	$.ajax({
		type: 'POST', //默认请求类型为POST
		url: options.url, //拼接请求的URL
		headers: header, //指定请求头
		dataType: 'JSON', //返回数据类型
		data: JSON.stringify(options.params), //格式化成JSON字符串
		timeout: REQ_TIMEOUT,
		//请求成功的场景处理
		success: function(data) {
			$('#ttt_head .ttt_item_tit.selected i.fa-refresh',parent.document).removeClass('refresh-rotation');
			if(data.errorCode == 0) {
				//操作成功
				dtd.resolve(data);
			} else if(data.errorCode == 1) {
				try {
					bootbox.alert({
						title: "系统消息",
						message: "您的登录状态已失效，请重新登录！",
						callback: function() {
							//账号未登录
							if(window.frames.length == 0) { //不在首页
								window.top.location.href = location.protocol + "//" + location.host + "/erp/login.html";
							} else {
								location.href = location.protocol + "//" + location.host + "/erp/login.html";
							}
						}
					});
				} catch(e) {
					alert('您的登录状态已失效，请重新登录！');
					//账号未登录
					if(window.frames.length == 0) { //不在首页
						window.top.location.href = location.protocol + "//" + location.host + "/erp/login.html";
					} else {
						location.href = location.protocol + "//" + location.host + "/erp/login.html";
					}
				}

				dtd.reject("登录失败");
			} else {
				//请求失败
				$.toast({
					heading: '系统消息',
					text: data.msg,
					position: 'top-right',
					icon: 'error',
					stack: false
				});
				dtd.reject(data);
			}
		},
		error: function(jqXHR, textStatus, errorThrown) {
			$('#ttt_head .ttt_item_tit.selected i.fa-refresh',parent.document).removeClass('refresh-rotation');
			try {
				$.toast({
					heading: '系统消息',
					text: '请求失败\n' + errorThrown,
					position: 'top-right',
					icon: 'error',
					stack: false
				});
			} catch(e) {
				alert('请求失败!\n' + errorThrown);
			}
			dtd.reject(jqXHR);
		}
	});
	return dtd.promise();
}