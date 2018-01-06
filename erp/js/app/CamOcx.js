var pageSize = 10;
var paginationInit = false;
var img1='';
var img2='';
var reco_params;
//初始化入口
initOrder();
//初始化入口
function initOrder(){
	$('#queryinput').focus();
	//点击拍摄手环或入院通知书
	$('#order-photo').on('click',function(){
		$('#queryinput').val('');
		$('.order-searchkey').removeClass('order-show');
		$('.order-searchResult').removeClass('order-show');
		top.orderManage_iframe_getphoto('inorder').then((res)=>{
			reco_params=res;
			orderResult(res.hospitalBra);
		})
	});
	//新建订单
	$('#query-new').on('click',function(){
		$('.order-searchkey').removeClass('order-show');
		$('.order-searchResult').removeClass('order-show');
		$('#queryinput').val('');
		top.importOnceJS('js-script-insure_handle', "js/app/rp/insure_handle.js");
		top.orderManage_HospitalDetail('nopic').then((res)=>{
			$('#queryinput').val(res);
			$('#querysearch').click();
		})
	});
	//订单搜索
	$('#querysearch').on('click',function(){
		querySearchList(1);
	});
	//回车搜索
	$('#queryinput').keydown(function (event) {
		if((event.keyCode || event.which)==13) {
			event.preventDefault();//阻止浏览器默认行为
			querySearchList(1);
		}
	});
	//支付方式的展示
	queryPayType('init');
	//支付方式--搜索过滤
	$('#payTypeSearch').off('click').on('click',function(){
		queryPayType('search');
	})
}
//支付方式的展示
function queryPayType(str){
	//获取时间
	commonFunc.getMinHourDate();
	$('.showPayType i').off('click').on('click',function(){
		$(this).closest('div.col-lg-12').find('>div').toggleClass('org_hide');
		if($(this).closest('div.col-lg-12').find('>div').hasClass('org_hide')){
			$(this).html('展开流水筛选');
		}else{
			$(this).html('收起流水筛选');
		}
	})
	var params={
		pageNO:1,
		pageSize:pageSize,
		startTime:$('input[name="daterange-start"]').val(),
		endTime:$('input[name="daterange-end"]').val(),
		staffId:$('.query-staff option:selected').val()||0,
	};
	let httpUtilObj = new HttpUtil();
	httpUtilObj.ajax({
		url: '/adminjson/SAASSearchOrder ',
		params: params
	}).then((res)=>{
		let ele_staff=$('.query-staff');
		let payData=res.body.jsonPayType;
		$('.query-needpay .query-cash em').html(payData.cashPay);
		$('.query-needpay .query-online em').html(payData.onlinePay);
		$('.query-return .query-cash em').html(payData.cashRefund);
		$('.query-return .query-online em').html(payData.onlineRefund);
		if(str=='init'){
			if(res.body.hasPayType){//非员工
				$('.showPayType b').html('支付方式');
				ele_staff.removeClass('org_hide');
			}else{//员工
				$('.showPayType b').html('支付方式（员工）');
				ele_staff.addClass('org_hide');
			}
			//收/退款人
			if(payData.staffAry.length&&!ele_staff.hasClass('org_hide')){
				if(payData.staffAry.length>1){
					ele_staff.append(`<option value="0">所有</option>`);
				}
				payData.staffAry.forEach((item)=>{
					let t_node=`<option value="${item.staffId}">${item.staffName}</option>`;
					ele_staff.append(t_node);
				})	
			}
		}
		
	})
}
//获取table数据
function querySearchList(pageNum){
	var search_key=$('#queryinput').val();
	if(!$('.order-searchkey').hasClass('order-show')){
		if(!search_key){
			Toast.error("搜索条件不能为空");
			return false;
		};
	}else{
		if(search_key==''){
			search_key=$('.order-searchkey ul li:nth-child(1) i').html();
		}else{
			$('.order-searchkey').removeClass('order-show');
		}
	}
	var params={
		key:search_key,
		pageNO:pageNum,
		pageSize:pageSize,
	};
	let httpUtilObj = new HttpUtil();
	httpUtilObj.ajax({
		url: '/adminjson/SAASSearchOrder ',
		params: params
	}).then((res)=>{
		refreshgetOrderList(res.body);
		paginationInit = false;
		if (!paginationInit) {
			initPaginations(pageNum, res.body.count,'querysearch');
		}
	})
}
var refreshgetOrderList = function (data) {
	$('.order-searchResult').addClass('order-show');
	var getOrderListHtml = template('OrderListTemplate', data);
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
function getSearchKey(data){//获得搜索关键字
	$('.order-searchkey').addClass('order-show');
	$('.order-searchkey ul').empty();
	data.forEach(function(item,i){//<li><span>住院号：</span><i>0000569874</i></li>
		var liNode=$('<li><span>'+item.key+'：</span><i>'+item.value+'</i></li>');
		$('.order-searchkey ul').append(liNode);
	})
}
//初始化分页控件
function initPaginations(nowPage, count,orgNum,name) {
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
				if(orgNum=='querysearch'){
					querySearchList(page_index + 1);
				}else{
					photoGetOrder(orgNum,name,page_index + 1);
				}
			} else {
				paginationInit = true;
			}

		},
		'current_page': (nowPage <= 1) ? 0 : (nowPage - 1)
	});
}
function orderResult(data){
	if(data.orgNO==undefined||data.name==undefined){
		$('.order-photo-result').css('display','block');
		$('.gate-manage-mask').css('display', 'block');
		$('.order-photo-result .order-success').removeClass('order-show');
		$('.order-photo-result .order-error').addClass('order-show');
		$('.order-photo-result .order-footer ul li:nth-child(2)').css('display', 'none');
		Toast.error("图片识别失败");
	}else{
		Toast.success("图片识别完成");
		photoGetOrder(data.orgNO,data.name,1);//查询有无此订单
	}
	$('.order-photo-result .gate-footer ul li:nth-child(1)').on('click',function(){
		$('.order-photo-result').css('display','none');
		$('.gate-manage-mask').css('display', 'none');
	})
}
function photoGetOrder(orgNum,name,pageNum){
	var params = {
		orgNO :orgNum,
		name: name,
		pageNO:pageNum,
		pageSize:pageSize,
	}
	let httpUtilObj = new HttpUtil();
	httpUtilObj.ajax({
		url: '/adminjson/SAASSearchOrder ',
		params: params
	}).then((res)=>{
		if(res.body.count==0){
			$('.order-photo-result').css('display','block');
			$('.gate-manage-mask').css('display', 'block');
			$('.order-photo-result .order-success').addClass('order-show');
			$('.order-photo-result .order-error').removeClass('order-show');
			$('.order-photo-result .order-footer ul li:nth-child(2)').css('display', 'block');
			$('.order-photo-result .order-success .orgno i').html(orgNum);
			$('.order-photo-result .order-success .name i').html(name);
			photoSetOrder(params);//新建订单
			return false;
		}
		var searchkey=[
		{
			key:'住院号',
			value:orgNum,
		},
		{
			key:'姓名',
			value:name
		},
		]
		getSearchKey(searchkey);//关键字搜索
		refreshgetOrderList(res.body);
		paginationInit = false;
		if (!paginationInit) {
			initPaginations(pageNum, res.body.count,orgNum,name);
		}
	})
}
function photoSetOrder(data){
	$('.order-photo-result .gate-footer ul li:nth-child(2)').on('click',function(){
		$('.order-photo-result').css('display','none');
		$('.gate-manage-mask').css('display', 'none');
		top.importOnceJS('js-script-insure_handle', "js/app/rp/insure_handle.js");
		console.log(reco_params);
		top.orderManage_HospitalDetail('hasone',reco_params);
	})
}


