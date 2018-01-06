function Tools() {
	this.timer = undefined;
}

Tools.prototype.doRequest = function(options, header) {
	this.prefix = '/hh_erp/adminjson/';
	options.url = options.url || '';
	options.params = options.params || {};
	header = header || {};
	var dtd = $.Deferred(),
		self = this;;
	$.ajax({
		type: 'post',
		url: this.prefix + options.url,
		headers: header,
		dataType: 'json',
		data: JSON.stringify(options.params),
		timeout: 20000,
		success: function(data) {
			if(data.errorCode == 0) { //成功      
				dtd.resolve(data.body);
			} else if(data.errorCode == 1) { //统一未登录错误标识
				if(window.frames.length == 0) { //不在首页
					window.top.clearInfo();
					window.top.location.href = location.protocol + "//" + location.host + "/hh_erp/login.html";
				} else {
					window.clearInfo();
					location.href = location.protocol + "//" + location.host + "/hh_erp/login.html";
				}
				dtd.reject("登录失败");
			} else { //错误
				self.toastFail(data.msg);
				dtd.reject(data.msg);
			}
		},
		error: function(jqXHR, textStatus, errorThrown) {
			self.toastFail(JSON.stringify(textStatus));
			dtd.reject(JSON.stringify(textStatus));
		}
	})
	return dtd.promise();
}

Tools.prototype.setCookie = function(cook, expiredays, path) { //按天数设置, encodeURIComponent加密需要服务器端解密, expire和max-age都是设置过期时间，max-age更新一些
	var path = path || '';
	for(var i in cook) {
		if(expiredays === undefined) { //未设置当作session cookie
			document.cookie = i + '=' + encodeURIComponent(cook[i]) + ';' + path;
		} else {
			if(expiredays < 0)
				document.cookie = i + '=' + encodeURIComponent(cook[i]) + "; max-age=-1;" + path; //max-age负数，仅在窗口生效
			else if(expiredays == 0)
				document.cookie = i + '=' + encodeURIComponent(cook[i]) + "; max-age=0;" + path; //为0删除cookie
			else
				document.cookie = i + '=' + encodeURIComponent(cook[i]) + "; max-age=" + expiredays * 24 * 60 * 60 + ';' + path; //按秒计算
		}
	}
}

Tools.prototype.getCookie = function(key) {
	var matchs = document.cookie.match(new RegExp('\\S*' + key + '=([^;]*)', 'i'));
	if(!!matchs && matchs.length > 1) {
		return decodeURIComponent(matchs[1]);
	}
	return false;
}

Tools.prototype.setStorage = function(key, value) {
	if(window.localStorage) {
		if(typeof value == 'object') {
			localStorage.setItem(key, JSON.stringify(value));
		} else {
			localStorage.setItem(key, value);
		}
	} else {
		window.key = value;
	}
}

Tools.prototype.getStorage = function(key) {
	if(window.localStorage) {
		var item = localStorage.getItem(key);
		if(item != null) { //存在这个
			try {
				return JSON.parse(item);
			} catch(e) {
				return item;
			}
		}
		return false;
	} else {
		return window.key;
	}
}

//Tools.prototype.params2Str = function(params){
//  let str = [];
//  for(let key in params){
//      str.push(key, '=', encodeURIComponent(params[key]), '&');
//  }
//  return str.join('').slice(0, -1);
//}

//Tools.prototype.str2Params = function(str){
//  let result = {};
//  let paarr = str.split('&');
//  for(let i=0,ilen=paarr.length; i<ilen; i++){
//      let temp = paarr[i].split('=');
//      result[temp[0]] = temp[1];
//  }
//  return result;
//}

/**
 * toaster组件
 */
