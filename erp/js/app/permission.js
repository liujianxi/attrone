/**
 * 机构管理模块
 */
//机构管理模块的数据对象
var rightModule = {
	orgList: [], //机构数据列表
	provinceList: [], //搜索省份
	cityList: [], //搜索城市
	selctChange: {}, //监听下拉框事件
	roomId: 0,
	orgId: 0,
	branchId: 0,
	//分页参数
	paginationParam: {
		pageSize: 10, //每页展示的数据条目
		isInit: false, //是否已初始化
	},
	refer: '',
	rcId : 0
};

$(document).ready(function() {

	/**
	 * 私有常量集合
	 */
	var CONSTANT = {
		URL_PREFIX: '/adminjson/',
		GET_ROLE_LISG_URL: 'SAASGetRoleList',
		GET_CITY_JSON: '../js/app/common/city.json',
		GET_ORG_LISG_URL: 'SAASGetCompanyOrgList',
		SAVE_ROLE_URL: 'SAASSaveOrUpdateRole',
		GET_ROLE_URL: 'SAASGetRole',
		GET_ROLE_LIST_URL: 'SAASGetRoleList',
		GET_RIGHTCONFIG_LIST_URL: 'SAASGetRightConfigList',
		GET_RIGHT_LIST_URL: 'SAASGetRightList',
		DEL_ROLE_URL: 'SAASDelRole'
	};

	rightModule.loadRightList = loadRightList;
	var roleRightConfigModal = new ModalPanel("#roleRightConfig_panel");
	var addRightConfigModal = new ModalPanel("#addRightConfig_panel");
	//实例化请求帮助类
	var httpUtilObj = new HttpUtil();
	//初始化搜索区域的控件
	initSearchWidget();
	//默认载入数据
	loadRightList(true, 1);
	rightModule.delRole = function(id) {
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
						id: id
					}
					//发送请求
					httpUtilObj.ajax({
						url: CONSTANT.URL_PREFIX + CONSTANT.DEL_ROLE_URL,
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
							loadRightList(true, 1);
						}
					});
				}
			}
		});
	}

	$("#addRightConfig_scopeType").change(function() {
		var type = $("#addRightConfig_scopeType").val();
		if(type < 3) {
			$("#addRightConfig_orgSelect").selectpicker({
				'selectedText': 'cat',
				'maxOptions' : 10000
			});
		}else{
			$("#addRightConfig_orgSelect").selectpicker({
				'selectedText': 'cat',
				'maxOptions' : 1
			});
		}
		if(type == 1){
			$(".addRightConfig_orgSelect").addClass('hidden');
			$(".addRightConfig_branchSelect").addClass('hidden');
			$(".addRightConfig_hgSelect").addClass('hidden');
		}else if(type == 2){
			$("#addRightConfig_orgSelect").addClass('selectpicker');
			$("#addRightConfig_orgSelect").addClass('show-tick');
			$(".addRightConfig_orgSelect").removeClass('hidden');
			$(".addRightConfig_branchSelect").addClass('hidden');
			$(".addRightConfig_hgSelect").addClass('hidden');
//			var type = $("#addRightConfig_scopeType").val();
//			loadOrgList4Select();
		}else if(type == 3){
			$(".addRightConfig_orgSelect").removeClass('hidden');
			$("#addRightConfig_orgSelect").removeClass('selectpicker');
			$("#addRightConfig_orgSelect").removeClass('show-tick');
			$(".addRightConfig_branchSelect").removeClass('hidden');
			$(".addRightConfig_hgSelect").addClass('hidden');
		}else if(type == 4){
			$(".addRightConfig_orgSelect").addClass('hidden');
			$(".addRightConfig_branchSelect").addClass('hidden');
			$(".addRightConfig_hgSelect").removeClass('hidden');
		}
	});
	
