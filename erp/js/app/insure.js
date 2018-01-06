/**
 * 长护险管理模块
 */

$(document).ready(function () {
	//点击改变状态
	$(".js-btngroup-stats").on('click', 'a', function () {
		$(".js-btngroup-stats a").removeClass("fRed");
		$(this).addClass("fRed");
		if($(this).attr('value')==2){
			$('.output-box').show();
		}else{
			$('.output-box').hide();
		}
		paginationInit = false;
		loadInsureList(1);
	});
	function exportlxs(name,url){
		bootbox.confirm({
			title: "导出",
			message: "<p>信息已导出至报表中心</p><p>文件名为："+name+"</p><p>您可以在报表中心进行下载</p>",
			buttons: {
				confirm: {
					label: '<span xlsUrl="'+url+'">直接下载</span>',
					className: 'btn-xlsUrl btn-success'
				},
				cancel: {
					label: '取消',
					//					className: 'btn-danger'
				}
			},
			callback: function (isConfirm) {
				if (isConfirm) {
					location.href=$('.btn-xlsUrl span').attr('xlsUrl');
				}
			}
		});
	}
	$(".add-insure-apply-btn").click(function () {
		top.importOnceJS('js-script-insure_apply', "js/app/rp/insure_apply.js");
	});

	// 联系客户
	$('body').on('click', ".js-btn-showInsureHandlePanel-contact", function () {
		top.importOnceJS('js-select-nation', "js/app/modal/insure_handle_contacts.js");
		var insureNO = $(this).attr("insureNO");
		var kinsName = $(this).attr("kinsName");
		var curr_pageNum=$(this).attr('pagenum');
		top.G_Fun_showInsureHandleContact(insureNO, kinsName).then(function (data) {
			loadInsureList(curr_pageNum);
		});
	});
	//新建订单部分
	$('#addInsure').off('click').on('click',function(){
		top.importOnceJS('js-script-insure_handle', "js/app/rp/insure_handle.js");
		top.showInsureHandlePanel_addInsure().then((res)=>{
			loadInsureList(1);
		})
	})
	//直接下单部分
	$('body').on('click', '.js-btn-insureCreateOrder', function () {
		top.importOnceJS('js-script-insure_handle', "js/app/rp/insure_handle.js");
		var curr_pageNum=$(this).attr('pagenum');
		var obj = {
			phone: $(this).attr("phone"),
			insureNO: $(this).attr("insureNO"),
			type: $(this).attr("type"),
			userId: $(this).attr("userId"),
			kinsName: $(this).attr('kinsname'),
			manageName: $(this).attr('manage'),
		}
		top.showInsureHandlePanel_CreateOrder(obj).then((res)=>{
			loadInsureList(curr_pageNum);
		})
	})
	$('body').on('click', ".js-btn-showInsureHandlePanel", function () {
		top.importOnceJS('js-script-insure_handle', "js/app/rp/insure_handle.js");
		var insureNO = $(this).attr("insureNO");
		var type = $(this).attr("type");
		var curr_pageNum=$(this).attr('pagenum');
		top.G_Fun_showInsureHandlePanel(insureNO, type).then(function (data) {
			loadInsureList(curr_pageNum);
		});
	});

	$("#searchInsureBut").unbind("click");
	$('body').on('click', "#searchInsureBut", function () {
		paginationInit = false;
		loadInsureList(1);
	});
	//回车搜索
	$('#findsfzh').keydown(function (event) {
		if((event.keyCode || event.which)==13) {
			paginationInit = false;
			event.preventDefault();//阻止浏览器默认行为
			loadInsureList(1);
		}
	});
	$('body').on('click', ".js-btn-submitToGov", function () {
		var curr_pageNum=$(this).attr('pagenum');
		var insureNO = $(this).attr("insureNO");
		var box = bootbox.confirm({
			title: "系统提示",
			message: "是否确定将资料提交复审？",
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
			callback: function (isConfirm) {
				if (isConfirm) {
					var param = {};
					param["insureNO"] = insureNO;
					param["assessType"] = 2;
					param["status"] = 1; //(1-通过 2-驳回)
					G_InsureModule.insureProcess(param).then(function (result) {
						if (result.errorCode == 0) {
							Toast.success("操作成功");
							loadInsureList(curr_pageNum);
						}
					});
				}
			}
		});
		box.one("shown.bs.modal", function () {
			box.find(".js-btn-focus").focus();
		});
	});



	var refreshInsureList = function (data) {
		var insureListHtml = template('insureListTemplate', data);
		$("#insureListContent").empty().html(insureListHtml);
		//报表下载
		if(!data.count){
			$('body').find('.downTemp-adl').attr({
				'href':'javascript:void(0);',
			}).removeAttr('download');
			$('body').find('.downTemp-insureapply').attr({
				'href':'javascript:void(0);',
			}).removeAttr('download');
		}else{
			$('body').find('.downTemp-adl').attr('href',location.protocol + '//' + location.host+'/getAdlAssessResultPDF').attr('download');
			$('body').find('.downTemp-insureapply').attr('href',location.protocol + '//' + location.host+'/getInsureApplyPDFServlet').attr('download');
		}
		$('body').find('.downTemp-adl-td').attr('href',location.protocol + '//' + location.host+'/getAdlAssessResultPDF?insureNO='+($('body').find('.downTemp-adl-td').attr('insureOrderNO')));
		$('body').find('.downTemp-insureapply-td').attr('href',location.protocol + '//' + location.host+'/getInsureApplyPDFServlet?insureNO='+($('body').find('.downTemp-adl-td').attr('insureOrderNO')));
		//导出报表
		let output_flag=true;
		$('.status-2-output').off('click').on('click', function(){
			if(!data.count){
				Toast.error('暂无数据！');
				return false;
			}
			let _self=$(this);
			let t_url=_self.attr('outputurl');
			if(!output_flag){
				return false;
			}
			output_flag=false;
			let httpUtilObj = new HttpUtil();
			httpUtilObj.ajax({
				url: t_url,
			}).then((res)=>{
				output_flag=true;
				if(res.errorCode==0){
					if(_self.hasClass('kins-output')){//导出提交复审名单
						exportlxs(res.body.excelName,res.body.downloadFileUrl);//导出报表
					}else{
						Toast.success('操作成功！');
						loadInsureList(1);
					}
				}
			},(res)=>{
				output_flag=true;
			});
		})
	}
	var getStatus = function () {
		var objs = $(".js-btngroup-stats a.fRed");
		if (objs && objs.length > 0) {
			return objs.attr("value");
		}
		return -1;
	}
	var getorderStatus = function () {
		var objs = $(".js-btngroup-stats a.fRed");
		if (objs && objs.length > 0) {
			return objs.attr("orderStatus");
		}
		return -1;
	}


	//机构数据加载
	var loadInsureList = function (pageNo) {
		var status = getStatus();
		var orderStatus = getorderStatus();
		var text = $("#findsfzh").val();
		$('#order-mask-bg').css('display','block');
		$('#order-mask').css('display','block');
		return G_InsureModule.getInsureList(status, text, orderStatus, pageNo, pageSize).then(function (data) {
			$('#order-mask-bg').css('display','none');
			$('#order-mask').css('display','none');
			//刷新列表
			refreshInsureList(data.body);
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
		if (count <= pageSize) {
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
	//绑定，选择护士，护士长按钮
	$('body').off('click','.js-select-insureHandleNure-HS, .js-select-insureHandleNure-HSZ, .js-btn-showInsureHandleNure-jkjl').on('click', ".js-select-insureHandleNure-HS, .js-select-insureHandleNure-HSZ, .js-btn-showInsureHandleNure-jkjl", function () {
		top.importOnceJS('js-select-nations', "js/app/modal/select_insure_handle_nure.js");
		var elem = $(this);
		var nurseType = elem.attr("nurseType");
		var insureOrderNO = elem.attr("insureOrderNO");
		var curr_pageNum=$(this).attr('pagenum');
		console.log("insureOrderNO:" + insureOrderNO);
		top.G_OpenSelectInsureHandleNureWin(nurseType, insureOrderNO).then(function (data) {
			console.log("hs:" + JSON.stringify(data));
			elem.html(data["hgName"]);
			elem.attr('hgId', data.hgId);
			loadInsureList(curr_pageNum);
		});
	});
	loadInsureList(1);
});