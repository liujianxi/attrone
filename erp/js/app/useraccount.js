/**
 * 机构管理模块
 */
//机构管理模块的数据对象
var userAccountModule = {
	id: 0,
	orgList: [], //机构数据列表
	provinceList: [], //搜索省份
	cityList: [], //搜索城市
	orgId: 0,
	branchId: 0,
	//分页参数
	paginationParam: {
		pageSize: 10, //每页展示的数据条目
		isInit: false, //是否已初始化
	},
	userId : 0
};
var userDataModel = {
	provinceList: []
};
$(document).ready(function() {

	/**
	 * 私有常量集合
	 */
	var CONSTANT = {
		//处理请求前缀
		URL_PREFIX: '/adminjson/',
		GET_USERACCOUNT_LIST_URL: 'SAASGetUserAccountRecordList',
		SAVE_USER_URL : 'SAASSaveOrUpdateUser'
	}

	userAccountModule.loadUserAccountList = loadUserAccountList;
	//实例化请求帮助类
	var httpUtilObj = new HttpUtil();
	
	var initParam = httpUtilObj.getTabParams();
	if(initParam != undefined && initParam != ''){
		userAccountModule.userId = initParam.userId;
	}
	
	function getUserAccountListData(pageNo) {
		var deferre = $.Deferred();
		var promise = deferre.promise();
		//收集查询控件的参数值
		userAccountModule.searchParam = {
			userId : userAccountModule.userId,
			phone: $("#findUserPhone").val(),
			begin: $("#regBeginTime").val(),
			end: $("#regEndTime").val(),
			keyword : $("#findUserName").val(),
			pageNo: pageNo, //请求页
			pageSize: userAccountModule.paginationParam.pageSize //每页记录数
		}
		//返回请求的promise对象
		return httpUtilObj.ajax({
			url: CONSTANT.URL_PREFIX + CONSTANT.GET_USERACCOUNT_LIST_URL,
			params: userAccountModule.searchParam
		});
	}
	
	var d1, d2;
	function dateString(dt){
	    var dy = dt.getFullYear();
	    var dm = dt.getMonth()+1;
	    var dd = dt.getDate();
	   return dy+'-'+(dm<10?'0'+dm:dm)+'-'+dd;
	}
	var dt = new Date();
	dt.setDate(dt.getDate()+1);
	d2 = dateString(dt);
	dt.setDate(dt.getDate()-30);
	d1 = dateString(dt);
	
	$("#regBeginTime").val(d1);
	$("#regEndTime").val(d2);
	$('input[name="daterange"]').daterangepicker({
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
		$("#regBeginTime").val(start.format('YYYY-MM-DD'));
		$("#regEndTime").val(end.format('YYYY-MM-DD'));
	});


	/**
	 * 初始化分页控件
	 * @param {Object} count
	 */
	function initPagination(nowPage, count) {
		//		console.info('nowPage:'+nowPage+',count:'+count);
		//如果记录条目为0则隐藏分页控件
		if(count == 0) {
			$("#pagination").hide();
		} else {
			$("#pagination").show();
		}
		//如果已初始化控件，则不再		
		//		if(!userAccountModule.paginationParam.isInit){
		$("#pagination").pagination(count, {
			'items_per_page': userAccountModule.paginationParam.pageSize,
			'num_display_entries': 5,
			'num_edge_entries': 5,
			'prev_text': "上一页",
			'next_text': "下一页",
			'callback': function(page_index) {
				//如果已加载过则不加载
				if(!userAccountModule.paginationParam.isInit) {
					userAccountModule.paginationParam.isInit = true;
				} else {
					loadUserAccountList(false, page_index + 1);
				}
				//当前页数
				userAccountModule.paginationParam.pageNo = page_index + 1;
			},
			'current_page': (nowPage <= 1) ? 0 : (nowPage - 1)
		});
		//		}
	}

	/**
	 * 机构数据加载
	 * @param {Object} isAll (是否全部加载，如果是true才初始化分页控件，分页加载数据就是false的情况)
	 */
	function loadUserAccountList(isAll, pageNo) {
		//请求数据
		getUserAccountListData(pageNo).then(function(data) {
			//刷新列表
			refreshAccountList(data.body);
			//初始化分页控件
			if(isAll) {
				initPagination(0, data.body.count);
			}
		});
	}

	/**
	 * 刷新机构列表
	 * @param {Object} data
	 */
	function refreshAccountList(data) {
		var recordListHtml = template('recordListTemplate', data);
		$("#recordListContent").empty().html(recordListHtml);
	}
	loadUserAccountList(true, 1);
	
	$('body').on('click', '.js-addTab-link', function(){
        top.tm.addTab($(this).attr('title'), $(this).attr('link'));
    });	
	
});