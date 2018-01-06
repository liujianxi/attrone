/**
 * 机构管理模块
 */
//机构管理模块的数据对象
var feedbackModule = {
	paginationParam: {
		pageSize: 10, //每页展示的数据条目
		isInit: false, //是否已初始化
	}
};

$(document).ready(function() {
	var CONSTANT = {
		//处理请求前缀
		URL_PREFIX: '/adminjson/',
		//获取机构列表数据
	}
	
	$("body").on('click', '.js-btn-replyFeedback', function(){
		top.importOnceJS('js-script-feedbackreply', "js/app/rp/feedback.js");
		top.G_Fun_showReplyPanel($(this).attr('feedbackId'));
	});
	
	feedbackModule.loadFeedbackList = function(isAll, pageNo) {
		window.loadFeedbackList(isAll, pageNo);
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
	dt.setDate(dt.getDate()-365);
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
		$("#beginTime").val(start.format('YYYY-MM-DD'));
		$("#endTime").val(end.format('YYYY-MM-DD'));
	});

	
	function initPagination(nowPage, count) {
		if(count == 0) {
			$("#pagination").hide();
		} else {
			$("#pagination").show();
		}
		$("#pagination").pagination(count, {
			'items_per_page': feedbackModule.paginationParam.pageSize,
			'num_display_entries': 5,
			'num_edge_entries': 5,
			'prev_text': "上一页",
			'next_text': "下一页",
			'callback': function(page_index) {
				//如果已加载过则不加载
				if(!feedbackModule.paginationParam.isInit) {
					feedbackModule.paginationParam.isInit = true;
				} else {
					loadFeedbackList(false, page_index + 1);
				}
				//当前页数
				feedbackModule.paginationParam.pageNo = page_index + 1;
			},
			'current_page': (nowPage <= 1) ? 0 : (nowPage - 1)
		});
	}
	
	$('body').on('click', '.js-addTab-link', function(){
        top.tm.addTab($(this).attr('title'), $(this).attr('link'));
    });	

	function refreshFeedbackList(data) {
		var feedbackListHtml = template('feedbackListTemplate', data);
		$("#feedbackListContent").empty().html(feedbackListHtml);
	}
	
	window.loadFeedbackList = function(isAll, pageNo) {
		var param = {
			pageNo: pageNo, 
			pageSize: feedbackModule.paginationParam.pageSize,
			state : $("#search_state").val(),
			fbType : $("#search_type").val(),
			beginTime : $("#beginTime").val(),
			endTime : $("#endTime").val()
		}
		//请求数据
		doHttp(param,'/adminjson/SAASGetFeedbackList').then(function(data) {
			//刷新列表
			refreshFeedbackList(data.body);
			//初始化分页控件
			if(isAll) {
				initPagination(0, data.body.count);
			}
		});
	}


	loadFeedbackList(true, 1);
});