Tools.prototype.toastSuccess = function(text) {
	var item = [];
	item.push('<div id="alert_success" style="position: fixed; z-index:10000; width: 340px; left: 50%; margin-left: -170px; top: 100px; opacity:0; -webkit-transform:translateY(40px); -webkit-transition:all 0.3s ease-out 0s;" class="alert alert-success alert-dismissible" role="alert">');
	item.push('  <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
	item.push('  <strong>', text, '</strong>');
	item.push('</div>');
	$('body').append(item.join(''));
	setTimeout(function() {
		$("#alert_success").css({
			'opacity': 1,
			'-webkit-transform': 'translateY(0)'
		});
	}, 100);
	clearTimeout(this.timer);
	this.timer = setTimeout(function() {
		$('.alert-success').remove();
	}, 2000);
}
Tools.prototype.toastFail = function(text) {
	var item = [];
	item.push('<div id="alert_danger" style="position: fixed; z-index:10000; width: 340px; left: 50%; margin-left: -170px; top: 100px; opacity:0; -webkit-transform:translateY(40px); -webkit-transition:all 0.3s ease-out 0s;" class="alert alert-danger alert-dismissible" role="alert">');
	item.push('  <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
	item.push('  <strong>', text, '</strong>');
	item.push('</div>');
	$('body').append(item.join(''));
	setTimeout(function() {
		$("#alert_danger").css({
			'opacity': 1,
			'-webkit-transform': 'translateY(0)'
		});
	}, 100);
	clearTimeout(this.timer);
	this.timer = setTimeout(function() {
		$('.alert-danger').remove();
	}, 2000);
}

/**
 *  毫秒转化为2017-06-08格式 
 */
Tools.prototype.dateString = function(time, hasZero) {
	var d = new Date(time);
	var y = d.getFullYear();
	if(!!hasZero) {
		var m = d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1);
		var dd = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
	} else {
		m = d.getMonth() + 1;
		dd = d.getDate();
	}
	return y + '-' + m + '-' + dd;
}

/**
 * rightPanel右侧弹出框
 */
function RightPanel(selector) {
	this.elem = $(selector);
	var self = this;
	this.elem.find('.rp_close').on('click', function() {
		self.hide();
	})
	var trimSelector = selector.replace('#', '');
	//监听body点击事件，如果不是从rightPanel内部发出，就收起rightPanel    
	// this.blankClickHandler = function(e){
	//     if($(e.target).closest(selector).length<=0){
	//         this.hide();
	//     }
	// }

	$('body').on('click', '#' + trimSelector + 'backdrop', function(e) {
		self.hide();
		e.stopPropagation();
	})
	this.backdrop = $("<div id='" + trimSelector + "backdrop" + "' style='position:fixed; top:0; left:0; bottom:0; right:0; background-color:rgba(0,0,0,0.5); z-index:1; '></div>");
}
RightPanel.prototype.show = function() {
	this.elem.addClass('show');
	$('body').append(this.backdrop);
};
RightPanel.prototype.hide = function() {
	this.elem.removeClass('show');
	this.backdrop.remove();
};

/**
 * 图片查看器
 */
/**
 * 在点击的时候创建imgviewer，传入src
 * rpanel backdrop z-index:1;    rpanel z-index:2 ;    imgviewer backdrop z-index:3; imgviewer:4;
 */
function ImgViewer(src) {
	this.scale = 1;
	this.rotate = 0;
	this.transformX = 0;
	this.transformY = 0;
	//创建一个
	var tmp = [];
	tmp.push('<div id="iv_backdrop" style="position:fixed; z-index:3; top:0; left:0; bottom:0; right:0; background-color:rgba(0,0,0,0.5);" >');
	// tmp.push('  <div id="iv_img" src="', src, '" style="background:url() no-repeat; position:absolute; width:200px; height:200px; z-index:4; -webkit-transform:', 'scale(',this.scale,') rotate(',this.rotate,'deg) translate(',this.transformX,'px, ',this.transformY,'px)', ';  "></div>');

	tmp.push('  <img id="iv_img" src="', src, '" style="visibility:hidden; position:absolute; z-index:4; -webkit-transform:', 'scale(', this.scale, ') rotate(', this.rotate, 'deg) translate(', this.transformX, 'px, ', this.transformY, 'px)', ';  "/>');
	tmp.push('  <div id="iv_tool">');
	tmp.push('      <i id="iv_plus"></i>');
	tmp.push('      <i id="iv_sub"></i>');
	tmp.push('      <i id="iv_rotate"></i>');
	tmp.push('      <i id="iv_close"></i>');
	tmp.push('  </div>');
	tmp.push('  <div id="iv_size">');
	tmp.push('  </div>')
	tmp.push('</div>');
	$('body').append(tmp.join(''));
	var imgW = $('#iv_img').width(); //图片居中显示
	var imgH = $('#iv_img').height();
	$('#iv_img').css({
		left: '50%',
		top: '50%',
		'margin-left': '-' + imgW / 2 + 'px',
		'margin-Top': '-' + imgH / 2 + 'px',
	}).css('visibility', 'visible');

	var self = this;
	$('#iv_plus').on('click', function(e) { //放大
		self.scale += 0.1;
		self.refreshCss();
		e.stopPropagation();
	});
	$('#iv_sub').on('click', function(e) {
		if(self.scale <= 0) return;
		self.scale -= 0.1;
		self.refreshCss();
		e.stopPropagation();
	});
	$('#iv_rotate').on('click', function(e) {
		self.rotate += 90;
		self.rotate = self.rotate % 360;
		self.refreshCss();
		e.stopPropagation();
	})
	$('#iv_img').on('click', function(e) {
		e.stopPropagation();
	})
	var isDown = false,
		sx, sy, stx, sty;
	$('#iv_img').on('mousedown', function(e) {
		e.preventDefault(); //这一句不能少，否则会拖拉出悬浮层
		isDown = true;
		sx = e.clientX;
		sy = e.clientY;
		stx = self.transformX;
		sty = self.transformY;
		self.refreshCss();
	});
	var eleIvImg = $('#iv_img').get(0);
	eleIvImg.addEventListener('touchstart', function(e) {
		isDown = true;
		sx = e.changedTouches[0].clientX;
		sy = e.changedTouches[0].clientY;
		stx = self.transformX;
		sty = self.transformY;
		self.refreshCss();
	});
	$('#iv_img').on('mousemove', function(e) {
		if(isDown) {
			self.transformX = stx + (e.clientX - sx);
			self.transformY = sty + (e.clientY - sy);
			self.refreshCss();
		}
	});
	eleIvImg.addEventListener('touchmove', function(e) {
		if(isDown) {
			self.transformX = stx + (e.changedTouches[0].clientX - sx);
			self.transformY = sty + (e.changedTouches[0].clientY - sy);
			self.refreshCss();
		}
	});
	$('#iv_img').on('mouseup', function(e) {
		isDown = false;
	});
	eleIvImg.addEventListener('touchend', function(e) {
		isDown = false;
	});
	$('#iv_img').on('mouseout', function() {
		isDown = false;
	});
	eleIvImg.addEventListener('touchcancel', function(e) {
		isDown = false;
	});
	$('#iv_close').on('click', function() {
		window.onmousewheel = null;
		// $('#iv_backdrop').off('mousewheel', handler);                        
		$('#iv_backdrop').remove();
	})
	$('#iv_backdrop').on('click', function() {
		window.onmousewheel = null;
		// $('#iv_backdrop').off('mousewheel', handler);                
		$('#iv_backdrop').remove();
	})
	var handler = function(e) {
		if(e.wheelDelta < 0) { //下滚动，缩小
			self.scale -= 0.1;
		} else {
			self.scale += 0.1;
		}
		self.refreshCss();
	}
	// $('#iv_backdrop').on('mousewheel', handler);
	//加入鼠标滚动放大缩小
	window.onmousewheel = function(e) {
		if(e.wheelDelta < 0) { //下滚动，缩小
			if(self.scale <= 0) return;
			self.scale -= 0.1;
		} else {
			self.scale += 0.1;
		}
		self.refreshCss();
	}
}
ImgViewer.prototype.refreshCss = function() {
	$('#iv_img').css('-webkit-transform', 'translate(' + this.transformX + 'px, ' + this.transformY + 'px) scale(' + this.scale + ') rotate(' + this.rotate + 'deg) ');
}

// 验证表单输入数据
var G_checkInputModule = {};

G_checkInputModule.checkPhone = function(phoneNo) {
	if(!(/^1[345678]\d{9}$/.test(phoneNo))) {
		return false;
	}
	return true;
}

// 操作字符串
var G_stringModule = {};

G_stringModule.getStr = function(value, newValue) {
	return(value == undefined || value == '' || value == "") ? newValue : value;
}

var G_Userinfo_Moduole = {};

var G_Util = {};
/**
 * 
 * @param {Object} msg 弹出框消息内容
 * @param {Object} fn 回调方法 需要接收isConfirm(bool)变量确定用户是否点击确认按钮
 */
G_Util.bootboxConfirm = function(msg, fn) {
	var msgText = "确认操作?";
	if(msg)
		msgText = msg;
	bootbox.confirm({
		title: "系统提示",
		message: msgText,
		buttons: {
			confirm: {
				label: '确定',
				className: 'btn-success'
			},
			cancel: {
				label: '取消',
				className: 'btn-danger'
			}
		},
		callback: fn
	});
}

G_Util.initMapUtil = function(widgetPrefix) {
	AMap.plugin(['AMap.Autocomplete', 'AMap.PlaceSearch'], function() {
		var autoOptions = {
			city: "全国", //城市，默认全国
			input: widgetPrefix + 'building' //使用联想输入的input的id
		};
		autocomplete = new AMap.Autocomplete(autoOptions);
		var placeSearch = new AMap.PlaceSearch({
			city: '广州'
		});
		AMap.event.addListener(autocomplete, "select", function(e) {
			placeSearch.search(e.poi.name);
			//自动填充详细地址
			var adcode = e.poi.adcode;
			$("#" + widgetPrefix + "address").val(e.poi.district + e.poi.address);
			$("#" + widgetPrefix + "lng").val(e.poi.location.lng);
			$("#" + widgetPrefix + "lat").val(e.poi.location.lat);
			$("#" + widgetPrefix + "adcode").val(adcode);
			$("#" + widgetPrefix + "provinceID").val(adcode.substring(0, 2) + "0000");
			$("#" + widgetPrefix + "cityID").val(adcode.substring(0, 4) + "00");
			$("#" + widgetPrefix + "district").val(adcode);
		});
		var buildingEle = $("#" + widgetPrefix + 'building');
		var replaceGDCSS = function(){
			var targetoffset;
			if(buildingEle.offset().left!=undefined){
				targetoffset = buildingEle.offset().left || '0';
			}
			$(".amap-sug-result").css("left",targetoffset + "px");
			$(".amap-sug-result").css("z-index","9999");
		}
		AMap.event.addListener(autocomplete, "complete", function(e) {
			setTimeout(replaceGDCSS,50);
			//hook 高德api 定位bug
		});
		$(document).on("mousewheel",function(){
			replaceGDCSS();
		});
		$(window).on("resize",function(){
			replaceGDCSS();
		});
	});
}

G_Util.getIdCardInfo = function(imgId, side) {
	if (!side) side = 1;
	var param = {
		imgId : imgId,
		side : side
	}
	var url = '/adminjson/IDCardRecognize';
	return doHttp(param, url);
}

G_Util.removeByName = function (array, name) {
	for(var i=0; i<array.length; i++) {
	    if(array[i].name == name) {
	      array.splice(i, 1);
	      break;
	    }
	}
}


G_Util.getObjIdByName = function (array, name) {
	for(var i=0; i<array.length; i++) {
	    if(array[i].name == name) {
	      return array[i].id; 
	    }
	}
}









G_Util.isEmpty = function (v) {
    switch (typeof v) {
        case 'undefined':
            return true;
        case 'string':
            if (v.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) return true;
            break;
        case 'boolean':
            if (!v) return true;
            break;
        case 'number':
            if (0 === v || isNaN(v)) return true;
            break;
        case 'object':
            if (null === v || v.length === 0) return true;
            for (var i in v) {
                return false;
            }
            return true;
    }
    return false;
}