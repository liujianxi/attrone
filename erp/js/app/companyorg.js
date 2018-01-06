/**
 * 机构管理模块
 */
//机构管理模块的数据对象
var orgModule = {
	orgList : [],	//机构数据列表
	provinceList : [],	//搜索省份
	cityList : [],	//搜索城市
	selctChange : {},	//监听下拉框事件
	//分页参数
	paginationParam : {
		pageSize : 10,	//每页展示的数据条目
		isInit : false,	//是否已初始化
	},
	companyId : 0,
	refer : '',
	orgId : 0,
	orgId2nd : 0
};


var coEditModel = {
	id : 0
}

//机构编辑面板-数据对象
var orgEditModule = {
	state : 'show'	//面板状态(show-查看;edit-编辑)
}


$(document).ready(function(){
	/**
	 * 私有常量集合
	 */
	var CONSTANT = {
		//处理请求前缀
		URL_PREFIX : '/adminjson/',
		//获取机构列表数据
		GET_ORG_LISG_URL : 'SAASGetCompanyOrgList',
		GET_ORG_TAG_LIST_URL : 'SAASGetOrgTagList',
		GET_ORG_TAG_URL : 'SAASGetOrgTag',
		DEL_ORG_TAG_URL : 'SAASDeleteOrgTag',
		SAVE_UPDATE_ORG_TAG_URL : 'SAASSaveOrUpdateOrgTag',
		GET_COMPANY_LIST_URL : 'SAASGetCompanyList',
		GET_ORG_LIST_URL : 'SAASGetOrgList',
		//获取机构
		GET_ORG : 'SAASGetOrg',
		//删除机构
		DEL_ORG_URL : 'SAASDeleteOrg',
		DEL_CO_URL: 'SAASDeleteCompanyOrg',
		//保存或新增机构
		SAVE_ORG_URL : 'SAASSaveOrUpdateOrg',
		SAVE_CO_URL : 'SAASSaveOrUpdateCompanyOrg',
		GET_TAG_ITEM_URL : 'SAASGetOrgTagItemList',
		//省市县级联数据
		GET_CITY_JSON : '../js/app/common/city.json',
		GET_HGLIST : 'SAASGetHGListByRoleId' ,
		GetCO : 'SAASGetCompanyOrgList',
		ORG_TYPE : [
			{ name:'其他',id:0},
			{ name:'医院',id:1},
			{ name:'养老院',id:2}
		],
		//机构-详细类型
		ORG_DETAILED_TYPE : [
			{ name:'未知',id:0},
			{ name:'妇幼医院',id:1},
			{ name:'肿瘤医院',id:2},
			{ name:'整形美容',id:3},
			{ name:'耳鼻喉科医院',id:4},
			{ name:'眼科医院',id:5},
			{ name:'皮肤病医院',id:6},
			{ name:'中医院',id:7},
			{ name:'综合医院',id:8},
			{ name:'专科医院',id:9}
			],
		//机构-级别
		ORG_LEVEL_LIST : [
			{ name:'未知',type:'未知',id:0},
			{ name:'一级丙等',type:'一级',id:1},
			{ name:'一级乙等',type:'一级',id:2},
			{ name:'一级甲等',type:'一级',id:3},
			{ name:'二级丙等',type:'二级',id:4},
			{ name:'二级乙等',type:'二级',id:5},
			{ name:'二级甲等',type:'二级',id:6},
			{ name:'三级丙等',type:'三级',id:7},
			{ name:'三级乙等',type:'三级',id:8},
			{ name:'三级甲等',type:'三级',id:9}],
		//机构-经营方式
		OPERATE_MODE_LIST : [
			{ name:'未知',id:0},
			{ name:'国营',id:1},
			{ name:'合伙制',id:2},
			{ name:'股份制',id:3},
			{ name:'中外合资合作',id:4},
			{ name:'私人',id:5},
			{ name:'集体',id:6}],
		TAG_RECORD : 0,
		STATIC_TAG_RECORD : 0
	};
	
	//将下拉框监听事件绑定到公共对象
	orgModule.selctChange = selctChange;
	//将加载数据的方法绑定到公共对象
	orgModule.loadOrgList = loadOrgList;
	//删除机构数据
	orgModule.delOrgItem = delOrgItem;
	//显示编辑机构面板
	orgModule.showEditOrg = showEditOrg;
	//打开branch页面
	orgModule.goBranch = goBranch;
	var showOrgModal = new ModalPanel("#showOrg_panel");
	//面板状态转换
	orgEditModule.changePanel = changePanel;
	//保存编辑机构
	orgEditModule.editOrgItem = editOrgItem;
	var linkCOModal = new ModalPanel("#linkCO");
	var showTagListModal = new ModalPanel("#showTagList_panel");
	//实例化请求帮助类
	var httpUtilObj = new HttpUtil();
	//初始化搜索区域的控件
	initSearchWidget();
	
	/**
	 * 
	 * @param {Object} org_id
	 */
	$('.popover-rel').popover({
		'trigger':'hover',
	});
	function goBranch(orgId,orgName){
		var refer = 'co';
		if(orgModule.refer == 'co')
			refer = 'company';
		parent.tm.addTab('科室', '././templates/branch.html',{orgId:orgId,companyId:orgModule.companyId,refer:refer});
	}
	
	orgModule.delCO = function(id) {
		bootbox.confirm({
			title: "系统提示",
			message: "操作后将不可恢复，请确认？",
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
				var param = {
					companyId: orgModule.companyId,
					orgId: id
				}
				if(isConfirm) {
					//发送请求
					httpUtilObj.ajax({
						url: CONSTANT.URL_PREFIX + CONSTANT.DEL_CO_URL,
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
							orgModule.reloadOrgList();
						}
					});
				}
			}
		});
	}
	orgModule.toLink = function() {
		var param = {
			companyId: orgModule.companyId
		}
		//发送请求
		httpUtilObj.ajax({
			url: CONSTANT.URL_PREFIX + CONSTANT.GetCO,
			params: param
		}).then(function(result) {
			if(result.errorCode == 0) {
				buildOrgList();
				//loadOrgList(false,1);
			}
		});
		linkCOModal.show();
		initSearchWidget('linkCO');
	}
	
	orgEditModule.saveServiceNum = function () {
		var param = {
			id : orgModule.orgId2nd,
			serviceNum : $("#orgConfig_serviceNum").val(),
			isSetServiceNum : 'yes'
		};
		//发送请求
		httpUtilObj.ajax({
			url : CONSTANT.URL_PREFIX + CONSTANT.SAVE_ORG_URL, 
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
				orgEditModule.cancelEditServiceNum();
				loadOrgInfo(orgModule.orgId2nd);
			}
		});
	}
	
	orgEditModule.cancelEditServiceNum = function() {
		$("#orgConfig_serviceNum").prop("disabled", "disabled");
		$("#saveServiceNumBTN").addClass('hidden');
		$("#cancelEditServiceNumBTN").addClass('hidden');
		$("#editServiceNumBTN").removeClass('hidden');
	}
	
	orgEditModule.editServiceNum = function() {
		$("#cancelEditServiceNumBTN").removeClass('hidden');
		$("#saveServiceNumBTN").removeClass('hidden');
		$("#editServiceNumBTN").addClass('hidden');
		$("#orgConfig_serviceNum").prop("disabled", false);
	}
	
	orgModule.delTagItem = function(item){
		bootbox.confirm({
			title : "系统提示",
			message : "删除后将不可恢复，请确认？",
			buttons : {
				confirm: {
		            label: '确定',
		            className: 'btn-success'
		        },
		        cancel: {
		            label: '取消',
		            className: 'btn-danger'
		        }
			},
			callback : function(isConfirm){
				if(isConfirm){
					//发送请求
					httpUtilObj.ajax({
						url : CONSTANT.URL_PREFIX + CONSTANT.DEL_ORG_TAG_URL, 
						params : {
							id : $(item).siblings("input").val(),
							order : $(item).parent().siblings(".tagOrderTD").children("input").val(),
							orgId : orgModule.orgId
						}
					}).then(function(result){
						if(result.errorCode == 0){
							$(item).siblings("input").val(0);
							console.info($(item).siblings("input").val());
							$.toast({
							    heading: '系统消息',
							    text: '操作成功！',
							    position: 'top-right',
							    icon: 'success',
							    loaderBg: '#9EC600',
							    stack: false
							});
							loadTagList(orgModule.orgId);
						}
					});
				}
			}
		});
	}
	orgModule.saveTagItem = function(item) {
		var param = {
			id : $(item).siblings("input").val(),
			order : $(item).parent().parent().children(".tagOrderTD").children("input").val(),
			orgId : orgModule.orgId,
			tagId : $(item).parent().siblings().children("select").children("option:selected").val()
		};
		//发送请求
		httpUtilObj.ajax({
			url: CONSTANT.URL_PREFIX + CONSTANT.SAVE_UPDATE_ORG_TAG_URL,
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
				$(item).parent().siblings().children("input").prop("disabled", "disabled");
				$(item).parent().siblings().children("select").prop("disabled", "disabled");
				loadTagList(orgModule.orgId);
			}
		});
	}
	
	function loadTagList(id) {
		orgModule.orgId = id;
		var param = {
			orgId : id,
		};
		//发送请求
		httpUtilObj.ajax({
			url : CONSTANT.URL_PREFIX + CONSTANT.GET_ORG_TAG_LIST_URL, 
			params : param
		}).then(function(result){
			if(result.errorCode == 0){
				var data = result.body ;
				// 将标签个数设置为目前该机构的标签个数
				orgModule.TAG_RECORD = data.count;
				orgModule.STATIC_TAG_RECORD = data.count;
				if(data.count == 0) {
					$("#hintTRZZ").removeClass('hidden');
				}else{
					$("#hintTRZZ").addClass('hidden');
				}
				toggleTR(data.count);
				$(".tagId").removeClass('isEditing');
				
				$(data.tagList).each(function(index, element) {
					$("#tagTR"+element.order+" .tagNameTD input").val(element.tagName);
					$("#tagTR"+element.order+" .tagCompanyNameTD").html(element.companyName);
					$("#tagTR"+element.order+" .OPERATETD input").val(element.id);
					$("#tagTR"+element.order+" .tagColorTD input[value='"+element.color+"']").prop("checked", true);
					$("#tagTR"+element.order +" .OPERATETD .tagHrefEdit").addClass('hidden');
					$("#tagTR"+element.order +" .OPERATETD .tagHrefShow").removeClass('hidden');
					$("#tagTR"+element.order+" .tagNameTD select option[value='"+element.tagId+"']").prop("selected", true);
				});
			}
		});
	}
	
	function toggleTR(count) { 
		for (var i = 1; i < count + 1; i ++) {
			$("#tagTR"+i).removeClass('hidden');
		}
		for (var i = count+1; i <= 5; i ++) {
			$("#tagTR"+i).addClass('hidden');
		}
	}
	
	orgModule.editTagItem = function(item) {
		$(item).addClass('hidden');
		$(item).siblings("input").addClass('isEditing');
		$(item).parent().siblings().children("input").prop("disabled", false);
		$(item).parent().siblings().children("select").prop("disabled", false);
		$(item).parent().siblings(".tagOrderTD").children("input").prop("disabled", true);
		$(item).siblings(".tagHrefEdit").removeClass('hidden');
		$(item).siblings(".tagHrefShow").addClass('hidden');
	}
	
	orgModule.cancelEditTag = function(item) {
		$(item).siblings("input").removeClass('isEditing');
		if(orgModule.STATIC_TAG_RECORD < orgModule.TAG_RECORD) {
			$("#tagTR"+orgModule.TAG_RECORD).addClass('hidden');
			orgModule.TAG_RECORD = orgModule.TAG_RECORD -1;
		}
		$(item).addClass('hidden');
		$(item).parent().siblings().children("input").prop("disabled", "disabled");
		$(item).parent().siblings().children("select").prop("disabled", "disabled");
		$(item).siblings(".tagHrefEdit").addClass('hidden');
		$(item).siblings(".tagHrefShow").removeClass('hidden');
	}
	
	orgModule.setTag = function(id, orgName) {
		loadTagItemList(id);
		loadOrgInfo(id);
		$("#descHFourTag").html(orgName + " 标签列表");
		$("#descHFourServiceNum").html(orgName + " 服务人数");
		$(".userInput").prop("disabled", "disabled");
		$(".tagNameTD select").prop("disabled", "disabled");
		orgEditModule.cancelEditServiceNum();
		showTagListModal.show();
	}
	
	function loadTagItemList(id) {
		httpUtilObj.ajax({
			url : CONSTANT.URL_PREFIX + CONSTANT.GET_TAG_ITEM_URL, 
			params : {
				orgId : id
			}
		}).then(function(result){
			if(result.errorCode == 0){
				var colorTagListSelHtml = template('colorSelTemplate',result.body);
				$("#colorSel5").empty().html(colorTagListSelHtml);
				$("#colorSel4").empty().html(colorTagListSelHtml);
				$("#colorSel3").empty().html(colorTagListSelHtml);
				$("#colorSel2").empty().html(colorTagListSelHtml);
				$("#colorSel1").empty().html(colorTagListSelHtml);
				loadTagList(id);
			}
		});
	}
	
	orgModule.addTagItem = function() {
		var isEditing = $("#tagListContent tr[class=''] .OPERATETD input").hasClass('isEditing');
//		console.info("orgModule.TAG_RECORD : "+orgModule.TAG_RECORD);
//		console.info("orgModule.STATIC_TAG_RECORD : " + orgModule.STATIC_TAG_RECORD);
//		console.info("isEditing : " + isEditing);
		if(orgModule.TAG_RECORD < 5) {
			if(orgModule.STATIC_TAG_RECORD < orgModule.TAG_RECORD || isEditing){
				$.toast({
				    heading: '系统消息',
				    text: '请先保存正在编辑的标签!',
				    position: 'top-right',
				    icon: 'error',
				    loaderBg: '#9EC600',
				    stack: false
				});
				return;
			}
			
			orgModule.TAG_RECORD = orgModule.TAG_RECORD + 1;
			$("#tagTR"+orgModule.TAG_RECORD).removeClass('hidden');
			$("#tagTR"+orgModule.TAG_RECORD +" .tagNameTD select").prop("disabled", false).focus();
//			$("#tagTR"+orgModule.TAG_RECORD +" .tagNameTD input").val('');
			$("#tagTR"+orgModule.TAG_RECORD +" .tagColorTD input").prop("disabled", false);
			$("#tagTR"+orgModule.TAG_RECORD +" .tagColorTD input:checked").prop("checked", false);
			$("#tagTR"+orgModule.TAG_RECORD +" .tagCompanyNameTD").html($("#companySelect option:selected").html());
			$("#tagTR"+orgModule.TAG_RECORD +" .OPERATETD .tagHrefEdit").removeClass('hidden');
			$("#tagTR"+orgModule.TAG_RECORD +" .OPERATETD input").val(0);
			$("#tagTR"+orgModule.TAG_RECORD +" .OPERATETD .tagHrefShow").addClass('hidden');
		}else{
			$.toast({
			    heading: '系统消息',
			    text: '最多添加5个标签！',
			    position: 'top-right',
			    icon: 'error',
			    loaderBg: '#9EC600',
			    stack: false
			});
		}
	}
	
	
	/**
	 * 机构编辑
	 */
	function editOrgItem(){
		var param = {
			isSetOrg : 'yes',
			orgId : coEditModel.id,
			chairmanId : $("#showOrg_chairman").val(),
			changeServiceConfig : $("input[name='showOrg_change']:checked").val(),
			measurementConfig : $("input[name='showOrg_measurementConfig']:checked").val(),
			dudaoChargeConfig : $("input[name='showOrg_dudaocharge']:checked").val(),
			kfPhone : $("#showOrg_kfPhone").val(),
			lastDayFeeConfig:$("input[name='showOrg_FeeRule']:checked").attr('lastDayFeeConfig'),//结束计费
			changeServiceConfig:$("input[name='showOrg_FeeRule']:checked").attr('changeServiceConfig'),//变更当天
		};
		//发送请求
		httpUtilObj.ajax({
			url : CONSTANT.URL_PREFIX + CONSTANT.SAVE_CO_URL, 
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
				loadOrgList(true,1);
				showOrgModal.hide();
			}
		});
	}
	
	/**
	 * 机构编辑 - 转换面板状态
	 * @param {Object} state
	 */
	function changePanel(){
		//当前状态是显示(转换成编辑)
		if(orgEditModule.state == 'show'){
			orgEditModule.state = 'edit';
			//修改面板标题
			$("#showOrg_panel .panel-header h4").html('项目点编辑');
			//将所有控件的移除禁用属性				
			$("input[name='showOrg_measurementConfig']").removeAttr('disabled');
			$("input[name='showOrg_change']").removeAttr('disabled');
			$("input[name='showOrg_dudaocharge']").removeAttr('disabled');
			$("input[name='showOrg_lastDayFee']").removeAttr('disabled');
			$("input[name='showOrg_FeeRule']").removeAttr('disabled');
			$("#showOrg_chairman").removeAttr('disabled');
			$("#showOrg_kfPhone").removeAttr('disabled');
			//按钮状态转换
			$("#panelChangeBtn").html('取消').removeClass('btn-success').addClass('btn-default');
			$("#editOrgBtn").removeClass('hidden');
		}else{
			orgEditModule.state = 'show';
			//修改面板标题
			$("#showOrg_panel .panel-header h4").html('机构查看');
			//将所有控件的添加禁用属性				
			$("#showOrg_chairman").attr('disabled','disabled');
			$("#showOrg_kfPhone").attr('disabled','disabled');
			$("input[name='showOrg_change']").attr('disabled','disabled');
			$("input[name='showOrg_measurementConfig']").attr('disabled','disabled');
			$("input[name='showOrg_lastDayFee']").attr('disabled','disabled');
			$("input[name='showOrg_FeeRule']").attr('disabled','disabled');
			$("input[name='showOrg_dudaocharge']").attr('disabled','disabled');
			//按钮状态转换
			$("#panelChangeBtn").html('编辑').removeAttr('disabled').removeClass('btn-default').addClass('btn-success');
			$("#editOrgBtn").addClass('hidden');
		}
	}
	
	/**
	 * 机构编辑 - 面板初始化
	 * @param {Object} id
	 */
	function showPanelInit(id){
		initHGList(id);
		coEditModel.id = id;
		//面板机构数据加载
		panelLoadData('showOrg_panel');
		//选中的机构数据回显
		//每次查看都改变面板状态为查看
		orgEditModule.state = 'edit';
		changePanel();
	}
	
	/**
	 * 机构面板数据载入，根据面板id填充数据
	 * @param {Object} panel_id
	 */
	function panelLoadData(panel_id){
		//加载地图控件
		initMap(panel_id);
		initDetailType(panel_id);
		initOrgLevel(panel_id);
		initOperateMode(panel_id);
	}
	
	function initHGList(id) {
		httpUtilObj.ajax({
			params : {hgType : 10007, pageNo : 1, pageSize : 1000, roleId : 10007},
			url : CONSTANT.URL_PREFIX + CONSTANT.GET_HGLIST
		}).then(function(result){
			// 查找护工列表
			var huListSelHtml = template('hgSelTemplate',result.body);
			$("#showOrg_chairman").empty().html(huListSelHtml);
			loadOrgInfo(id);
		});
	}
	
	/**
	 * 机构数据回显
	 * @param {Object} id
	 */
	function loadOrgInfo(id){
		orgModule.orgId2nd = id;
		//发送请求
		httpUtilObj.ajax({
			url : CONSTANT.URL_PREFIX + CONSTANT.GET_ORG, 
			params : {orgId : id}
		}).then(function(result){
			var orgData = result.body.org;
			if(result.errorCode == 0){
				
				$("#showOrg_name").val(orgData.orgName);
				$("#showOrg_building").val(orgData.building);
				
				$("#showOrg_detailedType option[value='"+orgData.detailedType+"']").attr("selected", true);
				$("#showOrg_level option[value='"+orgData.orgLevel+"']").attr("selected", true);
				$("#showOrg_operateMode option[value='"+orgData.operateMode+"']").attr("selected", true);
				$("#showOrg_chairman option[value='"+orgData.chairmanId+"']").attr("selected", true);
				$("#showOrg_address").val(orgData.address);
				$("#showOrg_kfPhone").val(orgData.kfPhone);
				$("#showOrg_telephone").val(orgData.telephone);
				$("#showOrg_offcialWebSite").val(orgData.officialWebsite);
				$("#showOrg_lng").val(orgData.lng);
				$("#showOrg_lat").val(orgData.lat);
				$("#showOrg_adcode").val(orgData.countyId);
				$("#showOrg_provinceID").val(orgData.provinceId);
				$("#showOrg_cityID").val(orgData.cityId);
				$("#showOrg_district").val(orgData.district);
				$("#showOrg_district").val(orgData.district);
				$("#orgConfig_serviceNum").val(orgData.serviceNum);
				$("#showOrg_dudaochargeDiv input[value="+ orgData.dudaoChargeConfig +"]").prop("checked",true);
				$("#showOrg_FeeRule input[lastDayFeeConfig="+ orgData.lastDayFeeConfig +"][changeServiceConfig="+ orgData.changeServiceConfig +"]").prop("checked",true);
				$("#showOrgMeasurementConfig input[value="+ orgData.measurementConfig +"]").prop("checked",true);
				$("#showOrgchang input[value="+ orgData.changeServiceConfig +"]").prop("checked",true);
				$("#showOrg_type_"+orgData.orgType).prop('checked', true);
			}
		});
	}
	
	/**
	 * 字符串过滤器
	 */
	template.helper('orgFilter',function(id,dataSource){
//		console.info("id:"+id+",code:CONSTANT."+dataSource+"["+id+"].name");
		if(!isNaN(id) && (id>=0)){
			return eval("CONSTANT."+dataSource+"["+id+"].name");
		}else{
			return '未知';
		}
	});

	/**
	 * 查看机构数据
	 * @param {Object} id
	 */
	function showEditOrg(id){
		showOrgModal.show();
		showPanelInit(id);//初始化面板
	}
	
	/**
	 * 删除机构
	 */
	function delOrgItem(id){
		bootbox.confirm({
			title : "系统提示",
			message : "删除后将不可恢复，请确认？",
			buttons : {
				confirm: {
		            label: '确定',
		            className: 'btn-success'
		        },
		        cancel: {
		            label: '取消',
		            className: 'btn-danger'
		        }
			},
			callback : function(isConfirm){
				if(isConfirm){
					//发送请求
					httpUtilObj.ajax({
						url : CONSTANT.URL_PREFIX + CONSTANT.DEL_ORG_URL, 
						params : {id:id}
					}).then(function(result){
//						console.info('请求成功'+JSON.stringify(result));
						if(result.errorCode == 0){
							$.toast({
							    heading: '系统消息',
							    text: '操作成功！',
							    position: 'top-right',
							    icon: 'success',
							    loaderBg: '#9EC600',
							    stack: false
							});
							loadOrgList(false);
						}
					});
				}
			}
		});
	}
	
	/**
	 * 初始化搜索控件
	 */
	function initSearchWidget(){
		var initParam = httpUtilObj.getTabParams();
		if(initParam){
			orgModule.companyId = initParam.companyId;
			orgModule.refer = initParam.refer;
		}
		if(orgModule.refer != 'co'){
			$(".yjyView").addClass('hidden');
		}
		
		//获取数据
		var dataPromise = getCityJsonAll();
		dataPromise.then(function(result){
			orgModule.provinceList = result;
			initSelct('pro',result);
			initSelct('addCompany_pro',result);
		});
	}
	function loadCompanyList() {
		var param = {
			state: 1
		}
		httpUtilObj.ajax({
			url: CONSTANT.URL_PREFIX + CONSTANT.GET_COMPANY_LIST_URL,
			params: param
		}).then(function(result) {
			if(result.errorCode == 0) {
				var companyListHtml = template('companySelTemplate', result.body);
				$("#companySelect").empty().append(companyListHtml);
				$("#companySelect option[value='"+orgModule.companyId+"']").prop('selected', true);
			}
		});
	}
	loadCompanyList();
	orgModule.reloadOrgList = function(str) {
		if(str == 'companyChange'){
			orgModule.companyId = $("#companySelect").val();
		}
		loadOrgList(true, 1);
	}
	orgModule.addCO = function() {
		console.info(orgModule.companyId);
		//查询参数
		var param = {
			companyId: orgModule.companyId,
			orgId: $("#addCO_ORGListHtml").val(),
			addCO : 'yes',
		}

		httpUtilObj.ajax({
			url: CONSTANT.URL_PREFIX + CONSTANT.SAVE_CO_URL,
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
				linkCOModal.hide();
				loadOrgList(true, 1);
			}

		});
	}
	
	/**
	 * 初始化下拉框
	 * @param {Object} type
	 * @param {Object} data
	 */
	function initSelct(type,data){
		//通过模板转换HTML
		var selctHtml = template('selctTemplate',{list:data});
		//下拉框类型-名称映射表		
		var proCityDistMap = {
			'pro' : '省份',
			'city': '城市',
			'distrct' : '区/县',
			'addCompany_pro':'省份',
			'addCompany_city': '城市',
			'addCompany_distrct' : '区/县'
		}
		//默认选项的HTML
		var defaultOption = '<option value="">请选择' + proCityDistMap[type] + '</option>';
		//根据类型，加载对应下拉框
		$("#"+type+"Selct").empty().append(defaultOption + selctHtml);	
	}

	/**
	 * 私有方法：根据城市或者省会的code，获取JSON对象
	 * @param {Object} name
	 * @param {Object} list
	 */
	function getCityJSON(code,list){
		for(var i=0;i<list.length;i++){
			var item = list[i];
			if(item.id == code){
				return item;
			}
		}
	}
	
	/**
	 * 省市区下拉框监听
	 * @param {Object} type
	 * @param {Object} e
	 */
	function selctChange(type,e){
		//选中的省份/城市编码
		var code = $(e).val();
//		console.info('type:'+type+',code:'+code);
		//根据类型处理子级下拉框的加载
		if(type == 'pro' && code != ''){
			var cityList = getCityJSON(code,orgModule.provinceList).city;
			orgModule.cityList = cityList;
			initSelct('city',cityList);
			initSelct('distrct',[]);	//清空区县下拉框
		}else if(type == 'city' && code != ''){
			var selectedCity = getCityJSON(code,orgModule.cityList);
			initSelct('distrct',selectedCity.area);
		}
		if(type == 'addCompany_pro' && code != ''){
			var cityList = getCityJSON(code,orgModule.provinceList).city;
			orgModule.cityList = cityList;
			initSelct('addCompany_city',cityList);
			initSelct('addCompany_distrct',[]);	//清空区县下拉框
		}else if(type == 'addCompany_city' && code != ''){
			var selectedCity = getCityJSON(code,orgModule.cityList);
			initSelct('addCompany_distrct',selectedCity.area);
		}
		buildOrgList();
	}
	
	function buildOrgList() {
		//查询参数
		var param = {
			provinceId: $("#addCompany_proSelct").val(),
			cityId: $("#addCompany_citySelct").val()
		}
		//发送请求
		httpUtilObj.ajax({
			url: CONSTANT.URL_PREFIX + CONSTANT.GET_ORG_LIST_URL,
			params: param
		}).then(function(result) {
			if(result.errorCode == 0) {
				var orgListHtml = template('orgSelctTemplate', result.body);
				if(result.body.count == 0) {
					$("#saveLinkCO").attr('disabled', 'disabled');
				} else {
					$("#saveLinkCO").attr('disabled', false);
				}
				$("#addCO_ORGListHtml").empty().append(orgListHtml);
			}
		});
	}
	
	//获取所有省-市-县级联数据
	function getCityJsonAll(){
		var dtd = $.Deferred();
		var promise = dtd.promise();
		$.getJSON(CONSTANT.GET_CITY_JSON,function(result){
			dtd.resolve(result);
		},function(result){
			dtd.reject(result);
		});
		return promise;
	}
	
	/**
	 * 初始化分页控件
	 * @param {Object} count
	 */
	function initPagination(nowPage,count){
//		console.info('nowPage:'+nowPage+',count:'+count);
		//如果记录条目为0则隐藏分页控件
		if(count<=orgModule.paginationParam.pageSize){
			$("#pagination").hide();
		}else{
			$("#pagination").show();
		}
		//如果已初始化控件，则不再		
//		if(!orgModule.paginationParam.isInit){
			$("#pagination").pagination(count, {
	            'items_per_page'      : orgModule.paginationParam.pageSize,
	            'num_display_entries' : 5,
	            'num_edge_entries'    : 5,
	            'prev_text'           : "上一页",
	            'next_text'           : "下一页",
	            'callback'            : function(page_index){
	            	//如果已加载过则不加载
	            	if(!orgModule.paginationParam.isInit){
	            		orgModule.paginationParam.isInit = true;
	            	}else{
		            	loadOrgList(false,page_index+1);
	            	}
	            	//当前页数
	            	orgModule.paginationParam.pageNo = page_index + 1;
	            },
	            'current_page'        : (nowPage<=1)?0:(nowPage-1)
	        });
//		}
	}
	
	/**
	 * 机构数据加载
	 * @param {Object} isAll (是否全部加载，如果是true才初始化分页控件，分页加载数据就是false的情况)
	 */
	function loadOrgList(isAll,pageNo){
		//请求数据
		getOrgListData(pageNo).then(function(data){
//			console.info('loadOrgList:' + JSON.stringify(data));
			//刷新列表
			refreshOrgList(data.body);
			
			//初始化分页控件
			if(isAll){
				initPagination(0,data.body.count);
			}
		});
	}
	
	/**
	 * 机构数据加载的请求处理
	 */
	function getOrgListData(pageNo){
		var deferre = $.Deferred();
		var promise = deferre.promise();
		//收集查询控件的参数值
		orgModule.searchParam = {
			orgName : $("#findOrgName").val(),
			provinceId : $("#proSelct").val(),
			cityId : $("#citySelct").val(),
			adcode : $("#distrctSelct").val(),
			pageNo : pageNo,	//请求页
			pageSize : orgModule.paginationParam.pageSize,	//每页记录数
			companyId : orgModule.companyId
		}
		//返回请求的promise对象
		return httpUtilObj.ajax({
			url : CONSTANT.URL_PREFIX + CONSTANT.GET_ORG_LISG_URL,
			params : orgModule.searchParam
		});
	}
	
	/**
	 * 初始化地址文本框
	 */
	function initMap(panel_id){
		var widgetPrefix = panel_id.substring(0,panel_id.indexOf('panel')) ;
		AMap.plugin(['AMap.Autocomplete', 'AMap.PlaceSearch'], function() {
			var autoOptions = {
				city: "全国", //城市，默认全国
				input: widgetPrefix + 'building' //使用联想输入的input的id
			};
			autocomplete = new AMap.Autocomplete(autoOptions);
			var placeSearch = new AMap.PlaceSearch({
				city: '广州'
			});
			AMap.event.addListener(autocomplete, "select", function(e) {
				placeSearch.search(e.poi.name);
				//自动填充详细地址
				var adcode = e.poi.adcode;
				$("#"+widgetPrefix+"address").val(e.poi.address);
				$("#"+widgetPrefix+"lng").val(e.poi.location.lng);
				$("#"+widgetPrefix+"lat").val(e.poi.location.lat);
				$("#"+widgetPrefix+"adcode").val(adcode);
				$("#"+widgetPrefix+"provinceID").val(adcode.substring(0,2) + "0000");
				$("#"+widgetPrefix+"cityID").val(adcode.substring(0,4) + "00");
				$("#"+widgetPrefix+"district").val(adcode);
			});
		});
	}
	
	/**
	 * 初始化详细地址
	 */
	function initDetailType(panel_id){
		var widgetID = panel_id.replace('panel','detailedType');
		var detailTypeHtml = template('selctTemplate',{list:CONSTANT.ORG_DETAILED_TYPE});
		$("#"+widgetID).empty().append(detailTypeHtml);
	}
	
	/**
	 * 初始化机构等级下拉框
	 */
	function initOrgLevel(panel_id){
		var widgetID = panel_id.replace('panel','level');
		var orgLevelHtml = template('selctTemplate',{list:CONSTANT.ORG_LEVEL_LIST});
		$("#"+widgetID).empty().append(orgLevelHtml);
	}
	
	/**
	 * 初始化经营方式下拉框
	 */
	function initOperateMode(panel_id){
		var widgetID = panel_id.replace('panel','operateMode');
		var operateModeHtml = template('selctTemplate',{list:CONSTANT.OPERATE_MODE_LIST});
		$("#"+widgetID).empty().append(operateModeHtml);
	}
	
	/**
	 * 刷新机构列表
	 * @param {Object} data
	 */
	function refreshOrgList(data){
		var orgListHtml = template('orgListTemplate',data);
		$("#orgListContent").empty().html(orgListHtml);
		if(orgModule.refer == 'co'){
			$(".modifyTD").addClass('hidden');
			$(".deleteCOTD").removeClass('hidden');
		}else{
			$(".modifyTD").removeClass('hidden');
			$(".deleteCOTD").addClass('hidden');
		}
	}
	
	var addOrgModal = new ModalPanel("#addOrg_panel");
	
	//显示新增机构面板按钮
	$("#showAddOrgBtn").click(function(){
		addOrgModal.show();	
		panelLoadData('addOrg_panel');
		initMap('addOrg_panel');
		initDetailType('addOrg_panel');
		initOrgLevel('addOrg_panel');
		initOperateMode('addOrg_panel');
	});
	//默认载入数据
	loadOrgList(true,1);
	//执行新增机构
	$("#addOrgBtn").click(function(){
		//收集数据
		var param = {
			orgName : $("#addOrg_name").val(),	//机构-名称
			orgType : $("input[name='addOrg_type']:checked").val(),	//机构-类型(默认选中医院)
			changeServiceConfig : $("input[name='addOrg_change']:checked").val(),
			dudaoChargeConfig : $("input[name='addOrg_charge']:checked").val(),
			orgLevel : $("#addOrg_level").val(),	//机构-等级
			province : $("#addOrg_provinceID").val(),	//机构-所在省
			city	 : $("#addOrg_cityID").val(),	//机构-所在城市
			district : $("#addOrg_district").val(),	//机构-所在区县
			building : $("#addOrg_building").val(),	//机构-地址
			address : $("#addOrg_address").val(),	//机构-区域详细地址
			lng : $("#addOrg_lng").val(),	//机构-经度	
			lat : $("#addOrg_lat").val(),	//机构-纬度
			gpsType : "2",	//机构-地图类型(默认是高德地图)
			adcode : $("#addOrg_adcode").val(),	//机构-区域邮政编号
			offcialWebSite : $("#addOrg_offcialWebSite").val(),	//机构-官网地址
			telephone : $("#addOrg_telephone").val(),	//机构-联系方式
			operateMode : $("#addOrg_operateMode").val(), //机构-经营方式
			detailedType : $("#addOrg_detailedType").val(),	//机构-详细类型
			lastDayFeeConfig:$("input[name='showOrg_FeeRule']:checked").attr('lastDayFeeConfig'),//结束计费
			changeServiceConfig:$("input[name='showOrg_FeeRule']:checked").attr('changeServiceConfig'),//变更当天
		};
		//发送请求
		httpUtilObj.ajax({
			url : CONSTANT.URL_PREFIX + CONSTANT.SAVE_ORG_URL, 
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
				addOrgModal.hide();
				loadOrgList(true,1);
			}
		});
	});
});
