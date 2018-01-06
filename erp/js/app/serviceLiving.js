

$(document).ready(function() {
	
	//实例化请求帮助类
	var httpUtilObj = new HttpUtil();
	$(".js-btn-showlivingListByIf").on('click',function(){
		var data = {};
		var orderStatus=$("#service_Living").val();
		data.state=orderStatus;
		httpUtilObj.ajax({
			url: '/adminjson/SAASGetIndexServiceList',
			type: "POST",
			dataType: 'json',
			params: data
		}).then(function(result){
			if(result.errorCode==0){
				var insureListHtml = template('serviceLivingListTemplate', result.body);
				$("#serviceLivingListContent").empty().html(insureListHtml);
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
	
	var loadServerLivingList = function () {
		var data = {};
		var orderStatus=$("#service_Living").val();
		data.state=orderStatus;
		httpUtilObj.ajax({
			url: '/adminjson/SAASGetIndexServiceList',
			type: "POST",
			dataType: 'json',
			params: data
		}).then(function(result){
			//刷新列表
			refreshInsureList(result.body);
		});
	}
	
	var refreshInsureList = function(data) {
		console.log(data);
		var insureListHtml = template('serviceLivingListTemplate', data);
		$("#serviceLivingListContent").empty().html(insureListHtml);
	}
	
	$('.js-btn-getlivings').unbind("click");
	var showLivingModal = new ModalPanel("#showLiving_panel");
	//执行修改
	$("body").on('click', ".js-btn-getlivings", function () {
		showLivingModal.show();
		var id = $(this).attr("livingId");
		loadLivingInfo(id);
		$("#living_imgId_edit").val("");
	});
	
	
	/**
	 * 编辑
	 */
	$('#editOrgBtn').unbind("click");
	$("body").on('click', "#editOrgBtn", function () {
		//收集数据
		var param = {
			id : $("#showLiving_id").val(),	
			state : $("input[name='showLiving_type']:checked").val(),
			icon : $("#living_imgId_edit").val(),
			sort : $("#updateLiving_sort").val()		
		};
		//发送请求
		httpUtilObj.ajax({
			url : '/adminjson/SAASUpdateIndexService', 
			params : param
		}).then(function(result){
			if(result.errorCode == 0){
				$.toast({
				    heading: '系统消息',
				    text: '操作成功！',
				    position: 'top-right',
				    icon: 'success',
				    loaderBg: '#9EC600',
				    stack: false
				});
				loadServerLivingList();
				showLivingModal.hide();
			}
		});
	});
	
	/**
	 * Living数据回显
	 * @param {Object} id
	 */
	function loadLivingInfo(id){
		//发送请求
		httpUtilObj.ajax({
			url : '/adminjson/SAASGetIndexServiceInfo', 
			params : {id : id}
		}).then(function(result){
			var data = result.body.indexServiceItemInfo;
			if(result.errorCode == 0){
				$("#showLiving_id").val(data.id);
				$("#showLiving_name").val(data.iconDesc);
				
				$("#showLiving_type_"+data.state).prop('checked','checked');
				$("#living_imgUrl_edit").attr("src", data.iconUrl);
				$("#updateLiving_sort").val(data.sort);
			}
		});
	}
	
	
	
//	var pageSize = 10;
//	var paginationInit = false;
//
//	//初始化分页控件
//	function initPagination(nowPage, count) {
//		//如果记录条目为0则隐藏分页控件
//		if(count == 0) {
//			$("#pagination").hide();
//		} else {
//			$("#pagination").show();
//		}
//		$("#pagination").pagination(count, {
//			'items_per_page': pageSize,
//			'num_display_entries': 5,
//			'num_edge_entries': 5,
//			'prev_text': "上一页",
//			'next_text': "下一页",
//			'callback': function(page_index) {
//				console.log("callback:" + page_index + "::" + nowPage);
//				if(paginationInit){
//					loadInsureUserList(page_index + 1);
//				}else{
//					paginationInit = true;
//				}
//				
//			},
//			'current_page': (nowPage <= 1) ? 0 : (nowPage - 1)
//		});
//	}
	loadServerLivingList();
});