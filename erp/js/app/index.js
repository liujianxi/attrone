/***
 * 主页模块
 * by lianghuilin (2017-03-18)
 */
//require(['././js/requireConfig.js'], function(config) {
//	require(['jquery', 'bootstrap', 'niceScroll', 'template', 'httpUtil', 'toastUtil','cookieUtil','bootbox'], function(jQuery, bootstrap,cookieUtil,bootbox) {


function visibleSubMenuClose() {
	jQuery('.menu-list').each(function () {
		var t = jQuery(this);
		if (t.hasClass('nav-active')) {
			t.find('> ul').slideUp(200, function () {
				t.removeClass('nav-active');
			});
		}
	});
}

//实例化请求帮助类
var httpUtilObj = new HttpUtil();
var data = '';
function getPermitMenu() {
	httpUtilObj.ajax({
		url: '/adminjson/SAASGetPermitMenu',
	}).then(function (result) {
		data = result.body.menuList;

		if (result.errorCode == 0) {
			initTab();
			var menuList = result.body.menuList;
			var menuContentHtml = template('menuTemplate', menuList);
			$("#menuContent").empty().html(menuContentHtml);

			/**
			 * 菜单监听
			 */
			// jQuery('#menuContent >li:nth-child(1)').addClass('nav-active');
			// jQuery('#menuContent >li:nth-child(1)').find('>ul').css('display', 'block').slideDown(200);
			jQuery('.menu-list > a').off('click').on('click', function () {
				var parent = jQuery(this).parent();
				var sub = parent.find('> ul');
				if (!jQuery('body').hasClass('left-side-collapsed')) {
					if (sub.is(':visible')) {
						sub.slideUp(200, function () {
							parent.removeClass('nav-active');
						});
					} else {
						visibleSubMenuClose();
						sub.slideDown(200, function () {
							sub.css('display', 'block');
						});
						parent.addClass('nav-active');
					}
				}
				return false;
			});
			//默认点击合同列表
			$('#default_page').click();
		}
	});
}
getPermitMenu();


//		function mainContentHeightAdjust() {
//			// Adjust main content height
//			var docHeight = jQuery(document).height();
//			if(docHeight > jQuery('.main-content').height())
//				jQuery('.main-content').height(docHeight);
//		}

/**
 * 退出登录
 */
function logOut() {
	//			cookieUtil.cleanCookie();
	//待修改：将bootbox插件封装成通用工具类来调用
	if (confirm('确认退出登录？')) {
		delCookie('mgrSid');
		window.location.href = "././login.html";
	};

	//			bootbox.confirm({
	//				title : "系统提示",
	//				message : "确认退出登录？",
	//				buttons : {
	//					confirm: {
	//			            label: '确定',
	//			            className: 'btn-success'
	//			        },
	//			        cancel: {
	//			            label: '取消',
	//			            className: 'btn-danger'
	//			        }
	//				},
	//				callback : function(isConfirm){
	//					if(isConfirm){
	//					 	delCookie('mgrSid');
	//					 	window.location.href = "../login.html";
	//					}
	//				}
	//			});
}

/**
 * 获取cookie数据项
 * @param {Object} c_name
 */
function getCookie(c_name) {
	if (document.cookie.length > 0) {　　//先查询cookie是否为空，为空就return ""
		c_start = document.cookie.indexOf(c_name + "=")　　//通过String对象的indexOf()来检查这个cookie是否存在，不存在就为 -1　　
		if (c_start != -1) {
			c_start = c_start + c_name.length + 1　　//最后这个+1其实就是表示"="号啦，这样就获取到了cookie值的开始位置
			c_end = document.cookie.indexOf(";", c_start)　　//其实我刚看见indexOf()第二个参数的时候猛然有点晕，后来想起来表示指定的开始索引的位置...这句是为了得到值的结束位置。因为需要考虑是否是最后一项，所以通过";"号是否存在来判断
			if (c_end == -1) c_end = document.cookie.length
			return unescape(document.cookie.substring(c_start, c_end))　　//通过substring()得到了值。想了解unescape()得先知道escape()是做什么的，都是很重要的基础，想了解的可以搜索下，在文章结尾处也会进行讲解cookie编码细节
		}
	}
	return "";
}

function delCookie(name) {
	// 删除所有cookie
	var rs = document.cookie.match(new RegExp("([^ ;][^;]*)(?=(=[^;]*)(;|$))", "gi"));
	for (var i in rs) {
		document.cookie = rs[i] + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/; ";
	}
}

$(document).ready(function () {
	//			console.info('jquery is ready!');
	getUserInfo();
});

/**
 * 获取cookie数据项
 * @param {Object} c_name
 */
function getCookie(c_name) {
	if (document.cookie.length > 0) {
		c_start = document.cookie.indexOf(c_name + "=")
		if (c_start != -1) {
			c_start = c_start + c_name.length + 1
			c_end = document.cookie.indexOf(";", c_start)
			if (c_end == -1) c_end = document.cookie.length
			return unescape(document.cookie.substring(c_start, c_end))
		}
	}
	return "";
}

function getUserInfo() {
	var mgrName = getCookie('mgrName');
	var mgrPic = getCookie('mgrPic');
	if (mgrName != null && mgrName != '' && mgrName != 'null') {
		$("#mgrName").html(mgrName);
	} else {
		$("#mgrName").html('未设置用户名');
	}
	if (mgrPic != null && mgrPic != '' && mgrPic != 'null') {
		$('#mgrPic').attr('src', mgrPic);
	}
}
function isEmpty(obj) {
    for (let name in obj) {
        return false;
    }
    return true;
}
function initTab() {
	/**
	 * tab管理器
	 */
	window.tm = new TabsManager({
		container: "#page-wrapper"
	});
//	if(!isEmpty(data)){
//		tm.addTab(data.list[0].menu[0].name, '././templates/' + data.list[0].menu[0].url + '.html');
//	}
	tm.addTab('管理工作台', '././templates/workmanage.html');
	window.indexModule = {
		logOut: logOut
	}
}

		/**
		 * 加载导航栏
		 */
//		function loadNav(){
//			$.ajax({
//				type:"POST",
//				url:"./nav.json",
//				async:true
//			});
//		}
//	});
//});