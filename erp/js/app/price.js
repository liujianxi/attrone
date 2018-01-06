/**
 * 机构管理模块
 */
//机构管理模块的数据对象
var orgPriceModule = {
	orgList: [], //机构数据列表
	provinceList: [], //搜索省份
	cityList: [], //搜索城市
	selctChange: {}, //监听下拉框事件
	roomId: 0,
	orgId: 0,
	orgPriceId: 0,
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
			[
				{ 'name': '贴心专陪', 'id': '1' },
				{ 'name': '温馨普陪', 'id': '2' },
				{ 'name': '附加服务', 'id': '99' }
			],
			[
				{ 'name': '居家照顾', 'id': '101' }, { 'name': '家庭护士', 'id': '102' }, { 'name': '康复护理', 'id': '103' }, { 'name': '中医理疗', 'id': '104' },
				{ 'name': '金牌月嫂', 'id': '105' }, { 'name': '就医陪护', 'id': '106' }, { 'name': '心理慰藉', 'id': '107' }, { 'name': '产后恢复', 'id': '108' },
				{ 'name': '育婴幼教', 'id': '109' }, { 'name': '临终关怀', 'id': '110' }, { 'name': '上门服务附加', 'id': '199' }
			]
		],
		SERVICE_UNIT_MAP : [
			{id:0,name:'未知'},
			{id:1,name:'次'},{id:2,name:'小时'},{id:3,name:'天'},{id:4,name:'月'}
		]
	}
	
	
	orgPriceModule.goBranchPrice =  function(orgId){
		parent.tm.addTab('科室定价', '././templates/branchprice.html',{orgId:orgId});
	}
	
	orgPriceModule.selctChange = selctChange;
	orgPriceModule.loadOrgPriceList = loadOrgPriceList;
	var orgPriceDealModal = new ModalPanel("#orgPriceDeal_panel");
	var addPriceItemModal = new ModalPanel("#addPriceItem_panel");
	var showPriceItemModal = new ModalPanel("#showPriceItem_panel");
	//实例化请求帮助类
	var httpUtilObj = new HttpUtil();
	//初始化搜索区域的控件
	initSearchWidget();
	function editDomChange(id) {
		$("#toEditBtn").addClass("hidden");
		$("#updatePriceBtn").removeClass("hidden");
		$("#cancelEditBtn").removeClass("hidden");
		$("#showPriceItem_serviceItem").prop("disabled", false);		
//		$("#showPriceItem_parentTypeSel").prop("disabled", false);		
		$("#showPriceItem_serviceType").prop("disabled", true);		
		$("#radioDiv input").prop("disabled", true);		
		$("#show_showScope input").prop("disabled", false);		
		$("#showPriceItem_description").prop("disabled", false);		
		$("#showPriceItem_price").prop("disabled", false);	
		$("#showPriceItem_hgRebatePricePrice").prop("disabled", false);
		$("#showPriceItem_hgKinsRebatePricePrice").prop("disabled", false);
		$("#showPriceItem_prepayFee").prop("disabled", false);
		$("#showPriceItem_consent").prop("disabled", false);
		$('input[name=edit_moreService]').prop("disabled", false);
		$('input[name=edit_moreServiceGrouping]').prop("disabled", false);
	}
	function cancelDomChange() {
		$("#toEditBtn").removeClass("hidden");
		$("#updatePriceBtn").addClass("hidden");
		$("#cancelEditBtn").addClass("hidden");
		$("#showPriceItem_serviceItem").prop("disabled", true);		
//		$("#showPriceItem_parentTypeSel").prop("disabled", true);		
		$("#showPriceItem_serviceType").prop("disabled", true);		
		$("#radioDiv input").prop("disabled", true);		
		$("#show_showScope input").prop("disabled", true);		
		$("#showPriceItem_description").prop("disabled", true);		
		$("#showPriceItem_price").prop("disabled", true);	
		$("#showPriceItem_hgRebatePricePrice").prop("disabled", true);
		$("#showPriceItem_hgKinsRebatePricePrice").prop("disabled", true);
		$("#showPriceItem_prepayFee").prop("disabled", true);
		$("#showPriceItem_consent").prop("disabled", true);
		$('input[name=edit_moreService]').prop("disabled", true);
		$('input[name=edit_moreServiceGrouping]').prop("disabled", true);
	}
	orgPriceModule.cancelEdit = function() {
		cancelDomChange();
	}
	
	template.helper('priceHelper',function(id,dataSource){
		if(!isNaN(id) && (id>=0)){
			return eval("CONSTANT."+dataSource+"["+id+"].name");
		}else{
			return '未知';
		}
	});
	
	
	orgPriceModule.updatePriceItem = function() {
		var param = {
			priceId : orgPriceModule.priceId,
			orgPriceId : 0,
			orgId : orgPriceModule.orgId,
			serviceItem : $("#showPriceItem_serviceItem").val(),
			serviceType: $("#showPriceItem_serviceType").val(),
			serviceUnit: $("input[name=showPriceItem_serviceUnit]:checked").val(),
			price : $("#showPriceItem_price").val().replace(",",""),
			hgRebatePrice : $("#showPriceItem_hgRebatePricePrice").val().replace(",",""),
			hgKinsRebatePrice : $("#showPriceItem_hgKinsRebatePricePrice").val().replace(",",""),
			prepayFee : $("#showPriceItem_prepayFee").val().replace(",",""),
			showScope : $("input[name=showPriceItem_showScope]:checked").val(),
			consentText : $("#showPriceItem_consent").val().replace(",",""),
		};
		if($("#showPriceItem_serviceType").val()==99){//附加服务
			param['serviceSubjoinType']=$('input[name=edit_moreService]:checked').val();
		}
		if($('input[name=edit_moreService]:checked').val()!=2){
			param['subjoinGroupingType']=$('input[name=edit_moreServiceGrouping]:checked').val();//附加项子服务
		}
		if(orgPriceModule.addType == 'orgPrice'){
			param.orgPriceId = orgPriceModule.orgPriceId;
		}
		if(orgPriceModule.addType == 'company'){
			param.orgPriceId = 0;
			param.orgId = 0;
		}
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
				loadOrgPriceList();
				showPriceItemModal.hide();
			}
		});
	}
	
	orgPriceModule.editPriceItem = function(){
		editDomChange();
	}
	
	orgPriceModule.savePriceItem = function() {
		var param = {
			orgId : $("#search_org_add").val(),
			serviceItem : $("#addPriceItem_serviceItem").val(),
			serviceType: $("#addPriceItem_serviceType").val(),
			serviceUnit: $("input[name=addPriceItem_serviceUnit]:checked").val(),
			price : $("#addPriceItem_price").val().replace(",",""),
			description : $("#addPriceItem_description").val(),
			hgRebatePrice : $("#addPriceItem_hgRebatePricePrice").val().replace(",",""),
			hgKinsRebatePrice : $("#addPriceItem_hgKinsRebatePricePrice").val().replace(",",""),
			prepayFee : $("#addPriceItem_prepayFee").val().replace(",",""),
			consentText : $("#addPriceItem_consent").val().replace(",",""),
			showScope : $("input[name=addPriceItem_showScope]:checked").val(),
		};
		if($("#addPriceItem_serviceType").val()==99){//附加服务
			param['serviceSubjoinType']=$('input[name=price_moreService]:checked').val();
		}
		if($('input[name=price_moreService]:checked').val()!=2){
			param['subjoinGroupingType']=$('input[name=price_moreServiceGrouping]:checked').val();//附加项子服务
		}
		console.log(param);
		if($("#addPriceItem_serviceType").val()==99&&!$('input[name=price_moreService]:checked').val()){
			Toast.error("请选择附加服务类型！");
			return false;
		}
		if($("#addPriceItem_serviceType").val()==99&&$('input[name=price_moreService]:checked').val()!=2&&!$('input[name=price_moreServiceGrouping]:checked').val()){
			Toast.error("请选择附加项子类型！");
			return false;
		}
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
				loadOrgPriceList();
			}
		});
	}
	
	orgPriceModule.editDesc = function(priceId, orgId) {
		orgPriceModule.orgId = orgId;
		orgPriceModule.priceId = priceId;
		var param = {
			priceId : priceId,
			orgId : orgId
		}
		doHttp(param, '/adminjson/SAASGetPrice').then(function(result){
			var desc = result.body.price.description;
			if(desc == undefined) 
				desc = "";
			top.importOnceJS('js-script-richtext',"js/app/rp/richtext.js");
			top.G_Fun_showRichTextPanel(desc).then(function(data){
				let en_data=encodeURIComponent(data);
				console.log(en_data);
				result = result.body.price;
				result.priceId = orgPriceModule.priceId;
				result.orgId = orgPriceModule.orgId;
				result.branchId = orgPriceModule.branchId;
				result.updateDesc = 'yes';
				result.description = data;
				doHttp(result, '/adminjson/SAASSaveOrUpdatePrice').then(function(resultt){
						Toast.success('操作成功!');
						loadOrgPriceList(false);
				});
			});
		});
	}
	
	orgPriceModule.viewPrice = function(id, orgId) {
		$('.price_moreService').addClass('org_hide');
		$('.price_moreServiceGrouping').addClass('org_hide');
		$('.price_moreService input').prop('checked',false);
		$('.price_moreServiceGrouping input').prop('checked',false);
		if(orgPriceModule.addType == 'company'){
			$("#showPriceItem_parentTypeSel option[value=2]").prop("selected", true);
		}
		orgPriceModule.orgId = orgId;
		cancelDomChange();
		showPriceItemModal.show();
		orgPriceModule.priceId = id;
		$("#showPriceItem_parentTypeSel option").removeAttr("selected");
		$("#showPriceItem_serviceType option").removeAttr("selected");
		$("#radioDiv input").removeAttr("checked");
		
		var param = {
			priceId : id,
			orgId : orgId
		}
		//发送请求
		httpUtilObj.ajax({
			url: CONSTANT.URL_PREFIX + CONSTANT.GET_PRICE_URL,
			params: param
		}).then(function(result) {
			if(result.errorCode == 0) {
				var item = result.body.price;
				$("#showPriceItem_serviceItem").val(item.serviceItem);
				if(item.serviceType > 100){
					$("#showPriceItem_parentTypeSel option[value=2]").prop("selected",true);
				}else{
					$("#showPriceItem_parentTypeSel option[value=1]").prop("selected",true);
				}
				if(item.serviceType==99){//附加服务
					$('.edit_moreService').removeClass('org_hide');
				}else{
					$('.edit_moreService').addClass('org_hide');
				}
				$('#edit_moreService input[value='+ item.serviceSubjoinType +']').prop("checked",true);
				if(item.serviceType==99&&item.serviceSubjoinType!=2){
					$('.edit_moreServiceGrouping').removeClass('org_hide');
					$(".edit_moreServiceGrouping input[value="+item.subjoinGroupingType+"]").prop("checked",true);
				}else{
					$('.edit_moreServiceGrouping').addClass('org_hide');
				}
				$("#show_showScope input[value="+item.showScope+"]").prop("checked",true);
				orgPriceModule.typeSelChange('showPriceItem_');
				$("#showPriceItem_serviceType option[value="+item.serviceType+"]").prop("selected",true);
				$("#radioDiv input[value="+item.serviceUnit+"]").prop("checked",true);
				$("#showPriceItem_price").val(item.price);
				$("#showPriceItem_hgRebatePricePrice").val(item.hgRebatePrice);
				$("#showPriceItem_hgKinsRebatePricePrice").val(item.hgKinsRebatePrice);
				$("#showPriceItem_prepayFee").val(item.prepayFee);
				$("#showPriceItem_consent").val(item.consentText);
				if(item.serviceType == 99){
					$("#show_hgRebatePricePrice").hide();
					$("#show_hgKinsRebatePricePrice").hide();
					$("#show_prepayFee").hide();
				} else {
					$("#show_hgRebatePricePrice").show();
					$("#show_hgKinsRebatePricePrice").show();
					$("#show_prepayFee").show();
				}
			}
		});
	}
	
	orgPriceModule.typeSelChange = function(prefix) {
		var detailTypeHtml = template('childTypeSelTemplate',{list:CONSTANT.DETAIL_TYPE_MAP[$("#" + prefix + "parentTypeSel").val()-1]});
		$("#"+prefix+"serviceType").empty().append(detailTypeHtml);
	}
	function buildOrgList(res) {//机构部分
		var orgListHtml = template('orgSelctTemplate', res);
		if(res.orgList.length == 0) {
			$("#search_org").html('<option value="">请选择项目点</option>');
			$("#search_org_add").html('<option value="">请选择项目点</option>');
			$("#searchBut").prop("disabled", true);
			$("#searchBut").attr("disabled", true);
			$("#search_org_add").prop("disabled", true);
			$("#search_org_add").attr("disabled", true);
		} else {
			$("#searchBut").prop("disabled", false);
			$("#searchBut").attr("disabled", false);
			$("#search_org_add").prop("disabled", false);
			$("#search_org_add").attr("disabled", false);
		}
		$("#search_org").empty().append(orgListHtml);
		$("#search_org_add").empty().append(orgListHtml);

		if($("#search_org").val() && $("#search_org").val() != '') {
			if(!orgPriceModule.paginationParam.isInit) {
				orgPriceModule.loadOrgPriceList(true, 1,'org');
				orgPriceModule.paginationParam.isInit = true;
			}
		}

	}
	orgPriceModule.delPrice = function(id, orgId) {
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
						orgId : orgId,
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
						loadOrgPriceList();
					});
				}
			}
		});
	}

	orgPriceModule.addPriceItem = function(orgId, orgName, serviceType) {
		$('.price_moreService').addClass('org_hide');
		$('.price_moreServiceGrouping').addClass('org_hide');
		$('.price_moreService input').prop('checked',false);
		$('.price_moreServiceGrouping input').prop('checked',false);
		$("#addPriceItem_parentTypeSel option").removeAttr("selected");
		$("#addPriceItem_serviceItem").val('');
		$("#addPriceItem_price").val('');
		$("#addPriceItem_description").val('');
		$("#addPriceItem_hgRebatePricePrice").val('');
		$("#addPriceItem_hgKinsRebatePricePrice").val('');
		$("#addPriceItem_prepayFee").val('');
		$("#addPriceItem_consent").val('');
		addPriceItemModal.show();
		if(orgPriceModule.addType == 'company') {
			$("#addPriceItem_parentTypeSel option[value=2]").prop("selected", true);
		}else{
			$("#addPriceItem_parentTypeSel option[value=1]").prop("selected", true);
		}
		orgPriceModule.typeSelChange('addPriceItem_');
		if(orgId != undefined && orgId != '') {
			orgPriceModule.orgId = orgId;
			$("#search_org_add option[value='"+orgId+"']").prop('selected', true);
		}else{
			$("#search_org_add option[value='']").prop('selected', true);
		}
		$("#addPriceItem_serviceUnit_0").prop('checked', true);
		$("#addPriceItem_showScope_0").prop('checked', true);
		if(serviceType==99){
			$("#hgRebatePricePrice").hide();
			$("#hgKinsRebatePricePrice").hide();
			$("#prepayFee").hide();
			$("#addPriceItem_serviceUnit_2").attr("disabled", true);
			$('.price_moreService').removeClass('org_hide');//附加服务类型
		}else{
			$("#hgRebatePricePrice").show();
			$("#hgKinsRebatePricePrice").show();
			$("#prepayFee").show();
			$("#addPriceItem_serviceUnit_2").attr("disabled", false);
			$('.price_moreService').addClass('org_hide');//附加服务类型
		}
		if(serviceType!= undefined && serviceType!= '') {
			$("#addPriceItem_serviceType option[value='"+serviceType+"']").prop('selected', true);
		}else{
			$("#addPriceItem_serviceType option[value='1']").prop('selected', true);
		}
	}

	function getOrgPriceListData(pageNo) {
		var deferre = $.Deferred();
		var promise = deferre.promise();
		//收集查询控件的参数值
		orgPriceModule.searchParam = {
			orgPrice : 'yes',
			orgId: $("#search_org").val(),
			pageNo: pageNo, //请求页
			pageSize: orgPriceModule.paginationParam.pageSize //每页记录数
		}
		//返回请求的promise对象
		return httpUtilObj.ajax({
			url: CONSTANT.URL_PREFIX + 'SAASGetPriceList',
			params: orgPriceModule.searchParam
		});
	}
	/**
	 * 初始化搜索控件
	 */
	function initSearchWidget() {
		//获取数据
		var dataPromise = getCityJsonAll();
		dataPromise.then(function(result) {
			orgPriceModule.provinceList = result;
			initSelct('pro', result);
		});
	}

	/**
	 * 初始化下拉框
	 * @param {Object} type
	 * @param {Object} data
	 */
	function initSelct(type, data) {
		//通过模板转换HTML
		var selctHtml = template('selctTemplate', { list: data });
		//下拉框类型-名称映射表		
		var proCityDistMap = {
			'pro': '省份',
			'city': '城市',
			'distrct': '区/县',
		}
		//默认选项的HTML
		var defaultOption = '<option value="">请选择' + proCityDistMap[type] + '</option>';
		//根据类型，加载对应下拉框
		$("#" + type + "Selct").empty().append(defaultOption + selctHtml);
	}

	/**
	 * 私有方法：根据城市或者省会的code，获取JSON对象
	 * @param {Object} name
	 * @param {Object} list
	 */
	function getCityJSON(code, list) {
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			if(item.id == code) {
				return item;
			}
		}
	}

	/**
	 * 省市区下拉框监听
	 * @param {Object} type
	 * @param {Object} e
	 */
	function selctChange(type, e) {
		//选中的省份/城市编码
		var code = $(e).val();
		//		console.info('type:'+type+',code:'+code);
		//根据类型处理子级下拉框的加载
		if(type == 'pro' && code != '') {
			var cityList = getCityJSON(code, orgPriceModule.provinceList).city;
			orgPriceModule.cityList = cityList;
			initSelct('city', cityList);
			initSelct('distrct', []); //清空区县下拉框
		} else if(type == 'city' && code != '') {
			var selectedCity = getCityJSON(code, orgPriceModule.cityList);
			initSelct('distrct', selectedCity.area);
		}
		buildOrgList();
	}

	//获取所有省-市-县级联数据
	function getCityJsonAll() {
		var dtd = $.Deferred();
		var promise = dtd.promise();
		$.getJSON(CONSTANT.GET_CITY_JSON, function(result) {
			dtd.resolve(result);
		}, function(result) {
			dtd.reject(result);
		});
		return promise;
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
		//		if(!orgPriceModule.paginationParam.isInit){
		$("#pagination").pagination(count, {
			'items_per_page': orgPriceModule.paginationParam.pageSize,
			'num_display_entries': 5,
			'num_edge_entries': 5,
			'prev_text': "上一页",
			'next_text': "下一页",
			'callback': function(page_index) {
				//如果已加载过则不加载
				if(!orgPriceModule.paginationParam.isInit) {
					orgPriceModule.paginationParam.isInit = true;
				} else {
					loadOrgPriceList(false, page_index + 1,'page');
				}
				//当前页数
				orgPriceModule.paginationParam.pageNo = page_index + 1;
			},
			'current_page': (nowPage <= 1) ? 0 : (nowPage - 1)
		});
		//		}
	}

	/**
	 * 机构数据加载
	 * @param {Object} isAll (是否全部加载，如果是true才初始化分页控件，分页加载数据就是false的情况)
	 */
	function loadOrgPriceList(isAll, pageNo,str) {
		console.log(str);
		//请求数据
		getOrgPriceListData(pageNo).then(function(data) {
			//刷新列表
			refreshOrgPriceList(data.body);
			if(str=='init'){//org初始化
				buildOrgList(data.body.rightJson)
			}
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
	function refreshOrgPriceList(data) {
		var orgPriceListHtml = template('orgPriceListTemplate', data);
		$("#orgPriceListContent").empty().html(orgPriceListHtml);
	}
	loadOrgPriceList(true, 1,'init');
	
	
	$("#addPriceItem_panel #addPriceItem_serviceType").on("change",function(){
		$('.price_moreService input').prop('checked',false);
		$('.price_moreServiceGrouping input').prop('checked',false);
		if($(this).val() == 99){//附加服务
			$("#addPriceItem_serviceUnit_2").attr("disabled", true);
			$("#addPriceItem_serviceUnit_3").attr("disabled", true);
			$("#addPriceItem_serviceUnit_0").prop('checked', true);
			$("#hgRebatePricePrice").hide();
			$("#hgKinsRebatePricePrice").hide();
			$("#prepayFee").hide();
			$('.price_moreService').removeClass('org_hide');//附加服务类型
		}else {
			$("#addPriceItem_serviceUnit_2").attr("disabled", false);
			$("#addPriceItem_serviceUnit_3").attr("disabled", false);
			$("#hgRebatePricePrice").show();
			$("#hgKinsRebatePricePrice").show();
			$("#prepayFee").show();
			$('.price_moreService').addClass('org_hide');//附加服务类型
		}
	});
	//附加服务子类型
	$('input[name=price_moreService]').off('click').on('click',function(){
		let input_value=$(this).val();
		if(input_value!=2){
			$('.price_moreServiceGrouping').removeClass('org_hide');
		}else{
			$('.price_moreServiceGrouping').addClass('org_hide');
		}
	})
	$('input[name=edit_moreService]').off('click').on('click',function(){
		let input_value=$(this).val();
		if(input_value!=2){
			$('.edit_moreServiceGrouping').removeClass('org_hide');
		}else{
			$('.edit_moreServiceGrouping').addClass('org_hide');
		}
	})
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
	
	
});