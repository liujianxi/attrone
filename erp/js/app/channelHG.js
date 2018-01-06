/**
 * banner管理模块
 */
//banner管理模块的数据对象
var channelHGModel = {
	bannerList : [],	//banner数据列表
	//分页参数
	paginationParam : {
		pageSize : 10,	//每页展示的数据条目
		isInit : false,	//是否已初始化
		pageNo : 1 //当前页，默认为1
	}
};

$(document).ready(function(){
	
	/**
	 * 私有常量集合
	 */
	var CONSTANT = {
		//处理请求前缀
		URL_PREFIX : '/adminjson/',
		//获取banner列表数据
		GET_BANNER_LISG_URL : 'SAASTJHGChannel',
		locale :{
			"format": "YYYY-MM-DD",
			"separator": " 至 ",
			"applyLabel": "确定",
			"cancelLabel": "取消",
			"fromLabel": "开始",
			"toLabel": "结束",
			"customRangeLabel": "Custom",
			"weekLabel": "W",
			"daysOfWeek": [
				"周日",
				"周一",
				"周二",
				"周三",
				"周四",
				"周五",
				"周六",
			],
			"monthNames": [
				"一月",
				"二月",
				"三月",
				"四月",
				"五月",
				"六月",
				"七月",
				"八月",
				"九月",
				"十月",
				"十一月",
				"十二月"
			],
			"firstDay": 1
		}
	};
	
	//将加载数据的方法绑定到公共对象
	channelHGModel.loadBannerList = loadBannerList;
	
	//实例化请求帮助类
	var httpUtilObj = new HttpUtil();
	//默认载入数据
	loadBannerList(true,1);
	
	var d1, d2;
	function dateString(dt){
	    var dy = dt.getFullYear();
	    var dm = dt.getMonth()+1;
	    var dd = dt.getDate();
	   return dy+'-'+(dm<10?'0'+dm:dm)+'-'+dd;
	}
	var dt = new Date();
	dt.setDate(dt.getDate());
	d2 = dateString(dt);
	dt.setDate(dt.getDate()-30);
	
	d1 = dateString(dt);
	$("#channel-regBeginTime").val(d1);
	$("#channel-regEndTime").val(d2);
	$('input[name="daterange-order"]').daterangepicker({
		"autoApply": true,
		"locale": {
			"format": "YYYY-MM-DD",
			"separator": " 至 ",
			"applyLabel": "确定",
			"cancelLabel": "取消",
			"fromLabel": "开始",
			"toLabel": "结束",
			"customRangeLabel": "Custom",
			"weekLabel": "W",
			"daysOfWeek": [
				"周日",
				"周一",
				"周二",
				"周三",
				"周四",
				"周五",
				"周六",
			],
			"monthNames": [
				"一月",
				"二月",
				"三月",
				"四月",
				"五月",
				"六月",
				"七月",
				"八月",
				"九月",
				"十月",
				"十一月",
				"十二月"
			],
			"firstDay": 1
		},
		"startDate": d1,
		"endDate": d2
	}, function(start, end, label) {
		$("#channel-regBeginTime").val(start.format('YYYY-MM-DD'));
		$("#channel-regEndTime").val(end.format('YYYY-MM-DD'));
	});
	
	$('#date_range2').daterangepicker({
		"autoApply": true,
		"locale": CONSTANT.locale
	}, function(start, end, label) {
		$("#channel-regBeginTime").val(start.format('YYYY-MM-DD'));
		$("#channel-regEndTime").val(end.format('YYYY-MM-DD'));
	});
	
	/**
	 * 字符串过滤器
	 */
	template.helper('bannerFilter',function(id,dataSource){
//		console.info("id:"+id+",code:CONSTANT."+dataSource+"["+id+"].name");
		if(!isNaN(id) && (id>=0)){
			return eval("CONSTANT."+dataSource+"["+id+"].name");
		}else{
			return '未知';
		}
	});
	
	/**
	 * banner数据加载
	 * @param {Object} isAll (是否全部加载，如果是true才初始化分页控件，分页加载数据就是false的情况)
	 */
	function loadBannerList(isAll){
		
		//收集查询控件的参数值
		channelHGModel.searchParam = {
			startDate : $("#channel-regBeginTime").val(),
			endDate : $("#channel-regEndTime").val(),
		}
		//返回请求的promise对象
		httpUtilObj.ajax({
			url : CONSTANT.URL_PREFIX + CONSTANT.GET_BANNER_LISG_URL,
			params : channelHGModel.searchParam
		}).then(function(data){
			//刷新列表
			refreshBannerList(data.body);
		});
	}
	
	/**
	 * 刷新banner列表
	 * @param {Object} data
	 */
	function refreshBannerList(data){
		var bannerListHtml = template('bannerListTemplate',data);
		$("#bannerListContent").empty().html(bannerListHtml);
	}
	
	
});
