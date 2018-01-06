
/**
 * 长护险管理模块
 */
$(document).ready(function() {
	
	//实例化请求帮助类
	var httpUtilObj = new HttpUtil();
	$(".js-btn-showinsureListByIf").on('click',function(){
		var data = {};
		var orderStatus=$("#search_order").val();
		var key = $("#findUserName").val();
		data.orderStatus=orderStatus;
		data.key=key;
		data.pageSize = 10;
		data.pageNo = 0;
		httpUtilObj.ajax({
			url: '/adminjson/SAASGetInsureList',
			type: "POST",
			dataType: 'json',
			params: data
		}).then(function(result){
			if(result.errorCode==0){
				var insureListHtml = template('insureTemplate', result.body);
				$("#insureContent").empty().html(insureListHtml);
				//初始化分页控件
				paginationInit = false;
				if(!paginationInit) {
					initPagination(0, result.body.count);
				}
			}
		});
	});
		
	
//	function loadInsureUserList(pageNO) {
//		var data = {};
//		data.pageSize = 10;
//		data.pageNO = pageNO;
//		data.status = 4;
//		//发送请求
//		httpUtilObj.ajax({
//			url: '/adminjson/SAASGetInsureList',
//			type: "POST",
//			dataType: 'json',
//			params: data
//		}).then(function(result) {
//			if(result.errorCode == 0) {
//				refreshInsureList(result.body);
//				initPagination(0, result.body.count);
//			}
//		});
//	}
	
	var loadInsureUserList = function (pageNo) {
		var data = {};
		var orderStatus=$("#search_order").val();
		var key = $("#findUserName").val();
		data.orderStatus=orderStatus;
		data.key=key;
		data.pageSize = 10;
		data.pageNo = pageNo;
		httpUtilObj.ajax({
			url: '/adminjson/SAASGetInsureList',
			type: "POST",
			dataType: 'json',
			params: data
		}).then(function(result){
			//刷新列表
			refreshInsureList(result.body);
			//初始化分页控件
			if(!paginationInit) {
				initPagination(0, result.body.count);
			}
		});
	}
	
	var refreshInsureList = function(data) {
		var insureListHtml = template('insureTemplate', data);
		$("#insureContent").empty().html(insureListHtml);
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
				console.log("callback:" + page_index + "::" + nowPage);
				if(paginationInit){
					loadInsureUserList(page_index + 1);
				}else{
					paginationInit = true;
				}
				
			},
			'current_page': (nowPage <= 1) ? 0 : (nowPage - 1)
		});
	}
	loadInsureUserList(1);
});