//预付金缴付
$("body").on('click', ".js-form-order-prepay", function () {
	var curr_pageNum=$(this).attr('pagenum');
	top.importOnceJS('js-script-order_detail', "js/app/rp/order_detail.js");
	top.getInCash_orderDetail($(this).attr('orderid'),'prepay',$(this).attr('ordertype')).then((res)=>{
		querySearchList(curr_pageNum);
	})
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
					querySearchList(curr_pageNum);
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
	var curr_pageNum=$(this).attr('pagenum');
	top.G_OpenUpdateOrderRemark(orderId, orderstatus).then(function (data) {
		paginationInit = false;
		querySearchList(curr_pageNum);
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
							querySearchList(curr_pageNum);
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
						querySearchList(curr_pageNum);
					});
				}
			}
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
			querySearchList(curr_pageNum);
		});
	});

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
				querySearchList(1);
				showAlterationModal.hide()
			} else {
				Toast.error(data.msg);
			}
		});
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
		$("#showOrder_alteration_panel .js-change-order-number").empty().html(orderId);
		var curr_pageNum=$(this).attr('pagenum');
		var param = {
			orderId: orderId
		}
		//发送请求
		doHttp(param, '/adminjson/SAASGetOrderInfo').then(function (data) {
			if (data && data.errorCode == 0 && data.body) {
				removeList();
				var order = data.body;
				$('#showOrder_alteration_panel #hidden_orderType').val("").val(order.orderType);
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
		});
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
			querySearchList(curr_pageNum);
		});
	});
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
						querySearchList(curr_pageNum);
						checkOrderCancel(orderId,curr_pageNum);
					});
				}
			}
		});
	})
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
//	扫描搜索
	$('#queryinput').keyup((evt)=>{
		let org_num=$('#queryinput').val();
		if(org_num.indexOf("ZY")!=-1&&org_num.length==14){
			let arr=org_num.split('');
			arr.splice(0,4);
			$('#queryinput').val(arr.join(''));
		}
		if(org_num.indexOf("yjy://order/detail?orderId=")!=-1){
			let arr=org_num.split('?');
			$('#queryinput').val(arr[1].split('=')[1]);
		}
		if (evt.keyCode == 13) {//回车
			$('#querysearch').click();
		}
	})