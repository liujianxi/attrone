$(document).ready(function() {
	var CONSTANT = {
			//处理请求前缀
			URL_PREFIX: '/adminjson/',
			//获取机构列表数据
			GET_ORDER_INFO_URL: 'SAASGetOrderDetailInfo'
		}
		//实例化请求帮助类
	var httpUtilObj = new HttpUtil();
	var orderData='';
	var orderId = getUrlParam("orderId");
	var orderType='';
	getOrderInfo(orderId);
	var gateList=[];//门禁卡
	function getOrderInfo(orderId) {
		let dtd = $.Deferred(); 
		//请求数据
		httpUtilObj.ajax({
			url: CONSTANT.URL_PREFIX + CONSTANT.GET_ORDER_INFO_URL,
			params: {
				orderId: orderId
			}
		}).then(function(data) { //receipt--incash--finish--service-adjust
			$('#order-mask-bg').css('display','none');
			$('#order-mask').css('display','none');
			orderData=data.body;
			refreshOrderDetailInfo(data.body);
			orderType=data.body.orderType;
			gateList=data.body.orgExtraList||[];//门禁卡
			if((data.body.needRefundExtra||data.body.needRefundPrePay)&&data.body.status==-1&&data.body.orderType == 1){///退款按钮的显示与否
				$('.feeback-order').css('display','block');
			}else{
				$('.feeback-order').css('display','none');
			}
			//待服务---------开始服务
			if(data.body.status===2){
				$('#order-detail .js-form-order-Start').css('display', 'block').attr('orderid',orderId);
			}else{
				$('#order-detail .js-form-order-Start').css('display', 'none');
			}
			if(data.body.orderType == 1) { //机构时
				$('#order-detail .gate-card').css('display', 'block');
				$('#order-detail .gate-infos').css('display', 'block');
			} else {
				$('#order-detail .gate-card').css('display', 'none');
				$('#order-detail .gate-infos').css('display', 'none');
			}
			//门禁卡--线上付款--现金付款
			if(data.body.orgExtraPayType){
				$('#order-detail .gate-card').attr('orgExtraPayType',data.body.orgExtraPayType);
			}
			if(data.body.preRealFee>0&&data.body.status>0 && data.body.orderType == 1){//预交金打印
				$('#order-detail .prefee-print').css('display', 'block');
			}else{
				$('#order-detail .prefee-print').css('display', 'none');
			}
			if(data.body.hasPeirenchuang && data.body.orderType == 1){//陪人床
				$('#order-detail .bed-print').css('display', 'block');
			}else{
				$('#order-detail .bed-print').css('display', 'none');
			}
			if(data.body.status>4 && data.body.orderType == 1){//5----6
				$('#order-detail .service-print').css('display', 'block');
			}else{
				$('#order-detail .service-print').css('display', 'none');
			}
			//取消订单
			if(data.body.status == 0||data.body.status == 1||data.body.status == 2){
				$('.cancel-order').css('display','block');
			}else{
				$('.cancel-order').css('display','none');
			}
			if(data.body.status == 0) {
				$('#order-detail .incash').css('display', 'block');//收款
			} else {
				$('#order-detail .incash').css('display', 'none');
			}
			if(data.body.orderType == 1) {
				$('#order-detail .receipt').css('display', 'block');//档案资料
			} else {
				$('#order-detail .receipt').css('display', 'none');
			}
			if(data.body.status == 3) {
				$('#order-detail .end-order').css('display', 'block');//结束订单
			} else {
				$('#order-detail .end-order').css('display', 'none');
			}
			if(data.body.status == 3&&(parseFloat(data.body.totalFee)-parseFloat(data.body.prePayAmount)>0)) {
				$('#order-detail .continue-order').css('display', 'block');//中间支付
			} else {
				$('#order-detail .continue-order').css('display', 'none');
			}
			if(data.body.status == 4) {//待结算状态
				$('#order-detail .finish').css('display', 'block');//结算
			}else{
				if(data.body.status >4&&data.body.isSettlePay>0){//待评价---已评价
					$('#order-detail .finish').css('display', 'block');//结算
				}else{
					$('#order-detail .finish').css('display', 'none');
				}
			}
			if(data.body.status == 4||data.body.status == 5) {
				$('#order-detail .service-adjust').css('display', 'block').attr('status',data.body.status);//调整附加服务
			}else{
				$('#order-detail .service-adjust').css('display', 'none');
			}
			$('#order-detail .gate-rent .paid-yajin p em').html(data.body.orgExtraFeeStr);
			if(!data.body.needPayExtra) {
				$('#order-detail .gate-rent .yajin').css('display', 'none').addClass('noyajin');
				$('#order-detail .gate-rent .paid-yajin').css('display', 'block');
			} else {
				$('#order-detail .gate-rent .yajin').css('display', 'block').removeClass('noyajin');
				$('#order-detail .gate-rent .paid-yajin').css('display', 'none');
			}
			$('#order-detail .gate-rent .paid-yajin p em').html(data.body.orgExtraFeeStr);
			$('#order-detail .gate-rent .yajin i em').html(data.body.orgExtraFeeStr);
			//orgExtraFeeStr
			//调整预付款
			changePrepay();
			//门禁卡-换卡
			changeCard();
			$('#order-detail .gate-print').off('click').on('click',function(){//-门禁卡
				getPrint(3,$(this).attr('gateId'));
			});
			dtd.resolve(data);
			return dtd.promise();
		});
		return dtd.promise();
	}

	/**
	 * 刷新机构列表
	 * @param {Object} data
	 */
	function refreshOrderDetailInfo(data) {
		var orderInfoHtml = template('OrderInfoTemplate', data);
		$("#orderInfo").empty().html(orderInfoHtml);
		var userInfoHtml = template('UserInfoTemplate', data);
		$("#userInfo").empty().html(userInfoHtml);
		var kinsInfoHtml = template('KinsInfoTemplate', data);
		$("#kinsInfo").empty().html(kinsInfoHtml);
		var processHtml = template("processTemplate", {
			"orderProcessList": data.orderProcessList
		});
		$("#orderProcessContent").empty().html(processHtml);
		var itemHtml = template("itemTemplate", {
			"orderItemList": data.orderItemList
		});
		$("#orderItemContent").empty().html(itemHtml);
		var payHtml = template("payTemplate", {
			"orderPayList": data.orderPayList
		});
		$("#orderPayContent").empty().html(payHtml);
		//orgExtraTemplate
		var orgExtraTemplateHtml = template("orgExtraTemplate", {
			"orgExtraList": data.orgExtraList
		});
		if(data.orgExtraList.length){
			$("#orgExtraInfo").empty().html(orgExtraTemplateHtml);
		}
		$('#order-detail .gate-rent .yajin i em').html(data.orgExtraFeeStr || '0.00');
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
	//开始服务
	$("body").on('click', ".js-form-order-Start", function () {
		var elem = $(this);
		var orderId = elem.attr("orderId");
		var orderstatus = elem.attr("orderstatus");
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
							Toast.success('操作成功！')
						}
						getOrderInfo(orderId);
					});
				}
			}
		});
	});
	//门禁卡
	//清空门禁卡值
	$('#order-detail .clear-gate').off('click').on('click',function(){
		$(this).closest('li').find('input').val("");
	})
	$('.order-manage .gate-card').on('click', function() {
		if(!$('.gate-rent .gate-content ul li.yajin').hasClass('noyajin')){
			$('.gate-rent .gate-content ul li.yajin').css('display','block');
		};
		$('.gate-rent .gate-content .extraNO').css('display','block');//退还方式
		$('.gate-rent .gate-footer ul li:nth-child(2)').off('click').on('click', function() {
			let str = $('.gate-rent .gate-content ul li:nth-child(1) select option:selected').val();
			gateRent(str);
		});
		$('.gate-rent .gate-content ul li:nth-child(1) i').addClass('org_hide');
		$('.gate-rent .gate-content ul li:nth-child(1) select').show();
		$('.gate-rent .gate-content .get-cash').css('display','none');//退还方式
		$('.gate-rent .gate-content li.extra-cash').css('display','none');//退还押金金额
		$('.gate-rent .gate-content ul li:nth-child(1) select').empty();
		let optionNode,orgExtraPayType;
		let showflag=false;
		if(gateList.length){//有过租借记录
			gateList.forEach(function(item,index){
				if(item.status==undefined){
					showflag=true;
				}
			})
		}
		if(showflag){
			//门禁卡支付方式
			orgExtraPayType=$(this).attr('orgExtraPayType');
			optionNode=$('<option orgExtraPayType='+orgExtraPayType+' value="1">门禁卡归还</option><option value="3" selected="selected">门禁卡租借</option>');
		}else{
			optionNode=$('<option value="3" selected="selected">门禁卡租借</option>');
		}
		$('.gate-rent .gate-content ul li:nth-child(1) select').append(optionNode);
		$('.gate-rent .gate-content ul .extraNO input').val('');
		$('.gate-manage-mask').css('display', 'block');
		$('.gate-rent').css('display', 'block');
		document.getElementById("extraNOId").focus();
	});
	$('.gate-manage .gate-footer ul li:nth-child(1)').on('click', function() {
		$('.gate-manage-mask').css('display', 'none');
		$('.gate-manage').css('display', 'none');
	});
	$('.gate-rent .gate-content ul li:nth-child(1) select').on('change', function(){
		if($('.gate-rent .gate-content ul li:nth-child(1) select option:selected').val()!='3'){//归还时
			$('.gate-rent .gate-content ul li.get-cash').css('display','block');
			$('.gate-rent .gate-content ul li.paid-yajin').css('display','none');
			$('.gate-rent .gate-content ul li.yajin').css('display','none');
			let orgExtraPayType=$('.gate-rent .gate-content ul li:nth-child(1) select option:selected').attr('orgExtraPayType');
			if(orgExtraPayType==6){//线上退款
				$('.get-cash select option:nth-child(2)').prop('selected',true);
			}
		}else{
			$('.gate-rent .gate-content ul li.get-cash').css('display','none');
			$('.gate-rent .gate-content ul li.yajin').css('display','block');
		}
		document.getElementById("extraNOId").focus();
		$("#extraNOId").val("");
	});
	$('.gate-rent .gate-content ul .extraNO input').keydown(function (event) {
		if (event.keyCode == 13) {//回车
			$('.gate-rent .gate-content ul .extraNO input').blur();
		}
	});
	//门禁卡损坏登记
	$('#orgExtraInfo').on('click','.damage-check',function(){
		//损坏登记
		$('.gate-rent .gate-content li.extra-cash').css('display','block');//
		$('.gate-rent .gate-content li.extra-cash input').val('');//清空输入退回押金金额
		$('.gate-rent .gate-content li.extraNO').css('display','none');
		$('.gate-rent .gate-content li.get-cash').css('display','block');
		$('.gate-rent .gate-content li.yajin').css('display','none');
		$('.gate-manage-mask').css('display', 'block');
		$('.gate-rent').css('display', 'block');
		$('.gate-rent .gate-content ul li:nth-child(1) i').removeClass('org_hide');
		$('.gate-rent .gate-content ul li:nth-child(1) select').hide();
		damagedCheck($(this).attr('gateNo'),$(this).attr('gatefee'));
	})
	//门禁卡损坏登记
	function damagedCheck(num,fee){
		$('.gate-footer ul li:nth-child(2)').off('click').on('click',function(){
			let httpUtilObj = new HttpUtil();
			let data,pay_type;
			let numflag=false;
			let gate_extraNO=num;//门禁卡号
			let gate_fee=fee.replace(',','');
			pay_type=$('#order-detail .gate-rent .get-cash select option:selected').val()=='1'?5:6;
			data={
				extraNO:gate_extraNO,
				type:3,
				fee:$('.gate-rent .gate-content li.extra-cash input').val(),
				payType:pay_type,
			};
			if(!$('.gate-rent .gate-content li.extra-cash input').val()||parseFloat($('.gate-rent .gate-content li.extra-cash input').val())<0){
				Toast.error('请输入正确的退回押金金额！');
				return false;
			}
			if(parseFloat($('.gate-rent .gate-content li.extra-cash input').val())>gate_fee){
				Toast.error('退回金额不得超过押金金额！');
				return false;
			}
			httpUtilObj.ajax({
				url: '/adminjson/SAASUpdateOrderOrgExtra',
				params: data
			}).then((res)=>{
				Toast.success("门禁卡作废登记成功！");
				getOrderInfo(orderId);
				$('.gate-manage-mask').css('display', 'none');
				$('.gate-rent').css('display', 'none');
			})
		})
	}
	//门禁卡挂失
	$('#orgExtraInfo').on('click','.gateloss',function(){
		if($(this).html()=='挂失'){
			$('.gate-loss-manage').css('display','block');
			$('.gate-manage-mask').css('display', 'block');
			gateLoss($(this).attr('gateId'),$(this).attr('gateNo'));//挂失门禁卡
		}else{//取消挂失
			$('.gate-rent .gate-content ul .extraNO input').val('');
			$('.gate-rent .gate-content ul li:nth-child(1) i').addClass('org_hide');
			$('.gate-rent .gate-content ul li:nth-child(1) select').show();
			$('.gate-manage-mask').css('display', 'block');
			$('.gate-rent').css('display', 'block');
			$('.gate-rent .gate-content ul li:nth-child(1) select').empty();
			let optionNode=$('<option value="5" disabled selected="selected">取消挂失</option>');
			$('.gate-rent .gate-content ul li:nth-child(1) select').append(optionNode);
			cancelLoss($(this).attr('gateId'),$(this).attr('gateNo'))
		}
		
	})
	//取消挂失
	function cancelLoss(str,num){
		$('.gate-rent .gate-content li.extra-cash').css('display','none');//损坏-退回押金
		$('.gate-rent .gate-content ul li:nth-child(2) input').val('');
		$('.gate-rent .gate-content li.extraNO').css('display','block');
		$('.gate-rent .gate-content .get-cash').css('display','block');
		$('#order-detail .gate-rent .yajin').css('display', 'none');
		$('.gate-rent').off('click','.gate-footer ul li:nth-child(2)').on('click','.gate-footer ul li:nth-child(2)',function(){
			console.log('cancelLoss');
			let httpUtilObj = new HttpUtil();//5现金--6 --会员
			let pay_type=$('#order-detail .gate-rent .get-cash select option:selected').val()=='1'?5:6;
			if($('.gate-rent .gate-content ul li.extraNO input').val()!=num){
				Toast.error("输入的门禁卡不符");
				return false;
			}
			let data={
				oeId:str,
				type:1,
				extraNO:num,
				payType:pay_type,
			}
			console.log(data);
			httpUtilObj.ajax({
				url: '/adminjson/SAASUpdateOrderOrgExtra',
				params: data
			}).then((res)=>{
				Toast.success("门禁卡取消挂失成功！");
				getOrderInfo(orderId);
				$('.gate-manage-mask').css('display', 'none');
				$('.gate-rent').css('display', 'none');
			})
		});
	}
	//挂失门禁卡
	function gateLoss(str,num){
		$('.gate-loss-manage').on('click','.gate-footer ul li:nth-child(2)',function(){
			//实例化请求帮助类
			let httpUtilObj = new HttpUtil();
			let data={
				oeId:str,
				type:0,
				extraNO:num
			}
			console.log(data);
			httpUtilObj.ajax({
				url: '/adminjson/SAASUpdateOrderOrgExtra',
				params: data
			}).then((res)=>{
				Toast.success("门禁卡挂失成功！");
				getOrderInfo(orderId);
				$('.gate-manage-mask').css('display', 'none');
				$('.gate-loss-manage').css('display', 'none');
			})
		})
	}
	//获取url中的参数
	function getUrlParam(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
		var r = window.location.search.substr(1).match(reg); //匹配目标参数
		if(r != null) return unescape(r[2]);
		return null; //返回参数值
	}
	let OrderOrgExtra_flag=true;
	function gateRent(str) {
		console.log('gate');
		let gate_extraNO=$('.gate-rent .gate-content ul .extraNO input').val();
		if(gate_extraNO==''){
			Toast.error("请输入门禁卡号");
			return false;
		}
		//5--现金,4--POS
		//3-租借，4-损坏 ，5-取消挂失，1-归还
		if(str == 3) { //门禁卡租借
			//实例化请求帮助类
			let httpUtilObj = new HttpUtil();
			let data,pay_type;
			if($('#order-detail .gate-rent .yajin').hasClass('noyajin')){
				data= {
					orderId: orderId,
					extraNO:gate_extraNO,
				}
			}else{
				pay_type=$('#order-detail .gate-rent .yajin select option:selected').val();
				data= {
					orderId: orderId,
					extraNO:gate_extraNO,
					payType:pay_type
				}
			}
			console.log(data);
//			return false;
			httpUtilObj.ajax({
				url: '/adminjson/SAASAddOrderOrgExtra',
				params: data
			}).then((res)=>{
				Toast.success("门禁卡租借成功！");
				$('.gate-manage-mask').css('display', 'none');
				$('.gate-rent').css('display', 'none');
				getOrderInfo(orderId).then((res)=>{
					$('#order-detail .gate-print').click();//门禁卡打印
				})
			})
		}else if(str=='1'){//退还
			let httpUtilObj = new HttpUtil();
			let data,pay_type;
			let numflag=false;
			pay_type=$('#order-detail .gate-rent .get-cash select option:selected').val()=='1'?5:6;
			data={
				type:2,
				extraNO:gate_extraNO,
				payType:pay_type,
			};
			gateList.forEach(function(item,index){
				if(gate_extraNO==item.extraNO&&item.status!=1){
					numflag=true;
				}
			});
			if(!numflag){
				Toast.error("输入门禁卡号与所借不符");
				return false;
			}
			if(!OrderOrgExtra_flag){
				return false;
			}
			OrderOrgExtra_flag=false;
			httpUtilObj.ajax({
				url: '/adminjson/SAASUpdateOrderOrgExtra',
				params: data
			}).then((res)=>{
				setTimeout(function(){
					OrderOrgExtra_flag=true;
				},500);
				Toast.success("门禁卡退还成功！");
				getOrderInfo(orderId);
				$('.gate-manage-mask').css('display', 'none');
				$('.gate-rent').css('display', 'none');
			})
		}
	}
	$('#order-detail .cancel-order').off('click').on('click',function(){
		bootbox.confirm({
			title: "系统提示",
			message: "是否取消订单，请确认？",
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
						getOrderInfo(orderId);
						checkOrderCancel(orderId);
					});
				}
			}
		});
	})
	function checkOrderCancel(id){//取消订单时，判断是否退款
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
					getOrderInfo(id);
				})
			}else{
				Toast.success("取消订单成功！");
			}
		})
	}
	$('#order-detail .end-order').off('click').on('click',function(){//结束订单
		if(orderData.orderType==1){
			bootbox.confirm({
				title: "结束订单",
				message: "一旦结束订单，将会停止计费，是否结束？",
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
						//先结束订单--在拉起账单调整
						let httpUtilObj = new HttpUtil();
						let params={
							orderId:orderId,
							operationType:2,
						}
						httpUtilObj.ajax({
							url: '/adminjson/SAASSaveOrUpdateOrderNew',
							params: params
						}).then((res)=>{
							Toast.success('订单结束成功！');
							getOrderInfo(orderId);
							top.importOnceJS('js-script-order_detail', "js/app/rp/order_detail.js");
							top.extraService_orderDetail(orderId).then((res)=>{
								getOrderInfo(orderId);
							})
						})
					}
				}
			});
		}else{
			var orderstatus = orderData.status;
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
							orderstatus: 4
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
							getOrderInfo(orderId);
						});
					}
				}
			});
		}
	})
	$('#order-detail .service-adjust').off('click').on('click',function(){//服务调整
		top.importOnceJS('js-script-order_detail', "js/app/rp/order_detail.js");
		//账单明细
		let status=$(this).attr('status');
		top.extraService_feeDetail(orderId,status).then((res)=>{
			getOrderInfo(orderId);
		})
	});
	$('#order-detail .incash').off('click').on('click',function(){//收款--预交金
		top.importOnceJS('js-script-order_detail', "js/app/rp/order_detail.js");
		top.getInCash_orderDetail(orderId,'prepay',orderType).then((res)=>{
			if(res.str!='noprepay'){
				getOrderInfo(orderId).then((res)=>{
					getPrint(4);//打印预交金
				});
			}else{
				getOrderInfo(orderId);
			}
			
		})
	});
	$('#order-detail .finish').off('click').on('click',function(){//结算
		top.importOnceJS('js-script-order_detail', "js/app/rp/order_detail.js");
		top.getInCash_orderDetail(orderId,'finish',orderType).then((inCashData)=>{
			if(inCashData.str!='noprepay'){
				console.log(inCashData.print_data);
				getOrderInfo(orderId).then((res)=>{//打印陪工费
					template.config("escape", false);//识别html标签
					let orderPrintHtml = template('orderPrintTemplate', inCashData.print_data.body);
					$("#printContent").empty().html(orderPrintHtml);
					$("#printContent").jqprint();
				})
			}else{
				getOrderInfo(orderId)
			}
		})
	});
	$('#order-detail .continue-order').off('click').on('click',function(){//续缴费用
		top.importOnceJS('js-script-order_detail', "js/app/rp/order_detail.js");
		top.continueOrder_monthDetail(orderId,orderType).then((res)=>{
			getOrderInfo(orderId);
		})
	});
	$('#order-detail .receipt').off('click').on('click',function(){//档案资料
		top.importOnceJS('js-script-order_detail', "js/app/rp/order_detail.js");
		let data={
			orderId:orderId,
			pic1:orderData.pic1,
			pic2:orderData.pic2,
			signPic:orderData.signPic,
		};
		top.orderPicLook(data).then((res)=>{
			getOrderInfo(orderId);
		})
	});
	// 1-陪工费 2-陪人床 3-门禁卡 4-预交金
	$('#order-detail .prefee-print').off('click').on('click',function(){//支付预交金
		getPrint(4);
	});
	$('#order-detail .service-print').off('click').on('click',function(){//-陪工费
		getPrint(1);
	});
	$('#order-detail .bed-print').off('click').on('click',function(){//-陪人床
		getPrint(2);
	});
	let print_flag=true;
	function getPrint(type,str){//直接打印过程
		console.log(print_flag);
		if(!print_flag){
			return false;
		}
		print_flag=false;
		let httpUtilObj = new HttpUtil();
		let data;
		data={
			orderId:orderId,
			printType:type,
			width:'80',
		};
		if(type==3){//门禁卡打印多一个字段
			data={
				orderId:orderId,
				printType:type,
				width:'80',
				oeId:str,
			}
		}
		httpUtilObj.ajax({
			url: '/adminjson/SAASPrint',
			params: data
		}).then((res)=>{
			template.config("escape", false);//识别html标签
			var orderPrintHtml = template('orderPrintTemplate', res.body);
			$("#printContent").empty().html(orderPrintHtml);
			$("#printContent").jqprint();
			setTimeout(function(){
				print_flag=true;
			},500);
		},((res)=>{
			setTimeout(function(){
				print_flag=true;
			},500);
		}));
	};
	function changePrepay(){
		//修改预付款
		$('#order-detail .change-prepay').off('click').on('click',function(){
			$('.changebox').css('display','block');
			$('.gate-manage-mask').css('display', 'block');
		});
		$('.changebox').off('click','.gate-footer ul li:nth-child(2)').on('click','.gate-footer ul li:nth-child(2)',function(){
			let httpUtilObj = new HttpUtil();
			let data={
				orderId:orderId,
			}
			httpUtilObj.ajax({
				url: '/adminjson/SAASClearOrderPrePayAmount',
				params: data
			}).then((res)=>{
				Toast.success("操作成功！");
				$('.changebox').css('display','none');
				$('.gate-manage-mask').css('display', 'none');
				getOrderInfo(orderId);
			})
		})
		//充值
		$('#order-detail .addmoney').off('click').on('click',function(){
			top.importOnceJS('js-script-order_detail', "js/app/rp/order_detail.js");
			top.orderAddmoney(orderId).then((res)=>{
				getOrderInfo(orderId);
			})
		});
		//取消订单后---退款
		$('#order-detail .feeback-order').off('click').on('click',function(){//退款
			top.importOnceJS('js-script-order_detail', "js/app/rp/order_detail.js");
			top.orderFeeBack(orderId).then((res)=>{
				getOrderInfo(res);
			})
		});
	}
	//门禁卡--换卡
	function changeCard(){
		$('.change-check').off('click').on('click',function(){
			$('.gate-manage-mask').css('display', 'block');
			$('.gate-changeCard').css('display','block');
			$('.changeCard-input').val("").focus();
			let oeId=$(this).attr('gateid');
			let extra_num=$(this).attr('gateno');
			$('.gate-changeCard').off('click','.gate-footer ul li:nth-child(2)').on('click','.gate-footer ul li:nth-child(2)',function(){
				let curr_num=$('.changeCard-input').val();
				let data={
					oeId:oeId,
					type:4,// 0-挂失 1-解挂 2-退还 3-作废 4-换卡
					extraNO:extra_num,
					extraNOUpdate:curr_num,
				}
				console.log(data);
				if(!curr_num){
					Toast.error("请输入门禁卡号");
					return false;
				}
				httpUtilObj.ajax({
					url: '/adminjson/SAASUpdateOrderOrgExtra',
					params: data
				}).then((res)=>{
					getOrderInfo(orderId);
					$('.gate-manage-mask').css('display', 'none');
					$('.gate-changeCard').css('display', 'none');
				})
			})
		})
	}
})