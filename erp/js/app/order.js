/**
 * 订单板块
 */
$(document).ready(function () {

	var pageSize = 10;
	var paginationInit = false;
	var showpaymethodModal = new ModalPanel("#show_payment-method_panel");
	
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
	$("#order-regBeginTime").val(d1);
	$("#order-regEndTime").val(d2);
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
		$("#order-regBeginTime").val(start.format('YYYY-MM-DD'));
		$("#order-regEndTime").val(end.format('YYYY-MM-DD'));
	});
	//初始化分页控件
	function initPaginations(nowPage, count) {
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
					getOrderList(page_index + 1,'page');
				} else {
					paginationInit = true;
				}

			},
			'current_page': (nowPage <= 1) ? 0 : (nowPage - 1)
		});
	}

	var refreshgetOrderList = function (data) {
		var getOrderListHtml = template('OrderListTemplate', data);
		console.log("正在刷新列表");
		$("#OrderListContent").empty().html(getOrderListHtml);
		//修改床号
		$('.order_bed').editable({
			url: '/adminjson/SAASSaveOrUpdateOrder',
			title:'编辑床号',
			value:'',
			placement:'right',
			pk:'1',
			params: function (params) {
				params['bedNo']=params['value'];
				params['orderId']=$(this).attr('orderId');
				params['orderstatus']=3;
				return JSON.stringify(params);
			},
			validate: function (value) {
				if ($.trim(value) == '') {
					return '请输入正确的床号';
				}
			}
		});
	}
	//获得居家--机构权限
	function getOrg(res){
		if(res.isAll==2){//居家
			setOrderType(res,'home');
			$('.order-newSet').removeClass('org_hide');
		}else if(res.isAll==1){//机构时
			setOrderType(res,'org');
			$('.order-newSet').addClass('org_hide');
		}else{//都可以
			setOrderType(res,'all');
			$('.order-newSet').removeClass('org_hide');
		}
	}
	let hosBranch_data='';
	//根据居家--机构权限配置搜索栏
	function setOrderType(res,str){
		let arr=[];
		if(str=='org'){//机构登录时
			arr=[{
				name:'机构订单',
				value:1,
			}];
			$('.org_hos').removeClass('org_hide');
		}else if(str=='home'){
			arr=[{
				name:'居家订单',
				value:2,
			}];
		}else{
			arr=[{
				name:'全部',
				value:-1,
			},{
				name:'机构订单',
				value:1,
			},{
				name:'居家订单',
				value:2,
			},];
		}
		$('#select_orderType').empty();
		arr.forEach(function(item,index){
			let opts=`<option value=${item.value}>${item.name}</option>`;
			$('#select_orderType').append(opts);
		})
		checkOrgBranch();
		hosBranch_data=res;
		if($('#select_orderType option:selected').val()==1){//直接暴露机构--居家
			initHos(res);
			$('.org_hos').removeClass('org_hide');
		}else{
			getOrderList(1,'orderType');
		}
	}
	function checkOrgBranch(){//机构时显示机构科室select
		$('#select_orderType').on('change',selectOrgBranch);
	}
	function selectOrgBranch(){//机构时显示机构科室select
		if($('#select_orderType option:selected').val()==1){
			initHos(hosBranch_data);
			$('.org_hos').removeClass('org_hide');
		}else{
			$('.org_hos').addClass('org_hide');
			$('.org_branch').addClass('org_hide');
		}
	}
	let branchList='';
	$('.org_hos').on('change',initBranch);
	function initHos(data){//加载hos-branch
		let org_data=data.orgList;
		branchList=data.branchMap;
		$('.org_hos').empty();
		if(org_data.length>1){
			$('.org_hos').append(`<option id="0">所有项目点</option>`);
		}
		org_data.forEach((item,index)=>{
			let optionNode='';
			optionNode=`
				<option id="${item.id}">${item.orgName}</option>
			`;
			$('.org_hos').append(optionNode);
		});
		let data_branch=branchList[$('.org_hos option:selected').attr('id')];
		if($('.org_hos option:selected').attr('id')!=0&&data_branch!=undefined&&data_branch.length&&!isEmpty(branchList)){//直接开始选择医院时
			initBranch('init');
		}else{
			getOrderList(1,'org');
		}
	}
	function isEmpty(obj) {
		for (var name in obj) {
			return false;
		}
		return true;
	}
	function initBranch(str){
		let data=branchList[$('.org_hos option:selected').attr('id')];
		$('.org_branch').empty();
		if(data==undefined||!data.length||isEmpty(branchList)){
			$('.org_branch').addClass('org_hide');
			return false;
		}
		$('.org_branch').removeClass('org_hide');
		if(data.length>1){
			$('.org_branch').append(`<option id="0">所有科室</option>`);
		}
		data.forEach((item,index)=>{
			let optionNode='';
			optionNode=`
				<option id="${item.id}">${item.branchName}</option>
			`;
			$('.org_branch').append(optionNode);
		});
		if(str=='init'){
			getOrderList(1,'branch');
		}
	}
	function getOrderList(pageNum,str) {
		var regBeginTime = $("#order-regBeginTime").val();
		var regEndTime = $("#order-regEndTime").val();
		var statusOrder = $("#select_orderstatus").val();
		var typeOrder = $("#select_orderType").val()||-1;
		var findUserName = $("#findUserName").val();
		var data = {};
		data.findUserName = findUserName;
		data.pageSize = 10;
		data.pageNum = pageNum;
		data.statusOrder = statusOrder;
		data.regBeginTime = regBeginTime;
		data.regEndTime = regEndTime;
		data.typeOrder = typeOrder;
		data['orgId']=$('.org_hos option:selected').attr('id')||0;
		data['branchId']=$('.org_branch option:selected').attr('id')||0;
		//发送请求
		httpUtilObj.ajax({
			url: '/adminjson/SAASGetOrderList',
			type: "POST",
			dataType: 'json',
			params: data
		}).then(function (result) {
			if (result.errorCode == 0) {
				if(str=='init'){//初始化时获得org-branch的权限，加载数据
					getOrg(result.body.rightJson);
				}else{
					$('#order-mask-bg').css('display','none');
					$('#order-mask').css('display','none');
					refreshgetOrderList(result.body);
					if (!paginationInit) {
						initPaginations(pageNum, result.body.count);
					}
				}
			}
		});
	}
	//实例化请求帮助类
	var httpUtilObj = new HttpUtil();
	$(".js-btn-showOrderList").on('click', function () {
		$('#order-mask-bg').css('display','block');
		$('#order-mask').css('display','block');
		var data = {};
		var findUserName = $("#findUserName").val();
		var statusOrder = $("#select_orderstatus").val();
		var regBeginTime = $("#order-regBeginTime").val();
		var regEndTime = $("#order-regEndTime").val();
		var typeOrder = $("#select_orderType").val();
		data.findUserName = findUserName;
		data.pageSize = pageSize;
		data.pageNum = 1;
		data.regBeginTime = regBeginTime;
		data.regEndTime = regEndTime;
		data.statusOrder = statusOrder;
		data.typeOrder = typeOrder;
		if(!$('.org_hos').hasClass('org_hide')){
			data['orgId']=$('.org_hos option:selected').attr('id');
		}
		if(!$('.org_branch').hasClass('org_hide')){
			data['branchId']=$('.org_branch option:selected').attr('id');
		}
		httpUtilObj.ajax({
			url: '/adminjson/SAASGetOrderList',
			type: "POST",
			dataType: 'json',
			params: data
		}).then(function (result) {
			if (result.errorCode == 0) {
				$('#order-mask-bg').css('display','none');
				$('#order-mask').css('display','none');
				console.log(result.body);
				refreshgetOrderList(result.body);
				paginationInit = false;
				if (!paginationInit) {
					initPaginations(0, result.body.count);
				}
			}
		});
	});
	//开始服务
	$("body").on('click', ".js-form-order-Start", function () {
		var elem = $(this);
		var orderId = elem.attr("orderId");
		var orderstatus = elem.attr("orderstatus");
		var curr_pageNum=$(this).attr('pagenum');
		bootbox.confirm({
			title: "系统提示",
			message: "是否开启服务，请确认？",
			buttons: {
				confirm: {
					label: '确定',
					//					className: 'btn-success'
				},
				cancel: {
					label: '取消',
					//					className: 'btn-danger'
				}
			},
			callback: function (isConfirm) {
				if (isConfirm) {
					var param = {
						orderId: orderId,
						orderstatus: orderstatus
					}
					//发送请求
					G_OrderModule.UpdateOrder(param).then(function (result) {
						if (result.errorCode == 0) {
							$.toast({
								heading: '系统消息',
								text: '操作成功！',
								position: 'top-right',
								icon: 'success',
								loaderBg: '#9EC600',
								stack: false
							});
						}
						paginationInit = false;
						getOrderList(curr_pageNum);
					});
				}
			}
		});
	});

	//结束服务
	$("body").on('click', ".js-form-order-End", function () {
		var elem = $(this);
		var orderId = elem.attr("orderId");
		var orderstatus = elem.attr("orderstatus");
		var curr_pageNum=$(this).attr('pagenum');
		if(elem.attr('currstatus')==1){
			top.tm.addTab(elem.attr('title'), 'templates/orderDetail.html?orderId='+orderId);
			setTimeout(function(){
				top.importOnceJS('js-script-order_detail', "js/app/rp/order_detail.js");
				top.extraService_orderDetail(orderId,'endOrder');
			},500)
		}else{
			bootbox.confirm({
				title: "系统提示",
				message: "是否关闭服务，请确认？",
				buttons: {
					confirm: {
						label: '确定',
						//					className: 'btn-success'
					},
					cancel: {
						label: '取消',
						//					className: 'btn-danger'
					}
				},
				callback: function (isConfirm) {
					if (isConfirm) {
						var param = {
							orderId: orderId,
							orderstatus: orderstatus
						}
						//发送请求
						G_OrderModule.UpdateOrder(param).then(function (result) {
							if (result.errorCode == 0) {
								$.toast({
									heading: '系统消息',
									text: '操作成功！',
									position: 'top-right',
									icon: 'success',
									loaderBg: '#9EC600',
									stack: false
								});
							}
							paginationInit = false;
							getOrderList(curr_pageNum);
						});
					}
				}
			});
		}
	});

	// 跳过评估
	$("body").on('click', ".js-form-order-pg-skip", function () {
		var elem = $(this);
		var orderId = elem.attr("orderId");
		var orderstatus = elem.attr("orderstatus");
		var curr_pageNum=$(this).attr('pagenum');
		bootbox.confirm({
			title: "跳过评估",
			message: "是否确定跳过评估直接指派健康经理？",
			buttons: {
				confirm: {
					label: '确定',
					//					className: 'btn-success'
				},
				cancel: {
					label: '取消',
					//					className: 'btn-danger'
				}
			},
			callback: function (isConfirm) {
				if (isConfirm) {
					var param = {
						orderId: orderId,
						pgStatus: 2
					}
					//发送请求
					G_OrderModule.skipAssess(param).then(function (result) {
						if (result.errorCode == 0) {
							$.toast({
								heading: '系统消息',
								text: '操作成功！',
								position: 'top-right',
								icon: 'success',
								loaderBg: '#9EC600',
								stack: false
							});
						}
						paginationInit = false;
						getOrderList(curr_pageNum);
					});
				}
			}
		});
	});

	//order订单备注
	$("body").on('click', ".js-form-order-remark", function () {
		top.importOnceJS('js-script-form-order-remark', "js/app/modal/update_order_remak.js");
		var elem = $(this);
		var orderId = elem.attr("orderId");
		var orderstatus = elem.attr("orderstatus");
		var curr_pageNum=elem.attr('pagenum');
		top.G_OpenUpdateOrderRemark(orderId, orderstatus).then(function (data) {
			paginationInit = false;
			getOrderList(curr_pageNum);
		});
	});

	//分配护工
	$("body").on('click', ".js-form-order-HG", function () {
		top.importOnceJS('js-script-form-order-HG', "js/app/modal/select_serve_hg.js");
		var elem = $(this);
		var orderId = elem.attr("orderId");
		var curr_pageNum=$(this).attr('pagenum');
		top.G_OpenSelectOrderHgWin(orderId).then(function (data) {
			paginationInit = false;
			getOrderList(curr_pageNum);
		});
	});

	//续交金额
	$("body").on('click', ".btn-money-submit", function () {
		var payType = $("input:checkbox:checked");
		if (payType.length <= 0) {
			Toast.error("请选择续交的月份！");
			return;
		} else {
			var Time = 0;
			var clickBoxs;
			payType.each(function () {
				var clickBox = parseInt($(this).val());
				if (clickBox > Time) {
					Time = clickBox;
					clickBoxs = $(this);
				}
			});

			verificationChoice(Time, clickBoxs);
			var fee = 0;
			var serviceTimes = [];
			$("input:checkbox:checked").each(function () {
				serviceTimes.push($(this).attr("time"));
				fee += parseInt($(this).attr("fee"));
			});
			var orderId = $("#show_prepay_continue #hidden_orderId").val();

			$("#show_payment-method_panel #hidden_time").val("").val(serviceTimes);

			$("#show_payment-method_panel #hidden_orderId").val("").val(orderId);
			$("#show_payment-method_panel .control-label-prepay").empty().html(fee / 100);
			console.log(serviceTimes);
			top.importOnceJS('js-script-panel-update-alteration', "js/app/rp/order_prepay.js");
			var orderId = $("#show_prepay_continue #hidden_orderId").val();
			var userId = $("#show_payment-method_panel #hidden_userId").val();
			let obj={
				orderId:orderId,
				userId:userId,
				type:'orderCost',
				months:serviceTimes.join(','),
			}
			console.log(obj);
			top.G_fun_showPrepay_order(obj);
		}
	});

	//支付续交金额
	$("body").on('click', ".btn-success-paymentBtn", function () {
		var payType = $("input[name='prepay_payment_entrance_type']:checked").val();
		if (payType === undefined) {
			Toast.error("请选择支付方式！");
			return;
		} else {
			var orderId = $("#show_payment-method_panel #hidden_orderId").val();
			var serviceTime = $("#show_payment-method_panel #hidden_time").val();
			var serviceTimes = serviceTime.split(",");
			var param = {};
			param["orderId"] = orderId;
			param["orderstatus"] = 5;
			param["months"] = serviceTimes;
			param["payType"] = payType;
			param["operation"] = "PAY_ORDERSETTLE";
			param["userId"] = $("#show_payment-method_panel #hidden_userId").val();
			G_OrderModule.doPay(param).then(function (data) {
				if (data && data.errorCode == 0) {
					Toast.success("操作成功");
					show_prepay_continuebackdrop
					$("#show_payment-method_panel").removeClass('show');
					$("#show_prepay_continue").removeClass('show');
					$("#show_payment-method_panelbackdrop").hide();
					$("#show_prepay_continuebackdrop").hide();
					paginationInit = false;
					getOrderList(1);

				} else {
					Toast.error(data.msg);
				}
			});
		}
	});

