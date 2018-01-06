/**
 * 长护险管理模块
 */

$(document).ready(function() {
	
	
	$(".js-btngroup-stats").on('click','a',function(){
		$(".js-btngroup-stats a").removeClass("fRed");
		$(this).addClass("fRed");
		loadInsureList(1);
	});
	$(".add-insure-apply-btn").click(function(){
		top.importOnceJS('js-script-insure_apply',"js/app/rp/insure_apply.js");
		
	});
	$('body').on('click', ".js-btn-showInsureHandlePanel",function(){
		top.importOnceJS('js-script-insure_handle',"js/app/rp/insure_handle.js");
		var insureNO = $(this).attr("insureNO");
		var type = $(this).attr("type");
		top.G_Fun_showInsureHandlePanel(insureNO, type).then(function(data){
			loadInsureList(1);
		});
	});
	$('body').on('click', ".js-btn-submitToGov",function(){
		
		var insureNO = $(this).attr("insureNO");
		var box = bootbox.confirm({
			title: "系统提示",
			message: "是否确认已将资料提交终审？",
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
					param["insureNO"] = insureNO; 
					param["assessType"] = 3; 
					param["status"] = 1; //(1-通过 2-驳回)
					G_InsureModule.insureProcess(param).then(function(result) {
						if(result.errorCode == 0) {
							Toast.success("操作成功");
							loadInsureList(1);
						}
					});
				}
			}
		});
		box.one("shown.bs.modal", function() {
			box.find(".js-btn-focus").focus();
		});
	});
	
	
	
	var refreshInsureList = function(data) {
		var insureListHtml = template('insureListTemplate', data);
		$("#insureListContent").empty().html(insureListHtml);
	}
	var getStatus = function(){
		var objs = $(".js-btngroup-stats a.fRed");
		if(objs && objs.length>0){
			return objs.attr("value");
		}
		return -1;
	}
	
	
	//机构数据加载
	var loadInsureList = function (pageNo) {
		var status = getStatus();
		return G_InsureModule.getInsureList(status, pageNo, pageSize).then(function(data) {
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
					loadInsureList(page_index + 1);
				}else{
					paginationInit = true;
				}
				
			},
			'current_page': (nowPage <= 1) ? 0 : (nowPage - 1)
		});
	}
	

	loadInsureList(1);
});