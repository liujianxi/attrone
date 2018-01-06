/**
 * 机构管理模块
 */
//机构管理模块的数据对象
var priceModule = {
	provinceList: [], //搜索省份
	cityList: [], //搜索城市
	//分页参数
	paginationParam: {
		pageSize: 10, //每页展示的数据条目
		isInit: false, //是否已初始化
	},
	addType : '',
	priceId : 0
};

$(document).ready(function() {
	
	/**
	 * 私有常量集合
	 */
	var CONSTANT = {
		//处理请求前缀
		URL_PREFIX: '/adminjson/',
		//获取机构列表数据
		GET_ORG_LISG_URL: 'SAASGetCompanyOrgList',
		GET_BRANCH_LISG_URL: 'SAASGetCompanyOrgList',
		GET_COMPANY_PREPAY_LIST : 'SAASGetCompanyPrepayList',
		UPDATE_COMPANY_PREPAY_LIST : 'SAASSaveOrUpdateCompanyPrepay',
		UPDATE_BATCH_COMPANY_PREPAY_LIST : 'SAASUpdateBatchCompanyPrepay',
		
		//获取机构
		GET_ORG: 'SAASGetOrg',
		//省市县级联数据
		GET_CITY_JSON: '../js/app/common/city.json',
		GET_HGLIST: 'SAASGetHGList',
		GET_PRICE_LIST_URL: 'SAASGetPriceList',
		DELETE_PRICE_URL: 'SAASDeletePrice',
		SAVE_UPDATE_PRICE_URL : 'SAASSaveOrUpdatePrice',
		GET_PRICE_URL : 'SAASGetPrice',
		DETAIL_TYPE_MAP: [
				{ name: '居家照顾', id: 101 },
				{ name: '家庭护士', id: 102 }, 
				{ name: '康复护理', id: 103 },
				{ name: '中医理疗', id: 104 },
				{ name: '金牌月嫂', id: 105 }, 
				{ name: '就医陪护', id: 106 }, 
				{ name: '心理慰藉', id: 107 }, 
				{ name: '产后恢复', id: 108 },
				{ name: '育婴幼教', id: 109 }, 
				{ name: '临终关怀', id: 110 }, 
				{ name: '上门附加服务', id: 199 },
				{ name: '长护险服务', id: 200 }
		],
		SERVICE_UNIT_MAP : [
			{name: '次', id: 1},
			{name: '小时', id: 2},
			{name: '天', id: 3},
			{name: '月', id: 4}
		]
	}
	priceModule.loadPriceList = loadPriceList;
	var orgPriceDealModal = new ModalPanel("#orgPriceDeal_panel");
	var priceListModal = new ModalPanel("#showPriceList_panel");
	var addPriceItemModal = new ModalPanel("#addPriceItem_panel");
	var showPriceItemModal = new ModalPanel("#showPriceItem_panel");
	var showPrepayListModal = new ModalPanel("#showPrepayList_panel");
	//实例化请求帮助类
	var httpUtilObj = new HttpUtil();
	
	
	var detailTypeHtml = template('priceTypeSelTemplate',{list:CONSTANT.DETAIL_TYPE_MAP});
	$("#select_priceStatus").empty().append(detailTypeHtml);
	
	template.helper('priceFilter',function(id,dataSource){
		if(!isNaN(id) && (id>=0)){
			var name = '未知';
			$(eval("CONSTANT." + dataSource)).each(function(i, e){
				if(e.id == id){
					name = e.name;
					return false;
				}
			});
			return name;
		}else{
			return '未知';
		}
	});
	// prepayHrefShow
	// prepayHrefEdit
	// typeNameTD
	// prepayAmountTD
	priceModule.editPrepayItem = function(item) {
		$(item).siblings(".prepayHrefEdit").removeClass('hidden');
		$(item).addClass('hidden');
		$(item).parent().addClass('opt');
		$(item).parent().siblings(".prepayAmountTD").children("input").prop("disabled", false);
		
		batchUpdateButton();
		
	}
	
	priceModule.cancelEditPrepay = function(item) {
		$(item).siblings(".prepayHrefShow").removeClass('hidden');
		$(item).siblings(".prepayHrefEdit").addClass('hidden');
		$(item).addClass('hidden');
		$(item).parent().removeClass('opt');
		$(item).parent().siblings(".prepayAmountTD").children("input").prop("disabled", "disabled");
		
		batchUpdateButton();
	}
	
	priceModule.savePrepayItem = function(item) {
		var params = {
			serviceType : $(item).parent().siblings(".typeNameTD").children(".serviceTypeInput").val(),
			prepayAmount : $(item).parent().siblings(".prepayAmountTD").children("input").val()
		}
		httpUtilObj.ajax({
			url: CONSTANT.URL_PREFIX + CONSTANT.UPDATE_COMPANY_PREPAY_LIST,
			params: params
		}).then(function(result) {
			if(result.errorCode == 0) {
				priceModule.cancelEditPrepay();
				loadPrepayList();
			}
		});
	}
	
	
	priceModule.batchUpdatePriceItem = function() {
		var tdOpt = $(".opt"); //td
		
		var paramsArray = [];
		$.each(tdOpt, function(i, n){ 
			var param = {
				serviceType : $(n).closest('tr').find(".typeNameTD .serviceTypeInput").val(),
				prepayAmount : $(n).closest('tr').find(".prepayAmountTD input").val()
			}
			paramsArray.push(param);
		});
		var params = {
				array : paramsArray
		};
		
		httpUtilObj.ajax({
			url: CONSTANT.URL_PREFIX + CONSTANT.UPDATE_BATCH_COMPANY_PREPAY_LIST,
			params: params
		}).then(function(result) {
			if(result.errorCode == 0) {
				priceModule.cancelEditPrepay();
				loadPrepayList();
				$("td.opt").removeClass('opt');
				batchUpdateButton();
				
			}
		});
	}
	
	priceModule.showPrepayList = function () {
		showPrepayListModal.show();
		loadPrepayList();
	}
	
	function loadPrepayList() {
		httpUtilObj.ajax({
			url: CONSTANT.URL_PREFIX + CONSTANT.GET_COMPANY_PREPAY_LIST,
			params: {}
		}).then(function(result) {
			if(result.errorCode == 0) {
				var prepayListHtml = template('prepayListTemplate', result.body);
				$("#prepayListContent").empty().append(prepayListHtml);
			}
		});
	}
	
	
	function editDomChange(id) {
		$("#toEditBtn").addClass("hidden");
		$("#updatePriceBtn").removeClass("hidden");
		$("#cancelEditBtn").removeClass("hidden");
		$("#showPriceItem_serviceItem").prop("disabled", false);		
		$("#radioIsrequiredDiv input").prop("disabled", false);		
		$("#show_lti_div input").prop("disabled", false);		
		$("#showScope input").prop("disabled", false);		
//		$("#showPriceItem_parentTypeSel").prop("disabled", false);		
		$("#showPriceItem_serviceType").prop("disabled", true);		
		$("#radioDiv input").prop("disabled", true);		
		$("#showPriceItem_description").prop("disabled", false);		
		$("#showPriceItem_price").prop("disabled", false);	
		$("#showPriceItem_hgRebatePricePrice").prop("disabled", false);
		$("#showPriceItem_hgKinsRebatePricePrice").prop("disabled", false);
		$("#showPriceItem_defaultStatus_0").prop("disabled", false);
		$("#showPriceItem_defaultStatus_1").prop("disabled", false);
		$("#showPriceItem_consent").prop("disabled", false);
	}
	function cancelDomChange() {
		$("#toEditBtn").removeClass("hidden");
		$("#updatePriceBtn").addClass("hidden");
		$("#cancelEditBtn").addClass("hidden");
		$("#show_lti_div input").prop("disabled", true);	
		$("#showScope input").prop("disabled", true);		
		$("#radioIsrequiredDiv input").prop("disabled", true);	
		$("#showPriceItem_serviceItem").prop("disabled", true);		
//		$("#showPriceItem_parentTypeSel").prop("disabled", true);		
		$("#showPriceItem_serviceType").prop("disabled", true);		
		$("#radioDiv input").prop("disabled", true);		
		$("#showPriceItem_description").prop("disabled", true);		
		$("#showPriceItem_price").prop("disabled", true);	
		$("#showPriceItem_hgRebatePricePrice").prop("disabled", true);
		$("#showPriceItem_hgKinsRebatePricePrice").prop("disabled", true);
		$("#showPriceItem_defaultStatus_0").prop("disabled", true);
		$("#showPriceItem_defaultStatus_1").prop("disabled", true);
		$("#showPriceItem_consent").prop("disabled", true);
	}
	priceModule.cancelEdit = function() {
		cancelDomChange();
	}
	
	priceModule.updatePriceItem = function() {
		var param = {
			priceId : priceModule.priceId,
			serviceItem : $("#showPriceItem_serviceItem").val(),
			serviceType: $("#showPriceItem_serviceType").val(),
			serviceUnit: $("input[name=showPriceItem_serviceUnit]:checked").val(),
			longTermInsurance: $("input[name=showPriceItem_lti]:checked").val(),
			showScope: $("input[name=showPriceItem_showScope]:checked").val(),
			price : $("#showPriceItem_price").val().replace(",",""),
			description : $("#showPriceItem_description").val(),
			required : $("input[name=updateisrequired_lti]:checked").val(),
			hgRebatePrice : $("#showPriceItem_hgRebatePricePrice").val().replace(",",""),
			hgKinsRebatePrice : $("#showPriceItem_hgKinsRebatePricePrice").val().replace(",",""),
			consentText : $("#showPriceItem_consent").val(),
			defaultStatus: $("input[name=showPriceItem_defaultStatus]:checked").val()
		};
		//发送请求
		httpUtilObj.ajax({
			url: CONSTANT.URL_PREFIX + CONSTANT.SAVE_UPDATE_PRICE_URL,
			params: param
		}).then(function(result) {
			if(result.errorCode == 0) {
				$.toast({
					heading: '系统消息',
					text: '操作成功！',
					position: 'top-right',
					icon: 'success',
					loaderBg: '#9EC600',
					stack: false
				});
				if(priceModule.addType == 'price'){
					loadPriceList(priceModule.priceId);
				}else{
					loadPriceList();
				}
				showPriceItemModal.hide();
				loadPriceList(true,0);
			}
		});
	}
	
	priceModule.editDesc = function(priceId) {
		priceModule.priceId = priceId;
		var param = {
			priceId : priceId
		}
		doHttp(param, '/adminjson/SAASGetPrice').then(function(result){
			var desc = result.body.price.description;
			if(desc == undefined) 
				desc = "";
			top.importOnceJS('js-script-richtext',"js/app/rp/richtext.js");
			top.G_Fun_showRichTextPanel(desc).then(function(data){
				result = result.body.price;
				result.priceId = priceModule.priceId;
				result.updateDesc = 'yes';
				result.description = data;
				doHttp(result, '/adminjson/SAASSaveOrUpdatePrice').then(function(resultt){
						Toast.success('操作成功!');
						loadPriceList(false);
				});
			});
		});
	}
	
	priceModule.editPriceItem = function(){
		editDomChange();
	}
	
	priceModule.savePriceItem = function() {
		var param = {
			serviceItem : $("#addPriceItem_serviceItem").val(),
			serviceType: $("#addPriceItem_serviceType").val(),
			serviceUnit: $("input[name=addPriceItem_serviceUnit]:checked").val(),
			showScope: $("input[name=addPriceItem_showScope]:checked").val(),
			price : $("#addPriceItem_price").val().replace(",",""),
			required : $("input[name=addisrequired_lti]:checked").val(),
			description : $("#addPriceItem_description").val(),
			longTermInsurance : $("input[name=addPriceItem_lti]:checked").val(),
			hgRebatePrice : $("#addPriceItem_hgRebatePricePrice").val().replace(",",""),
			hgKinsRebatePrice : $("#addPriceItem_hgKinsRebatePricePrice").val().replace(",",""),
			consentText : $("#addPriceItem_consent").val(),
			defaultStatus: $("input[name=addPriceItem_defaultStatus]:checked").val()
		};
		//发送请求
		httpUtilObj.ajax({
			url: CONSTANT.URL_PREFIX + CONSTANT.SAVE_UPDATE_PRICE_URL,
			params: param
		}).then(function(result) {
			if(result.errorCode == 0) {
				$.toast({
					heading: '系统消息',
					text: '操作成功！',
					position: 'top-right',
					icon: 'success',
					loaderBg: '#9EC600',
					stack: false
				});
				addPriceItemModal.hide();
				loadPriceList(true,0);
			}
		});
	}
	priceModule.viewPrice = function(id, price_id) {
		if(priceModule.addType == 'company'){
			$("#showPriceItem_parentTypeSel option[value=2]").prop("selected", true);
		}
		cancelDomChange();
		showPriceItemModal.show();
		priceModule.priceId = id;
		$("#showPriceItem_parentTypeSel option").removeAttr("selected");
		$("#showPriceItem_serviceType option").removeAttr("selected");
		$("#radioDiv input").removeAttr("checked");
		$("#radioIsrequiredDiv input").removeAttr("checked");
		var param = {
			priceId : id,
		}
		//发送请求
		httpUtilObj.ajax({
			url: CONSTANT.URL_PREFIX + CONSTANT.GET_PRICE_URL,
			params: param
		}).then(function(result) {
			if(result.errorCode == 0) {
				var item = result.body.price;
				$("#showPriceItem_serviceItem").val(item.serviceItem);
				if(item.serviceType > 100)
					$("#showPriceItem_parentTypeSel option[value=2]").prop("selected",true);
				else 
					$("#showPriceItem_parentTypeSel option[value=1]").prop("selected",true);
				
				if(item.serviceType == 199){
					$("#radio_longTermInsurance_div").show(); 
					$("#show_hgRebatePricePrice").hide();
					$("#show_hgKinsRebatePricePrice").hide();
				}else if(item.serviceType == 200){
					$("#radio_isrequired_div").show();
					$("#radio_longTermInsurance_div").show(); 
					$("#show_hgRebatePricePrice").show();
					$("#show_hgKinsRebatePricePrice").show();
				}else {
					$("#radio_longTermInsurance_div").hide(); 
					$("#radio_isrequired_div").hide(); 
					$("#show_hgRebatePricePrice").show();
					$("#show_hgKinsRebatePricePrice").show();
				}
				priceModule.typeSelChange('showPriceItem_');
				$("#showPriceItem_serviceType option[value="+item.serviceType+"]").prop("selected",true);
				$("#radioDiv input[value="+item.serviceUnit+"]").prop("checked",true);
				$("#showScope input[value="+item.showScope+"]").prop("checked",true);
				$("#show_lti_div input[value="+item.longTermInsurance+"]").prop("checked",true);
				var isrequired = item.isrequired  == 0 ? 1 : item.isrequired; 
				$("#radioIsrequiredDiv input[value="+isrequired+"]").prop("checked",true);
				$("#showPriceItem_description").val(item.description);
				$("#showPriceItem_price").val(item.price);
				$("#showPriceItem_hgRebatePricePrice").val(item.hgRebatePrice);
				$("#showPriceItem_hgKinsRebatePricePrice").val(item.hgKinsRebatePrice);
				$("#showPriceItem_consent").val(item.consentText);
				$("#show-defaultStatus input[value="+ item.defaultStatus +"]").prop("checked",true);
			}
		});
	}
	
	priceModule.typeSelChange = function(prefix) {
		var detailTypeHtml = template('childTypeSelTemplate',{list:CONSTANT.DETAIL_TYPE_MAP});
		$("#"+prefix+"serviceType").empty().append(detailTypeHtml);
	}
	
	
	
	priceModule.delPrice = function(id, priceId) {
		bootbox.confirm({
			title: "系统提示",
			message: "删除后将不可恢复，请确认？",
			buttons: {
				confirm: {
					label: '确定',
					className: 'btn-success'
				},
				cancel: {
					label: '取消',
					className: 'btn-danger'
				}
			},
			callback: function(isConfirm) {
				if(isConfirm) {
					var param = {
						priceId: id,
					}
					//发送请求
					httpUtilObj.ajax({
						url: CONSTANT.URL_PREFIX + CONSTANT.DELETE_PRICE_URL,
						params: param
					}).then(function(result) {
						if(result.errorCode == 0) {
							$.toast({
								heading: '系统消息',
								text: '操作成功！',
								position: 'top-right',
								icon: 'success',
								loaderBg: '#9EC600',
								stack: false
							});
						}
						loadPriceList();
					});
				}
			}
		});
	}

	priceModule.addPriceItem = function() {
		$("#addPriceItem_serviceItem").val('');
		$("#addPriceItem_price").val('');
		$("#addPriceItem_description").val('');
		$("#show_lti_div input[value=2]").prop('checked', true);
		$("#add_showScope input[value=0]").prop('checked', true);
		$("#addPriceItem_hgRebatePricePrice").val('');
		$("#addPriceItem_hgKinsRebatePricePrice").val('');
		$("#addPriceItem_consent").val('');
		addPriceItemModal.show();
		priceModule.typeSelChange('addPriceItem_');
		updatechx();
	}

	priceModule.showEditPrice = function(id, desc) {
		var isFromOrg = (id == undefined && desc == undefined);
		var isFromCompany = (desc == undefined);
		priceModule.addType = 'company';
		priceModule.desc = "居家定价";
		$("#descHFour").html(priceModule.desc);
		priceListModal.show();
		loadPriceList('company');
	}

	function loadPriceList(id) {
		//发送请求
		httpUtilObj.ajax({
			url: CONSTANT.URL_PREFIX + CONSTANT.GET_PRICE_LIST_URL,
			params: {}
		}).then(function(result) {
			if(result.errorCode == 0) {
				var priceListHtml = template('priceListTemplate', result.body);
				$("#priceListContent").empty().append(priceListHtml);
			}
		});
	}

	function getPriceListData(pageNo) {
		
		var deferre = $.Deferred();
		var servicesType = $("#select_priceStatus").val();
		var promise = deferre.promise();
		//收集查询控件的参数值
		priceModule.searchParam = {
			pageNo: pageNo, //请求页
			pageSize: priceModule.paginationParam.pageSize, //每页记录数
			servicesType : servicesType
		}
		//返回请求的promise对象
		return httpUtilObj.ajax({
			url: CONSTANT.URL_PREFIX + CONSTANT.GET_PRICE_LIST_URL,
			params: priceModule.searchParam
		});
	}
	/**
	 * 初始化分页控件
	 * @param {Object} count
	 */
	function initPagination(nowPage, count) {
		//		console.info('nowPage:'+nowPage+',count:'+count);
		//如果记录条目为0则隐藏分页控件
		if(count == 0) {
			$("#pagination").hide();
		} else {
			$("#pagination").show();
		}
		//如果已初始化控件，则不再		
		//		if(!priceModule.paginationParam.isInit){
		$("#pagination").pagination(count, {
			'items_per_page': priceModule.paginationParam.pageSize,
			'num_display_entries': 5,
			'num_edge_entries': 5,
			'prev_text': "上一页",
			'next_text': "下一页",
			'callback': function(page_index) {
				//如果已加载过则不加载
				if(!priceModule.paginationParam.isInit) {
					priceModule.paginationParam.isInit = true;
				} else {
					loadPriceList(false, page_index + 1);
				}
				//当前页数
				priceModule.paginationParam.pageNo = page_index + 1;
			},
			'current_page': (nowPage <= 1) ? 0 : (nowPage - 1)
		});
		//		}
	}

	/**
	 * 机构数据加载
	 * @param {Object} isAll (是否全部加载，如果是true才初始化分页控件，分页加载数据就是false的情况)
	 */
	function loadPriceList(isAll, pageNo) {
		//请求数据
		getPriceListData(pageNo).then(function(data) {
			//刷新列表
			refreshPriceList(data.body);
			//初始化分页控件
			if(isAll) {
				initPagination(0, data.body.count);
			}
		});
	}

	/**
	 * 刷新机构列表
	 * @param {Object} data
	 */
	function refreshPriceList(data) {
		var priceListHtml = template('priceListTemplate', data);
		$("#priceListContent").empty().html(priceListHtml);
	}
	$("#addPriceItem_panel #addPriceItem_serviceType").on("change",function(){
		updatechx();
	});
	
	
	function updatechx(){
		var sss = $("#addPriceItem_serviceType");
		if($(sss).val() == 199){
			$("#add_radio_longTermInsurance_div").show();
			$("#add_radio_isrequired_div").hide();
			$("#addPriceItem_lti_1").attr("disabled", false);
			$("#addPriceItem_lti_0").prop('checked', false);
			$("#addPriceItem_lti_1").prop('checked', true);
			$("#addisrequired_lti_0").prop('checked', true);
			$("#addisrequired_lti_1").prop('checked', false);
			$("#addPriceItem_serviceUnit_2").attr("disabled", true);
			$("#addPriceItem_serviceUnit_3").attr("disabled", true);
			$("#addPriceItem_serviceUnit_0").prop('checked', true);
			$("#hgRebatePricePrice").hide();
			$("#hgKinsRebatePricePrice").hide();
		}else if($(sss).val() == 200){
			$("#add_radio_isrequired_div").show();
			$("#add_radio_longTermInsurance_div").show(); 
			$("#addPriceItem_lti_1").attr("disabled", true);
			$("#addPriceItem_lti_0").prop('checked', true);
			$("#addPriceItem_lti_1").prop('checked', false);
			$("#addPriceItem_serviceUnit_2").attr("disabled", false);
			$("#addPriceItem_serviceUnit_3").attr("disabled", false);
			$("#hgRebatePricePrice").show();
			$("#hgKinsRebatePricePrice").show();
		}else if($(sss).val() == 99){
			$("#addPriceItem_serviceUnit_2").attr("disabled", true);
			$("#addPriceItem_serviceUnit_3").attr("disabled", true);
			$("#addPriceItem_serviceUnit_0").prop('checked', true);
			("#hgRebatePricePrice").hide();
			$("#hgKinsRebatePricePrice").hide();
		}else {
			$("#add_radio_longTermInsurance_div").hide(); 
			$("#add_radio_isrequired_div").hide(); 
			$("#addPriceItem_lti_0").prop('checked', false);
			$("#addPriceItem_lti_1").prop('checked', true);
			$("#addisrequired_lti_0").prop('checked', true);
			$("#addisrequired_lti_1").prop('checked', false);
			$("#addPriceItem_serviceUnit_2").attr("disabled", false);
			$("#addPriceItem_serviceUnit_3").attr("disabled", false);
			$("#hgRebatePricePrice").show();
			$("#hgKinsRebatePricePrice").show();
		}
	}
	
	function batchUpdateButton(){
		if($(".opt").length >= 2){
			$("#batchUpdate").removeClass('hidden');
		}else {
			$("#batchUpdate").addClass('hidden');
		}
	}
	loadPriceList(true, 1);
	
	$("#addPriceItem_price").change(function(){
		var price = $(this).val();
		$("#addPriceItem_hgRebatePricePrice").val(price);
		$("#addPriceItem_hgKinsRebatePricePrice").val(price);
	});
	
	$("#showPriceItem_price").change(function(){
		var price = $(this).val();
		$("#showPriceItem_hgRebatePricePrice").val(price);
		$("#showPriceItem_hgKinsRebatePricePrice").val(price);
	});
	
	$(".js-btn-showComPanyPriceList").on('click', function () {
		loadPriceList(true, 1);
	});
	
});