/**
 * 长护险管理模块
 */

$(document).ready(function () {

	var pageSize = 10;
	var paginationInit = false;
	
	
	var refreshIperformanceList = function (data) {
		var performanceListHtml = template('performanceListTemplate', data);
		$("#performanceListContent").empty().html(performanceListHtml);
	}
	
	
	var d1, d2;
	function dateString(dt) {
		var dy = dt.getFullYear();
		var dm = dt.getMonth() + 1;
		var dd = dt.getDate();
		return dy + '-' + (dm < 10 ? '0' + dm : dm) + '-' + dd;
	}
	var dt = new Date();
	dt.setDate(dt.getDate() + 30);
	d2 = dateString(dt);
	dt.setDate(dt.getDate() - 60);

	d1 = dateString(dt);
	$("#performance-regBeginTime").val(d1);
	$("#performance-regEndTime").val(d2);
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
	}, function (start, end, label) {
		$("#performance-regBeginTime").val(start.format('YYYY-MM-DD'));
		$("#performance-regEndTime").val(end.format('YYYY-MM-DD'));
	});

	

	//机构数据加载
	var loadPerformanceList = function (pageNo) {
		var key = $("#performancefindUserName").val();
		var startTime = $("#performance-regBeginTime").val();
		var endTime = $("#performance-regEndTime").val();
		console.log(key);
		console.log(startTime);
		console.log(endTime);
		return G_InsureModule.getperformanceList(key, startTime, endTime, pageNo, pageSize).then(function (data) {
			//刷新列表
			refreshIperformanceList(data.body);
			//初始化分页控件
			if (!paginationInit) {
				initPagination(0, data.body.count);
			}

		});
	}



	var pageSize = 10;
	var paginationInit = false;

	//初始化分页控件
	function initPagination(nowPage, count) {
		//如果记录条目为0则隐藏分页控件
		if (count < pageSize) {
			$("#pagination").hide();
		} else {
			$("#pagination").show();
		}
		$("#pagination").pagination(count, {
			'items_per_page': pageSize,
			'num_display_entries': 5,
			'num_edge_entries': 5,
			'prev_text': "上一页",
			'next_text': "下一页",
			'callback': function (page_index) {
				console.log("callback:" + page_index + "::" + nowPage);
				if (paginationInit) {
					loadInsureList(page_index + 1);
				} else {
					paginationInit = true;
				}

			},
			'current_page': (nowPage <= 1) ? 0 : (nowPage - 1)
		});
	}

	$("#performanceBut").unbind("click");
	$('body').on('click', "#performanceBut", function () {
		paginationInit = false;
		loadPerformanceList(1);
	});


	loadPerformanceList(1);
});