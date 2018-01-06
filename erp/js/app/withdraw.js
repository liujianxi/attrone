/**
 * Withdraw管理模块
 */
//Withdraw管理模块的数据对象
var WithdrawModule = {
	withdrawList : [],	//Withdraw数据列表
	//分页参数
	paginationParam : {
		pageSize : 10,	//每页展示的数据条目
		isInit : false,	//是否已初始化
		pageNo : 1, //当前页，默认为1
		rpPageNo : 1	// 侧滑栏当前页，默认为1
	}
};

$(document).ready(function(){
	
	/**
	 * 私有常量集合
	 */
	var CONSTANT = {
		//处理请求前缀
		URL_PREFIX : '/adminjson/',
		//获取Withdraw列表数据
		GET_WITHDRAW_LISG_URL : 'SAASGetWithdrawList',
		//保存或新增Withdraw
		UPDATE_WITHDRAW_URL : 'SAASUpdateWithdraw',
		// 获取用户支付记录
		GET_USER_ORDERPAY : 'SAASGetUserOrderPay',
		GET_WITHDRAW : 'SAASWithdraw',
	};
	
	//将加载数据的方法绑定到公共对象
	WithdrawModule.loadWithdrawList = loadWithdrawList;
	WithdrawModule.loadUserOrderPay = loadUserOrderPay;
	WithdrawModule.withdrawed = withdrawed;
	//实例化请求帮助类
	var httpUtilObj = new HttpUtil();
	//默认载入数据
	
	var orderPayModal = new ModalPanel("#orderPay_panel");
	
	/**
	 * 初始化分页控件
	 * @param {Object} count
	 */
	function initPagination(nowPage,count){
//		console.info('nowPage:'+nowPage+',count:'+count);
		//如果记录条目为0则隐藏分页控件
		if(count <=10){
			$("#pagination").hide();
		}else{
			$("#pagination").show();
		}
		//如果已初始化控件，则不再		
		$("#pagination").pagination(count, {
            'items_per_page'      : WithdrawModule.paginationParam.pageSize,
            'num_display_entries' : 5,
            'num_edge_entries'    : 5,
            'prev_text'           : "上一页",
            'next_text'           : "下一页",
            'callback'            : function(page_index){
            	
            	page_index = page_index + 1;
            	//只有在翻页的时候才加载，默认查询和按条件查询page_index不会改变，则不会重新加载
            	if(WithdrawModule.paginationParam.pageNo != page_index){
            		//重新赋值当前页数
            		WithdrawModule.paginationParam.pageNo = page_index;
            		//重新载入数据
            		loadWithdrawList(false);
            	}
            },
            'current_page'        : (nowPage<=1)?0:(nowPage-1)
        });
	}
	
	/**
	 * Withdraw数据加载
	 * @param {Object} isAll (是否全部加载，如果是true才初始化分页控件，分页加载数据就是false的情况)
	 */
	function loadWithdrawList(isAll){
		
		//收集查询控件的参数值
		WithdrawModule.searchParam = {
			status : $("#status").val(),
			key : $('#winthdraw-input').val(),
			withdrawStartTime : $('#winthdraw-apply-regBeginTime').val(),
			withdrawEndTime : $('#winthdraw-apply-regEndTime').val(),
			disposeStartTime : $('#winthdraw-dispose-regBeginTime').val(),
			disposeEndTime : $('#winthdraw-dispose-regEndTime').val(),
			pageNo : WithdrawModule.paginationParam.pageNo,	//请求页
			pageSize : WithdrawModule.paginationParam.pageSize	//每页记录数
		}
		//返回请求的promise对象
		httpUtilObj.ajax({
			url : CONSTANT.URL_PREFIX + CONSTANT.GET_WITHDRAW_LISG_URL,
			params : WithdrawModule.searchParam
		}).then(function(data){
			//刷新列表
			refreshWithdrawList(data.body);
			console.log(isAll);
			//初始化分页控件
			if(isAll){
				initPagination(0,data.body.count);
			}
		});
	}
	
	/**
	 * 加载用户支付记录
	 * @param {Object} isAll (是否全部加载，如果是true才初始化分页控件，分页加载数据就是false的情况)
	 */
	function loadUserOrderPay(userId, id, feeStr){
		
		//收集查询控件的参数值
		WithdrawModule.searchParam = {
				pageNo : 1,	//请求页
				pageSize : 10,	//每页记录数
				userId : userId	//用户id
		}
		$("#recordId").val(id);
		$("#fee").html(feeStr);
		//返回请求的promise对象
		httpUtilObj.ajax({
			url : CONSTANT.URL_PREFIX + CONSTANT.GET_USER_ORDERPAY,
			params : WithdrawModule.searchParam
		}).then(function(data){
			refreshOrderPayList(data.body);
			//初始化分页控件
			if(true){
				initRpPagination(0,data.body.count, data.body, userId, id, feeStr);
			}
			orderPayModal.show();
		});
	}
	
	
	/**
	 * 初始化分页控件
	 * @param {Object} count
	 */
	function initRpPagination(nowPage,count, data, userId, id, feeStr){
//		console.info('nowPage:'+nowPage+',count:'+count);
		//如果记录条目为0则隐藏分页控件
		console.log(count);
		if(count <= 10){
			$("#paginationrp").hide();
		}else{
			$("#paginationrp").show();
		}
		//如果已初始化控件，则不再		
		$("#paginationrp").pagination(count, {
            'items_per_page'      : WithdrawModule.paginationParam.pageSize,
            'num_display_entries' : 5,
            'num_edge_entries'    : 5,
            'prev_text'           : "上一页",
            'next_text'           : "下一页",
            'callback'            : function(page_index){
            	console.log(WithdrawModule.paginationParam.rpPageNo + " --------- "+ page_index);
            	
            	page_index = page_index + 1;
            	//只有在翻页的时候才加载，默认查询和按条件查询page_index不会改变，则不会重新加载
            	if(WithdrawModule.paginationParam.rpPageNo != page_index){
            		//重新赋值当前页数
            		WithdrawModule.paginationParam.rpPageNo = page_index;
            		//重新载入数据
            		//收集查询控件的参数值
            		WithdrawModule.searchParam = {
            				pageNo : WithdrawModule.paginationParam.rpPageNo,	//请求页
            				pageSize : 10,	//每页记录数
            				userId : userId	//用户id
            		}
            		httpUtilObj.ajax({
            			url : CONSTANT.URL_PREFIX + CONSTANT.GET_USER_ORDERPAY,
            			params : WithdrawModule.searchParam
            		}).then(function(data){
            			//1234
            			refreshOrderPayList(data.body);
            			//初始化分页控件
            		});
            	}
            },
            'current_page'        : (nowPage<=1)?0:(nowPage-1)
        });
	}
	
	
	/**
	 * 刷新Withdraw列表
	 * @param {Object} data
	 */
	function refreshWithdrawList(data){
		var withdrawListHtml = template('withdrawListTemplate',data);
		$("#withdrawListContent").empty().html(withdrawListHtml);
	}
	/**
	 * 刷新支付列表
	 * @param {Object} data
	 */
	function refreshOrderPayList(data){
		var withdrawListHtml = template('orderPayListTemplate',data);
		$("#userOrderPay").empty().html(withdrawListHtml);
		$('.with-input').off('click').on('click',function(){
			if($(this).find('input').prop('checked')){
				$(this).find('input').prop('checked',false);
			}else{
				$(this).find('input').prop('checked',true);
			}
		})
		$('.with-input input').off('click').on('click',function(){
			if($(this).prop('checked')){
				$(this).prop('checked',false);
			}else{
				$(this).prop('checked',true);
			}
		})
	}
	
	/**
	 * 确认提现
	 */
	function withdrawed() {
		var payIds =[];
		$('input[name="payId"]:checked').each(function(){
			var item = {};
			item.payId = $(this).val();
			item.refundFee = $(this).parent().next().children().val();
			payIds.push(item);
		});
		WithdrawModule.searchParam = {
			orderPayList : payIds,
			recordId : $("#recordId").val()
		}
		//返回请求的promise对象
		httpUtilObj.ajax({
			url : CONSTANT.URL_PREFIX + CONSTANT.GET_WITHDRAW,
			params : WithdrawModule.searchParam
		}).then(function(data){
			orderPayModal.hide();
			loadWithdrawList(true);
		});
	}
	
	
	var d1, d2;
	function dateString(dt){
	    var dy = dt.getFullYear();
	    var dm = dt.getMonth()+1;
	    var dd = dt.getDate();
	    var dh = dt.getHours();
	   return dy+'-'+(dm<10?'0'+dm:dm)+'-'+dd+' '+(dh<10?'0'+dh:dh)+':00';
	}
	var dt = new Date();
	dt.setDate(dt.getDate());
	d2 = dateString(dt);
	dt.setDate(dt.getDate()-30);
	d1 = dateString(dt);
//	$("#winthdraw-apply-regBeginTime").val(d1);
//	$("#winthdraw-apply-regEndTime").val(d2);
    $('input[name="daterange-winthdraw-apply"]').daterangepicker({
		"autoApply": true,
		'timePicker': true,
    	'timePickerIncrement': 60,
    	'timePicker24Hour': true,
		"locale": {
			"format": "YYYY-MM-DD HH:00",
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
		console.log(start);
		$("#winthdraw-apply-regBeginTime").val(start.format('YYYY-MM-DD HH:00'));
		$("#winthdraw-apply-regEndTime").val(end.format('YYYY-MM-DD HH:00'));
	});
//    $("#winthdraw-dispose-regBeginTime").val(d1);
//	$("#winthdraw-dispose-regEndTime").val(d2);
	//daterange-winthdraw-dispose
	$('input[name="daterange-winthdraw-dispose"]').daterangepicker({
		"autoApply": true,
		'timePicker': true,
    	'timePickerIncrement': 60,
    	'timePicker24Hour': true,
		"locale": {
			"format": "YYYY-MM-DD HH:00",
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
		console.log(start);
		$("#winthdraw-dispose-regBeginTime").val(start.format('YYYY-MM-DD HH:00'));
		$("#winthdraw-dispose-regEndTime").val(end.format('YYYY-MM-DD HH:00'));
	});
	loadWithdrawList(true,1);
});
