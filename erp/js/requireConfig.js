/**
 * 配置Require模块化管理加载
 */
require.config({
	//标识插件所在的文件路径
	baseUrl : 'js',
	//标识具体的文件，并定义别名
	paths : {
		'angular' : 'plugins/angular.min',	//Angular库
		'jquery'  : 'plugins/jquery.min',	//Jquery核心库
		'bootstrap' : 'plugins/bootstrap.min',//Bootstrap库
		'niceScroll': 'plugins/jquery.nicescroll',//滚动条美化的插件库
		'ui' : 'plugins/jquery-ui-1.10.3.min',	//JQ界面库
		'template' : 'plugins/template-native',	//artTemplate模板库
		'amap' : 'https://webapi.amap.com/maps?v=1.3&key=76995f30ba8965c259c624c3a3fa5777',	//高德地图
		'md5' : 'plugins/md5.min',	//NG加密库
		'bootbox' : 'plugins/bootbox.min',
		'httpUtil': 'app/common/httpUtil',	//请求辅助类
		'toastUtil':'app/common/toastUtil',	//消息提示工具
		'cookieUtil' : 'app/common/cookieUtil'	//cookie辅助类
	},
	//对不支持AMD规范的库做兼容处理，并导出全局的对象名
	shim : {
		'cookieUtil' : {
			deps : ['jquery'],
			exports : 'cookieUtil'
		},
		'jquery' : {
			exports : 'jquery'
		},
		'bootbox' : {
			deps : ['jquery','bootstrap'],
			exports : 'bootbox'
		},
		'httpUtil' : {
			deps : ['jquery','bootbox'],
			exports : 'httpUtil'
		},
		'amap':{
			exports : 'amap'
		},
		'angular' : {
			exports : 'angular'
		},
		'bootstrap' : {
			deps : ['jquery'],
			exports : 'bootstrap'
		},
		'niceScroll':{
			deps : ['jquery'],
			exports : 'niceScroll'
		},
		'ui' : {
			deps : ['jquery'],
			exports : 'ui'
		},
		'template' : {
			exports : 'template'
		},
		'md5' : {
			exports : 'md5'
		}
	}
});