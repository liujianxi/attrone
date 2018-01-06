/**
 * 长护险补贴管理模块
 */
$(document).ready(function() {
	$(".btn-sm").on('click',function(){
			var datas = {};
			var orderId = $("#findUserName").val();
			var regBeginTime = $("#regBeginTime").val();
			var regEndTime = $("#regEndTime").val();
			datas.orderId = orderId;
			datas.regBeginTime = regBeginTime;
			datas.regEndTime = regEndTime;
			datas.pageSize = pageSize;
			datas.pageNO =1;
			return G_InsureModule.getInsureSubsidyList(datas).then(function(data) {
				//刷新列表
				refreshInsureList(data.body);
				//初始化分页控件
				paginationInit = false;
				if(!paginationInit) {
					initPagination(0, data.body.count);
				}

			});
		});



	var refreshInsureList = function(data) {
		var insureListHtml = template('subsidyListTemplate', data);
		$("#subsidyListContent").empty().html(insureListHtml);
	}
	
	
	var d1, d2;
	function dateString(dt){
	    var dy = dt.getFullYear();
	    var dm = dt.getMonth()+1;
	    var dd = dt.getDate(1);
	   return dy+'-'+(dm<10?'0'+dm:dm)+'-'+dd;
	}
	var dt = new Date();

	
	dt.setDate(1);
	d2 = dateString(dt);
	console.log("d2:"+d2);
	dt.setMonth(dt.getMonth()-1);
	dt.setDate(1);
	d1 = dateString(dt);
	console.log("d1:"+d1);
	
	
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

	//机构数据加载
	var loadInsureList = function (pageNo) {
		var datas = {};
		datas.pageNo = pageNo;
		datas.pageSize = pageSize;
		var orderId = $("#findUserName").val();
		var regBeginTime = $("#regBeginTime").val();
		var regEndTime = $("#regEndTime").val();
		datas.orderId = orderId;
		datas.regBeginTime = regBeginTime;
		datas.regEndTime = regEndTime;
		return G_InsureModule.getInsureSubsidyList(datas).then(function(data) {
			//刷新列表
			refreshInsureList(data.body);
			//初始化分页控件
			if(!paginationInit) {
				initPagination(0, data.body.count);
			}

		});
	}
	
	
	

	var pageSize = 10;
	var paginationInit = false;

	//初始化分页控件
	function initPagination(nowPage, count) {
		//如果记录条目为0则隐藏分页控件
		if(count == 0) {
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
			'callback': function(page_index) {
				console.log("callback:"+  page_index + "::" + nowPage);
				if(paginationInit){
					loadInsureList(page_index + 1);
				}else{
					paginationInit = true;
				}
				
			},
			'current_page': (nowPage <= 1) ? 0 : (nowPage - 1)
		});
	}
	

	loadInsureList(1);
	$('body').on('click', ".js-btn-addSubsidy",function(){
		var elem = $(this);
		var orderId = elem.attr("orderid");
		var type = elem.attr("type");
		var subsidyId = elem.attr("subsidyid");
		var fee = elem.attr("fee");
		showInsureSubsidyModal(orderId,type,subsidyId,fee);
		
	});
	
	//发放补贴
	var importInsureSubsidyJs = function(){
		top.importOnceJS('js-add-insure-subsidy',"js/app/modal/add_insure_subsidy.js");
	}
	var showInsureSubsidyModal = function(orderId,type,subsidyId,fee){
		importInsureSubsidyJs();
		return top.G_OpenAddInsureSubsidyWin(orderId,type,subsidyId,fee).then(function(data){
			paginationInit = false;
			loadInsureList(1);
			console.log("data:" + JSON.stringify(data));
		});
	}
	
});