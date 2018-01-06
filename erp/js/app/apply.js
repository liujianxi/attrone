/**
 * 长护险管理模块
 */

$(document).ready(function() {
	
	
	$(".js-btngroup-stats").on('click','a',function(){
		$(".js-btngroup-stats a").removeClass("fRed");
		$(this).addClass("fRed");
		paginationInit = false;
		loadApplyList(1);
	});
	
	$('body').on('click', ".js-btn-showApplyHandlePanel",function(){
		top.importOnceJS('js-script-staff_handle',"js/app/rp/apply_handle.js");
		var applyId = $(this).attr("applyId");
		var type = $(this).attr("type");
		top.G_Fun_showApplyHandlePanel(applyId, type).then(function(data){
			loadApplyList(1);
		});
	});
	
	var refreshApplyList = function(data) {
		var applyListHtml = template('applyListTemplate', data);
		$("#applyListContent").empty().html(applyListHtml);
	}
	var getStatus = function(){
		var objs = $(".js-btngroup-stats a.fRed");
		if(objs && objs.length>0){
			return objs.attr("value");
		}
		return -1;
	}
	
	//机构数据加载
	var loadApplyList = function (pageNo) {
		var status = getStatus();
		var param = {
				status : status,
				pageNo : pageNo,
				pageSize : 20
		}
		return G_ApplyModule.getStaffApplyList(param).then(function(data) {
			//刷新列表
			refreshApplyList(data.body);

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
		if(count <= pageSize) {
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
					loadApplyList(page_index + 1);
				}else{
					paginationInit = true;
				}
				
			},
			'current_page': (nowPage <= 1) ? 0 : (nowPage - 1)
		});
	}
	
	$('body').on('click', ".js-btn-sendAccount",function(){
		
		var applyId = $(this).attr("applyId");
		var box = bootbox.confirm({
			title: "发放账号",
			message: "是否确定已在MO学院开通培训账号？",
			buttons: {
				confirm: {
					label: '确定',
					className: 'btn-success js-btn-focus'
				},
				cancel: {
					label: '取消',
					className: 'btn-danger'
				}
			},
			callback: function(isConfirm) {
				if(isConfirm) {
					var param = {};
					param["applyId"] = applyId; 
					param["status"] = 4;
					G_ApplyModule.checkStaffApply(param).then(function(result) {
						if(result.errorCode == 0) {
							Toast.success("操作成功");
							loadApplyList(1);
						}
					});
				}
			}
		});
		box.one("shown.bs.modal", function() {
			box.find(".js-btn-focus").focus();
		});
	});
	
	$('body').on('click', ".js-btn-entry",function(){
		
		var applyId = $(this).attr("applyId");
		var box = bootbox.confirm({
			title: "通知入职",
			message: "是否确定学员已通过培训，通知入职？",
			buttons: {
				confirm: {
					label: '确定',
					className: 'btn-success js-btn-focus'
				},
				cancel: {
					label: '取消',
					className: 'btn-danger'
				}
			},
			callback: function(isConfirm) {
				if(isConfirm) {
					var param = {};
					param["applyId"] = applyId; 
					param["status"] = 5;
					G_ApplyModule.checkStaffApply(param).then(function(result) {
						if(result.errorCode == 0) {
							Toast.success("操作成功");
							loadApplyList(1);
						}
					});
				}
			}
		});
		box.one("shown.bs.modal", function() {
			box.find(".js-btn-focus").focus();
		});
	});
	

	loadApplyList(1);
});