//	//支付预交金
//	$("body").on('click',".btn-success-prepayBtn", function(){
//		var payType = $("input[name='prepay_payment_entrance_type']:checked").val();
//		if(payType === undefined){
//			Toast.error("请选择支付方式！");
//			return;
//		}else{
//			var orderId = $("#show_payment-method_panel #hidden_orderId").val();
//			var serviceTime = $("#show_payment-method_panel #hidden_time").val();
//			var  serviceTimes = serviceTime.split(",");
//			var param = {};
//			param["orderId"] = orderId;
//			param["orderstatus"] = 5;
//			param["months"] = serviceTimes;
//			param["payType"] =  payType;
//			param["operation"] = "PAY_ORDERSETTLE";
//			param["userId"] = $("#show_payment-method_panel #hidden_userId").val();
//			G_OrderModule.doPay(param).then(function(data){
//				if(data && data.errorCode==0){
//					Toast.success("操作成功");
//					show_prepay_continuebackdrop
//					$("#show_payment-method_panel").removeClass('show');
//					$("#show_prepay_continue").removeClass('show');
//					$("#show_payment-method_panelbackdrop").hide();
//					$("#show_prepay_continuebackdrop").hide();
//					paginationInit = false;
//					getOrderList(1);
//					
//				}else{
//					Toast.error(data.msg);
//				}
//			});
//		}
//	});
	
	
	
	
	//订单修改
	$("body").on('click', "#showOrder_alteration_panel .modal_save_update", function () {

		var param = {};
		var orderType = $('#showOrder_alteration_panel #hidden_orderType').val();
		var orderId = $("#showOrder_alteration_panel .js-change-order-number").html();
		var branchId = $('#showOrder_alteration_panel #hidden_branchId').val();
		var roomId = $("#showOrder_alteration_panel #hidden_roomId").val();
		var bedId = $("#showOrder_alteration_panel #hidden_bedId").val();
		//		var = $("#showOrder_alteration_panel #hidden_hgId").val();
		var orgId = $("#showOrder_alteration_panel #hidden_orgId").val();
		var priceId = $("#showOrder_alteration_panel #hidden_priceId").val();
		var hgId = $("#showOrder_alteration_panel #hidden_hgId").val();
		var curr_pageNum=$(this).closest('#showOrder_alteration_panel').attr('pagenum');
		param["orderId"] = orderId;
		param["branchId"] = branchId;
		param["roomId"] = roomId;
		param["bedId"] = bedId;
		param["orgId"] = orgId;
		param["priceId"] = priceId;
		param["orderstatus"] = 3;
		param["hgId"] = hgId;
		G_OrderModule.UpdateOrder(param).then(function (data) {
			if (data && data.errorCode == 0 && data.body) {
				Toast.success("操作成功");
				paginationInit = false;
				getOrderList(curr_pageNum);
				showAlterationModal.hide()
			} else {
				Toast.error(data.msg);
			}
		});
	});


	//预付金缴付
	$("body").on('click', ".js-form-order-prepay", function () {
		var curr_pageNum=$(this).attr('pagenum');
		top.importOnceJS('js-script-order_detail', "js/app/rp/order_detail.js");
		top.getInCash_orderDetail($(this).attr('orderid'),'prepay',$(this).attr('ordertype')).then((res)=>{
			getOrderList(curr_pageNum);
		})
	});

	// 续缴费用
	var showContinueModal = new ModalPanel("#show_prepay_continue");
	$("body").on('click', ".js-form-order-cost", function () {
		$(".select_continue_list").empty();

		var elem = $(this);
		var orderId = elem.attr("orderId");
		var userId = elem.attr("userId");
		var param = {};
		var curr_pageNum=$(this).attr('pagenum');
		param["orderId"] = orderId;
		$("#show_prepay_continue #hidden_orderId").val("").val(orderId);
		$("#show_payment-method_panel #hidden_userId").val("").val(userId); 
		doHttp(param, '/adminjson/SAASGetOrderItemList').then(function (data) {
			if (data && data.errorCode == 0 && data.body) {
				var tableHtmls = getOrderHushilistHtml(data.body);
				$('#show_prepay_continue .select_continue_list').empty().append(tableHtmls);
				$('#show_prepay_continue .panel-body table tbody tr').css({
					'cursor':'pointer',
				}).off('click').on('click',function(){
					if($(this).find('td:nth-child(1) input').prop('checked')){
						$(this).find('td:nth-child(1) input').prop('checked',false);
					}else{
						$(this).find('td:nth-child(1) input').prop('checked',true);
					}
				})
				$('#show_prepay_continue .panel-body table tbody tr td:nth-child(1) input').off('click').on('click',function(){
					if($(this).prop('checked')){
						$(this).prop('checked',false);
					}else{
						$(this).prop('checked',true);
					}
				})
			}
		});
		showContinueModal.show(curr_pageNum);
	});

	// 创建评估
	$("body").on('click', ".js-form-order-pg-create", function () {
		top.importOnceJS('js-script-insure_handle', "js/app/rp/insure_handle.js");
		let orderid=$(this).attr('orderid');
		let kinsname=$(this).attr('kinsname');
		let obj={
			orderid:orderid,
			kinsname:kinsname
		}
		top.modal_show_pg_create(obj);
	});
	//变更订单
	var showAlterationModal = new ModalPanel("#showOrder_alteration_panel");
	$("body").on('click', ".js-form-order-change", function () {
		$("#showOrder_alteration_panel .modal_save").unbind("click");
		var elem = $(this);
		var orderId = elem.attr("orderId");
		var curr_pageNum=$(this).attr('pagenum');
		$("#showOrder_alteration_panel .js-change-order-number").empty().html(orderId);
		var param = {
			orderId: orderId
		}
		//发送请求
		doHttp(param, '/adminjson/SAASGetOrderInfo').then(function (data) {
			if (data && data.errorCode == 0 && data.body) {
				removeList();
				var order = data.body;
				console.log(order);
				$('#showOrder_alteration_panel #hidden_orderType').val("").val(order.orderType);
				$('#showOrder_alteration_panel #hidden_priceType').val("").val(order.serviceType);
				$('#showOrder_alteration_panel #hidden_companyId').val("").val(order.companyId);
				$('#showOrder_alteration_panel #hidden_hgId').val("").val(order.hgId);
				$('#showOrder_alteration_panel #hidden_priceId').val("").val(order.priceId);
				if (order.orderType == 1) {
					$("#showOrder_alteration_panel  .table-orderType-jg").show();
					$("#showOrder_alteration_panel  .table-orderType-jj").hide();
					$('#showOrder_alteration_panel #hidden_orgId').val("").val(order.orgId);
					$('#showOrder_alteration_panel #hidden_branchId').val("").val(order.branchId);
					$('#showOrder_alteration_panel #hidden_companyBranchId').val("").val(order.companyBranchId);
					$('#showOrder_alteration_panel #hidden_companyId').val("").val(order.companyId);
					$('#showOrder_alteration_panel #hidden_extraFee').val("").val(order.extraFee);
					$('#hidden_extra').val("true").attr("payEntrance", "");
					$('#showOrder_alteration_panel #hidden_extraFees').val("").val(order.extraFees);


					$('#showOrder_alteration_panel #hidden_roomId').val("").val(order.roomId);
					$('#showOrder_alteration_panel #hidden_bedId').val("").val(order.bedId);
					$('#showOrder_alteration_panel #hidden_hgId').val("").val(order.hgId);
					$('#showOrder_alteration_panel #hidden_priceId').val("").val(order.priceId);
					$('#showOrder_alteration_panel .js-panel-orgName').empty().html(order.orgName);
					$('#showOrder_alteration_panel .js-panel-branchName').empty().html(order.branchName);
					$('#showOrder_alteration_panel .js-panel-roomNo').empty().html(order.roomNo);
					$('#showOrder_alteration_panel .js-panel-bedNo').empty().html(order.bedNo);

					$('#showOrder_alteration_panel .js-panel-hgName').empty().html(order.hgName);
					$('#showOrder_alteration_panel .js-panel-serviceUnit').empty().html(order.serviceUnit);
					$('#showOrder_alteration_panel .js-panel-price').empty().html(order.priceUnit);
					$('#showOrder_alteration_panel .js-panel-serviceItem').empty().html(order.serviceItem);
				} else {
					$("#showOrder_alteration_panel  .table-orderType-jg").hide();
					$("#showOrder_alteration_panel  .table-orderType-jj").show();
					$('#showOrder_alteration_panel .js-panel-price-jj').empty().html(order.priceUnit);
					$('#showOrder_alteration_panel .js-panel-hgName-jj').empty().html(order.hgName);
					$('#showOrder_alteration_panel .js-panel-serviceItem-jj').empty().html(order.serviceItem);
				}
			}
		});
		showAlterationModal.show(curr_pageNum);
	});

	//订单修改
	$("body").on('click', ".js-update-alteration-btn", function () {
		top.importOnceJS('js-script-panel-update-alteration', "js/app/rp/order_prepay.js");
		var elem = $(this);

		var Ids;
		var param = {};
		var orderId = $("#showOrder_alteration_panel .js-change-order-number").html();
		var typeName = elem.attr("typeName");
		if (typeName === 'branchName') {
			Ids = $('#showOrder_alteration_panel #hidden_branchId');
		} else if (typeName === 'roomNo') {
			var branchId = $('#showOrder_alteration_panel #hidden_branchId');
			Ids = $('#showOrder_alteration_panel #hidden_roomId');
			param["branchId"] = branchId.val();

		} else if (typeName == 'bedNo') {
			var branchId = $('#showOrder_alteration_panel #hidden_branchId');
			var roomId = $('#showOrder_alteration_panel #hidden_roomId');
			Ids = $('#showOrder_alteration_panel #hidden_bedId');
			param["branchId"] = branchId.val();
			param["roomId"] = roomId.val();
		} else if (typeName == 'serviceItem') {
			var branchId = $('#showOrder_alteration_panel #hidden_branchId');
			Ids = $('#showOrder_alteration_panel #hidden_priceId');
			param["branchId"] = branchId.val();
		} else if (typeName == "hgName") {
			var branchId = $('#showOrder_alteration_panel #hidden_branchId');
			var priceId = $("#showOrder_alteration_panel #hidden_priceId");
			Ids = $('#showOrder_alteration_panel #hidden_hgId');
			param["branchId"] = branchId.val();
			param["priceId"] = priceId.val();

		}
		var orgsId = $('#showOrder_alteration_panel #hidden_orgId');
		var orgId = orgsId.val();
		param["orgId"] = orgId;
		param["typeName"] = typeName;
		param["orderId"] = orderId;
		top.G_Fun_showUpdateAlteration(param).then(function (data) {
			if (typeName === "branchName") {
				var paramOrg = {};
				var companyId = $('#showOrder_alteration_panel #hidden_companyId').val();
				paramOrg["orgId"] = orgId;
				paramOrg["branchId"] = data.branchId;
				paramOrg["companyId"] = companyId;
				doHttp(paramOrg, '/adminjson/SAASGetCompanyOrg').then(function (dataOrg) {
					if (dataOrg && dataOrg.errorCode == 0 && dataOrg.body) {
						var co = dataOrg.body.co;
						var extraFee = $('#showOrder_alteration_panel #hidden_extraFee').val()
						if (parseInt(co.entranceCardPriceFee) != parseInt(extraFee)) {
							showEntrance(co, parseInt(extraFee));
						} else {
							$('#hidden_extra').val("true");
						}
					}
				});
				if (data.priceStr != undefined) {
					$('#showOrder_alteration_panel #hidden_priceId').val(data.priceId);
					$('#showOrder_alteration_panel .js-update-price').html(data.priceName);
					$('.js-panel-price').html(data.priceStr)
				}
			}
			Ids.val(data.branchId);
			elem.html(data.branchName);
			elem.attr('typeName', typeName);
		});

	});

	//订单修改
	$("body").on('click', ".js-update-price", function () {
		top.importOnceJS('js-script-panel-update-prices', "js/app/rp/select_price.js");
		var elem = $(this);

		var Ids;
		var param = {};
		var orderId = $("#showOrder_alteration_panel .js-change-order-number").html();
		var branchId = $('#showOrder_alteration_panel #hidden_branchId');
		var orderType = $('#showOrder_alteration_panel #hidden_orderType');
		Ids = $('#showOrder_alteration_panel #hidden_priceId');
		param["branchId"] = branchId.val();

		var orgsId = $('#showOrder_alteration_panel #hidden_orgId');
		var orgId = orgsId.val();
		param["orgId"] = orgId;
		param["orderId"] = orderId;
		param["orderType"] = orderType.val();
		param["orderId"] = orderId;
		top.G_Fun_showUpdatepriveations(param).then(function (data) {
			Ids.val(data.branchId);
			
			elem.html(data.branchName);
			if (data.priceStr != undefined) {
				$('.js-panel-price').html(data.priceStr)
				$('.js-panel-price-jj').html(data.priceStr)
			}
			var orderType = $('#showOrder_alteration_panel #hidden_orderType').val();
			if(orderType == 1){
				var priceType = $('#showOrder_alteration_panel #hidden_priceType').val();
				var update = data.serviceType;
				console.log(priceType);
				console.log(update);
				if(priceType != update && update == 1 && priceType == 2) {
					top.importOnceJS('js-script-panel-update-alteration', "js/app/rp/order_prepay.js");

					var param = {};
					var orderId = $("#showOrder_alteration_panel .js-change-order-number").html();
					
					var branchId = $('#showOrder_alteration_panel #hidden_branchId');
					var priceId = $("#showOrder_alteration_panel #hidden_priceId");
					param["branchId"] = branchId.val();
					param["priceId"] = priceId.val();

					var orgsId = $('#showOrder_alteration_panel #hidden_orgId');
					var orgId = orgsId.val();
					param["orgId"] = orgId;
					param["typeName"] = "hgName";
					param["orderId"] = orderId;
					top.G_Fun_showUpdateAlteration(param).then(function (data) {
						$("#showOrder_alteration_panel #hidden_hgId").val(data.branchId);
						$("#showOrder_alteration_panel #hidden_priceType").val(update);
						
						$("#showOrder_alteration_panel .js-panel-hgName").html(data.branchName);
						$("#showOrder_alteration_panel .js-panel-hgName").attr('typeName', "hgName");
					});
				}
			}
		});
	});

	//续交金额
	$("body").on('click', "#showOrder_alteration_panel .modal_save", function () {
		var orderId = $("#show_prepay_continue #hidden_orderId").val();
		var param = {};
		param["orderId"] = orderId;
		param["orderstatus"] = 5;
		param["serviceTimes"] = serviceTimes;
		G_OrderModule.UpdateOrder(param).then(function (data) {
			if (data && data.errorCode == 0 && data.body) {
				Toast.success("操作成功");
				paginationInit = false;
				getOrderList(1);
				showContinueModal.hide();
			} else {
				Toast.error(data.msg);
			}
		})
	});

	/***********begin*******************************/
	var OrderHushilist =
		'<table class="table table-stripeds">' +
		'	<thead>' +
		'		<tr>' +
		'			<th>#</th>' +
		'			<th>时间</th>' +
		'      		<th>支付金额</th>' +
		'      		<th>应交金额</th>' +
		'      		<th>服务时间</th>' +
		'      	</tr>' +
		'	</thead>' +
		'	<tbody>' +
		'{{each voList as item i}}' +
		'		<tr>' +
		'			<td><input name="Fruit" class="checkData" serviceTime="{{item.serviceTime}}" time = "{{item.settleDate}}" fee ="{{item.needPay}}" type="checkbox" value="{{item.settleDate}}" /></td>' +
		'			<td>{{item.settleDate}}</td>' +
		
		'			<td>{{item.confirmCostStr}}</td>' +
		'			<td>{{item.needPayStr}}</td>' +
		'			<td>{{item.serviceTime}}</td>' +
		'		</tr>' +
		'{{/each}}' +
		'	</tbody>' +
		'</table>';

	var getOrderHushilistHtml = function (data) {
		var render = template.compile(OrderHushilist);
		var html = render(data);
		return html;
	}
	/***********end*********************************/

	$("body").on('click', ".checkData", function () {
		var clickBox = $(this).val();
		verificationChoice(clickBox, $(this));
	});

	var verificationChoice = function (data, self) {
		self.closest('tbody').find('input').each(function () {
			var more = $(this).val();
			if (parseInt(data) > parseInt(more)) {
				$(this).prop("checked", "checked");
			}
		});
	}

	var showEntranceModal = new ModalPanel("#show_entrance_panel");
	var showEntrance = function (data, extraFee) {
		var extraFees = $('#hidden_extraFees').val();
		$('#hidden_extra').val("false").attr("payEntrance", "");
		$("#show_entrance_panel .control-label-noworiginal-prepay").empty().html(data.entranceCardPrice);
		$("#show_entrance_panel .control-label-now-prepay").empty().html(extraFees);
		$("#show_entrance_panel .control-label-pay-prepay").empty().html(parseInt(data.entranceCardPrice) - parseInt(extraFees));

		$("#show_entrance_panel .prepay_pay_redio").empty().append("<label class='radio-inline'><input type='radio'  name='prepay_pay_entrance_type' value='1' >账号支付</label><label class='radio-inline'><input type='radio'  name='prepay_pay_entrance_type' value='2' >现金支付</label>");
		showEntranceModal.show();

	}


	//续交金额
	$("#show_entrance_panel").on('click', ".btn-success-entrance-Btn", function () {
		var payType = $("input[name='prepay_pay_entrance_type']:checked").val();
		if (payType === undefined) {
			Toast.error("请选择支付方式！");
			return;
		} else {
			$('#hidden_extra').val("true").attr("payEntrance", payType);
			showEntranceModal.hide();

		}

	});
	function removeList() {
		$('#showOrder_alteration_panel #hidden_orderType').val("");
		$('#showOrder_alteration_panel #hidden_companyId').val("");
		$('#showOrder_alteration_panel #hidden_hgId').val("");
		$('#showOrder_alteration_panel #hidden_priceId').val("");

		$('#showOrder_alteration_panel .js-panel-price-jj').empty();
		$('#showOrder_alteration_panel .js-panel-hgName-jj').empty();
		$('#showOrder_alteration_panel .js-panel-serviceItem-jj').empty();


		$('#showOrder_alteration_panel #hidden_orgId').val("");
		$('#showOrder_alteration_panel #hidden_branchId').val("");
		$('#showOrder_alteration_panel #hidden_companyBranchId').val("");
		$('#showOrder_alteration_panel #hidden_companyId').val("");
		$('#showOrder_alteration_panel #hidden_extraFee').val("");
		$('#hidden_extra').val("true").attr("payEntrance", "");
		$('#showOrder_alteration_panel #hidden_extraFees').val("");

		$('#showOrder_alteration_panel #hidden_roomId').val("");
		$('#showOrder_alteration_panel #hidden_bedId').val("");
		$('#showOrder_alteration_panel #hidden_hgId').val("");
		$('#showOrder_alteration_panel #hidden_priceId').val("");
		$('#showOrder_alteration_panel .js-panel-orgName').empty();
		$('#showOrder_alteration_panel .js-panel-branchName').empty();
		$('#showOrder_alteration_panel .js-panel-roomNo').empty();
		$('#showOrder_alteration_panel .js-panel-bedNo').empty();


		$('#showOrder_alteration_panel .js-panel-hgName').empty();
		$('#showOrder_alteration_panel .js-panel-serviceUnit').empty();
		$('#showOrder_alteration_panel .js-panel-price').empty();
		$('#showOrder_alteration_panel .js-panel-serviceItem').empty();
	}

	//绑定，选择健康经理或督导按钮
	$('body').on('click', ".js-select-insureHandleNure-JKJL", function () {
		top.importOnceJS('js-select-nations', "js/app/modal/select_insure_handle_nure.js");
		var elem = $(this);
		var nurseType = elem.attr("nurseType");
		var orderId = elem.attr("orderId");
		var curr_pageNum=$(this).attr('pagenum');
		top.G_OpenSelectInsureHandleNureWin(nurseType, orderId).then(function (data) {
			console.log("hs:" + JSON.stringify(data));
			elem.html(data["hgName"]);
			elem.attr('hgId', data.hgId);
			getOrderList(curr_pageNum);
		});
	});

	getOrderList(1,'init');
	
	//订单管理--新建订单
	$('body').on('click','.order-newSet',function(){
		console.log('order-newSet');
		top.importOnceJS('js-script-insure_handle', "js/app/rp/insure_handle.js");
		top.orderManage_crateNewSet();
	})
	//取消订单
	$('body').off('click','.js-form-order-cancel').on('click','.js-form-order-cancel',function(){
		var curr_pageNum=$(this).attr('pagenum');
		var orderId = $(this).attr("orderId");
		bootbox.confirm({
			title: "系统提示",
			message: "是否确定取消订单？",
			buttons: {
				confirm: {
					label: '确定',
					//					className: 'btn-success'
				},
				cancel: {
					label: '取消',
					//					className: 'btn-danger'
				}
			},
			callback: function (isConfirm) {
				if (isConfirm) {
					let httpUtilObj = new HttpUtil();
					var params = {
						orderId: orderId,
					}
					httpUtilObj.ajax({
						url: '/adminjson/SAASCancelOrder',
						params: params
					}).then((res)=>{
						getOrderList(curr_pageNum);
						checkOrderCancel(orderId,curr_pageNum);
					});
				}
			}
		});
	});
	function checkOrderCancel(id,page){//取消订单时，判断是否退款
		let httpUtilObj = new HttpUtil();
		var params = {
			orderId: id,
		}
		httpUtilObj.ajax({
			url: '/adminjson/SAASGetOrderDetailInfo',
			params: params
		}).then((res)=>{
			if(res.body.needRefundExtra||res.body.needRefundPrePay){
				top.importOnceJS('js-script-order_detail', "js/app/rp/order_detail.js");
				top.orderFeeBack(id).then((res)=>{
					getOrderList(page);
				})
			}else{
				Toast.success("取消订单成功！");
			}
		})
	}
	//扫描二维码------住院号
	$('#findUserName').keyup((evt)=>{
		let org_num=$('#findUserName').val();
		if(org_num.indexOf("ZY")!=-1&&org_num.length==14){
			let arr=org_num.split('');
			arr.splice(0,4);
			$('#findUserName').val(arr.join(''));
		}
		if(org_num.indexOf("yjy://order/detail?orderId=")!=-1){
			let arr=org_num.split('?');
			$('#findUserName').val(arr[1].split('=')[1]);
		}
		if (evt.keyCode == 13) {//回车
			$(".js-btn-showOrderList").click();
		}
	});
});