//	$("input[name=addRightConfig_type]").change(function() {
//		var type = $("input[name=addRightConfig_type]:checked").val();
//		if(type == 1) {
//			$("#addRightConfig_roleSelectDiv").removeClass('hidden');
//			$(".addRightConfig_staffSelect").addClass('hidden');
//		}else if(type == 2) {
//			$("#addRightConfig_roleSelectDiv").addClass('hidden');
//			$(".addRightConfig_staffSelect").removeClass('hidden');
//		}
//	});
	
	function getRightListData(pageNo) {
		var deferre = $.Deferred();
		var promise = deferre.promise();
		//收集查询控件的参数值
		rightModule.searchParam = {
			orgId: rightModule.orgId,
			branchId: rightModule.branchId,
			roomNo: $("#findRoleNo").val(),
			pageNo: pageNo, //请求页
			pageSize: rightModule.paginationParam.pageSize //每页记录数
		}
		//返回请求的promise对象
		return httpUtilObj.ajax({
			url: CONSTANT.URL_PREFIX + CONSTANT.GET_RIGHTCONFIG_LIST_URL,
			params: rightModule.searchParam
		});
	}

	/**
	 * 初始化搜索控件
	 */
	function initSearchWidget() {
		var initParam = httpUtilObj.getTabParams();
		if(initParam) {
			rightModule.branchId = initParam.branchId;
			rightModule.orgId = initParam.orgId;
			rightModule.refer = initParam.refer;
		}
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
		//		if(!rightModule.paginationParam.isInit){
		$("#pagination").pagination(count, {
			'items_per_page': rightModule.paginationParam.pageSize,
			'num_display_entries': 5,
			'num_edge_entries': 5,
			'prev_text': "上一页",
			'next_text': "下一页",
			'callback': function(page_index) {
				//如果已加载过则不加载
				if(!rightModule.paginationParam.isInit) {
					rightModule.paginationParam.isInit = true;
				} else {
					loadRightList(false, page_index + 1);
				}
				//当前页数
				rightModule.paginationParam.pageNo = page_index + 1;
			},
			'current_page': (nowPage <= 1) ? 0 : (nowPage - 1)
		});
		//		}
	}

	/**
	 * 机构数据加载
	 * @param {Object} isAll (是否全部加载，如果是true才初始化分页控件，分页加载数据就是false的情况)
	 */
	function loadRightList(isAll, pageNo) {
		//请求数据
		getRightListData(pageNo).then(function(data) {
			//刷新列表
			refreshRightList(data.body);
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
	function refreshRightList(data) {
		var rightListHtml = template('rightListTemplate', data);
		$("#rightListContent").empty().html(rightListHtml);
	}
	
	function loadOrgList4Select(scopeListArray, array) {
		$("#addRightConfig_orgSelect option").prop("selected", false);
		httpUtilObj.ajax({
			url: CONSTANT.URL_PREFIX + CONSTANT.GET_ORG_LISG_URL,
			params: {}
		}).then(function(result) {
			if(result.errorCode == 0) {
				var orgListHtml = template('orgSelctTemplate', result.body);
				$("#addRightConfig_orgSelect").empty().html(orgListHtml);
				if(array != undefined && array != '' ) {
					$("#addRightConfig_orgSelect").selectpicker('val', array);
				}else if(scopeListArray != undefined) {
					$("#addRightConfig_orgSelect").selectpicker('val', scopeListArray);
				}
				$("#addRightConfig_orgSelect").selectpicker('refresh');
				var oId = $("#addRightConfig_orgSelect").val();
				if(oId != undefined && oId != '' && $("#addRightConfig_scopeType").val() == 3){
					if(array != undefined && array != '' ) {
						loadBranchList4Select(scopeListArray);
					}else{
						loadBranchList4Select();
					}
				}
			}
		});
		
	}
	function loadBranchList4Select(scopeListArray) {
		$("#addRightConfig_branchSelect option").prop("selected", false);
		//收集查询控件的参数值
		var orgId = $("#addRightConfig_orgSelect").val();
		if(orgId == undefined || orgId.length > 1) {
			return;
		}
		var params = {
			orgId: orgId,
			pageNo: 1, //请求页
			pageSize: 10000, //每页记录数
			qBranch : 'yes'
		}
		httpUtilObj.ajax({
			url: CONSTANT.URL_PREFIX + 'SAASGetCompanyOrgList',
			params: params
		}).then(function(data) {
			var content = template('branchSelctTemplate', data.body);
			$("#addRightConfig_branchSelect").empty().html(content);
			$("#addRightConfig_branchSelect").selectpicker({
				'selectedText': 'cat',
			});
			if(scopeListArray != undefined) {
				$("#addRightConfig_branchSelect").selectpicker('val', scopeListArray);
			}
			$("#addRightConfig_branchSelect").selectpicker('refresh');
		});
	}
	
	function loadRightList4Select(menuListArray) {
		$("#addRightConfig_menuSelect option").prop("selected", false);
		//收集查询控件的参数值
		var params = {
			pageNo: 1, //请求页
			pageSize: 10000 //每页记录数
		}
		httpUtilObj.ajax({
			url: CONSTANT.URL_PREFIX + CONSTANT.GET_RIGHT_LIST_URL,
			params: params
		}).then(function(data) {
			var content = template('rightSelctTemplate', data.body);
			$("#addRightConfig_menuSelect").empty().html(content);
			$("#addRightConfig_menuSelect").selectpicker({
				'selectedText': 'cat',
			});
			if(menuListArray != undefined) {
				$("#addRightConfig_menuSelect").selectpicker('val', menuListArray);
			}
			$("#addRightConfig_menuSelect").selectpicker('refresh');
		});
	}
	
	function loadRoleList4Select(roleId) {
		$("#roleSelectContent option").prop("selected", false);
		//收集查询控件的参数值
		var params = {
			pageNo: 1, //请求页
			pageSize: 10000 //每页记录数
		}
		httpUtilObj.ajax({
			url: CONSTANT.URL_PREFIX + 'SAASGetRoleList',
			params: params
		}).then(function(data) {
			var content = template('roleListTemplate', data.body);
			$("#roleSelectContent").empty().html(content);
			if(roleId != undefined) {
				$("#roleSelectContent option[value='"+roleId+"']").prop("selected", true);
			}
//			$("#roleSelectContent").selectpicker({
//				'selectedText': 'cat',
//			});
//			$("#roleSelectContent").selectpicker('refresh');
		});
	}
	rightModule.viewRightConfig = function(id) {
		
		rightModule.rcId = id;
		var params = {
			id : id
		}
		httpUtilObj.ajax({
			url: CONSTANT.URL_PREFIX + 'SAASGetRightConfig',
			params: params
		}).then(function(result) {
			addRightConfigModal.show();
			// 初始化数据...
			var data = result.body.rightConfig;
			var scopeType = data.scopeType;
			var roleId = data.roleId;
			if(roleId == undefined || roleId <= 0) {
				$("input[name=addRightConfig_type][value=1]").prop("checked", false);
				$("input[name=addRightConfig_type][value=2]").prop("checked", true);
			}else{
				$("input[name=addRightConfig_type][value=2]").prop("checked", false);
				$("input[name=addRightConfig_type][value=1]").prop("checked", true);
			}
			$("input[name=addRightConfig_type]").trigger("change");
			loadRoleList4Select(roleId);
			var menuListArray = new Array();
			$(data.menuList).each(function(i,e){
				menuListArray.push(e.menu);
			});
			loadRightList4Select(menuListArray);
			var staffIdList = new Array();
			staffIdList = data.hgIdList;
			loadStaffList4Select(staffIdList);
			var scopeListArray = new Array();
			$(data.scopeList).each(function(i,e){
				scopeListArray.push(e.id);
			});
			$("#addRightConfig_scopeType option[value='"+scopeType+"']").prop("selected", true);
			$("#addRightConfig_scopeType").trigger("change");
			if(scopeType == 1){
				return;
			}
			if(scopeType == 2){
				loadOrgList4Select(scopeListArray, '');
				return;
			}
			if(scopeType == 4) {
				loadHGList4Select(scopeListArray);
			}else{
				loadHGList4Select();
			}
			if(scopeType == 3){
				var array  = new Array();
				array.push(data.orgId);
				loadOrgList4Select(scopeListArray, array);
			}else {
				loadBranchList4Select();
			}
			
//			$(data.staffList).each(function(i,e){
//				staffIdList.push(e.hgId);
//			});
			
		});
	}
	
	function loadStaffList4Select(staffIdList) {
		$("#addRightConfig_staffSelect option").prop("selected", false);
		var params = {
			pageNo: 1, //请求页
			searchGHType:-2,
			pageSize: 10000 //每页记录数
		}
		httpUtilObj.ajax({
			url: CONSTANT.URL_PREFIX + 'SAASGetHGList',
			params: params
		}).then(function(data) {
			var content = template('staffSelctTemplate', data.body);
			$("#addRightConfig_staffSelect").empty().html(content);
			$("#addRightConfig_staffSelect").selectpicker({
				'selectedText': 'cat',
			});
			if(staffIdList != undefined)
				$("#addRightConfig_staffSelect").selectpicker('val', staffIdList);
			$("#addRightConfig_staffSelect").selectpicker('refresh');
		});
	}
	function loadHGList4Select(hgIdList) {
		$("#addRightConfig_hgSelect option").prop("selected", false);
		var params = {
			pageNo: 1, //请求页
			searchGHType:-2,
			pageSize: 10000 //每页记录数
		}
		httpUtilObj.ajax({
			url: CONSTANT.URL_PREFIX + 'SAASGetHGList',
			params: params
		}).then(function(data) {
			var content = template('staffSelctTemplate', data.body);
			$("#addRightConfig_hgSelect").empty().html(content);
			$("#addRightConfig_hgSelect").selectpicker({
				'selectedText': 'cat',
			});
			if(hgIdList != undefined)
				$("#addRightConfig_hgSelect").selectpicker('val', hgIdList);
			$("#addRightConfig_hgSelect").selectpicker('refresh');
		});
	}
	
	$("#addRightConfig_orgSelect").change(function() {
		var type = $("#addRightConfig_scopeType").val();
		if(type == 3){
			loadBranchList4Select();
		}
	})
	
	rightModule.delRightConfig = function(id) {
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
						id: id
					}
					//发送请求
					httpUtilObj.ajax({
						url: CONSTANT.URL_PREFIX + 'SAASDelRightConfig',
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
							loadRightList(true, 1);
						}
					});
				}
			}
		});
	}
	
	//显示新增机构面板按钮
	$("#showAddRightConfigBtn").click(function() {
		$("input[name=addRightConfig_type][value=1]").prop("checked", true);
		$("input[name=addRightConfig_type][value=2]").prop("checked", false);
//		$("#addRightConfig_roleSelectDiv").removeClass('hidden');
//		$(".addRightConfig_staffSelect").addClass('hidden');
		$("#addRightConfig_scopeType option[value=1]").prop("selected", true);
		$("#addRightConfig_scopeType").trigger("change");
		$("#addRightConfig_orgSelect").selectpicker({
			'selectedText': 'cat',
			'maxOptions' : 10000
		});
		$("#addRightConfig_orgSelect").selectpicker('refresh');
		rightModule.rcId = 0;
		initSearchWidget();
		addRightConfigModal.show();
		loadRoleList4Select();
		loadRightList4Select();
		loadStaffList4Select();
		loadHGList4Select();
		loadOrgList4Select();
		loadBranchList4Select();
	});
	
	$("#saveRightConfigBtn").click(function(){
		var scopeList ; 
		var scopeType = $("#addRightConfig_scopeType").val();
		if(scopeType == 2) {
			scopeList = $("#addRightConfig_orgSelect").val();
		}else if(scopeType == 3) {
			scopeList = $("#addRightConfig_branchSelect").val();
		}else if(scopeType == 4) {
			scopeList = $("#addRightConfig_hgSelect").val();
		}
		var addRightConfig_type = $("input [name='addRightConfig_type']:checked").val();
		var roleId = $("#roleSelectContent").val();
		var staffIds = $("#addRightConfig_staffSelect").val();
		var menus = $("#addRightConfig_menuSelect").val();
		var type = $("input[name='addRightConfig_type']:checked").val();
		var params = {
			id : rightModule.rcId,
			menus : menus,
			scopeType : scopeType,
			scopeList :scopeList,
			roleId : roleId,
			staffIds : staffIds
		};
		
//		if(type == 1) {
//			params.roleId = roleId;
//		}else {
//			params.staffIds = staffIds;
//		}
		
		httpUtilObj.ajax({
			url: CONSTANT.URL_PREFIX + 'SAASSaveOrUpdateRightConfig',
			params: params
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
				loadRightList(true, 1);
				addRightConfigModal.hide();
			}
		});
	});

});