/**
 * 科室管理模块
 */
//科室管理模块的数据对象
var branchModule = {
	branchId: 0,
	branchList: [], //机构数据列表
	provinceList: [], //搜索省份
	cityList: [], //搜索城市
	selctChange: {}, //监听下拉框事件
	orgId: 0,
	refer: '',
	//分页参数
	paginationParam: {
		pageSize: 10, //每页展示的数据条目
		isInit: false, //是否已初始化
		pageNo: 1 //请求页
	},
	companyId: 0
};

//机构编辑面板-数据对象
var branchEditModule = {
	provinceList: [], //搜索省份
	cityList: [], //搜索城市
	state: 'show', //面板状态(show-查看;edit-编辑)
};

var COModule = {

};

$(document).ready(function() {
	/**
	 * 私有常量集合
	 */
	var CONSTANT = {
		//处理请求前缀
		URL_PREFIX: '/adminjson/',
		//获取机构列表数据
		GET_BRANCH_LISG_URL: 'SAASGetBranchList',
		GET_CO_ITEM: 'SAASGetCompanyOrg',
		//获取机构
		GET_BRANCH: 'SAASGetBranch',
		UPDATE_CO_ITEM: 'SAASSaveOrUpdateCompanyOrg',
		//删除机构
		DEL_BRANCH_URL: 'SAASDeleteBranch',
		GET_HGLIST: 'SAASGetHGListByRoleId',
		//保存或新增机构
		SAVE_BRANCH_URL: 'SAASSaveOrUpdateBranch',
		//获取机构列表数据
		GET_ORG_LISG_URL: 'SAASGetOrgList',
		//省市县级联数据
		GET_CITY_JSON: '../js/app/common/city.json'
	};

	//将下拉框监听事件绑定到公共对象
	branchModule.selctChange = defaultSelctChange;
	//将加载数据的方法绑定到公共对象
	branchModule.loadBranchList = loadBranchList;
	//删除机构数据
	branchModule.delBranchItem = delBranchItem;
	$(".addDudao_staffSelect button[data-id=addDudao_staffSelect]").attr('disabled', false);
	//实例化请求帮助类
	var httpUtilObj = new HttpUtil();
	//新增科室弹出面板
	var addBranchModal = new ModalPanel("#addBranch_panel");
	var showCOModal = new ModalPanel("#showCOItem_panel");
	var addCBPanel = new ModalPanel("#addCBRelation_panel");

	//初始化搜索区域的控件
	initSearchWidget();
	//默认载入数据
	loadBranchList(true);
	branchModule.goRoom = function(branchId) {
		parent.tm.addTab('病房', '././templates/room.html', { branchId: branchId, orgId: branchModule.orgId, refer: 'co' });
	}

	branchModule.delCompanyBranchItem = function(id) {

		bootbox.confirm({
			title: "系统提示",
			message: "驳回后将不可恢复，请确认？",
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
				var params = {
					id: id
				}
				if(isConfirm) {
					httpUtilObj.ajax({
						url: CONSTANT.URL_PREFIX + 'SAASDeleteCompanyOrg',
						params: params
					}).then(function(data) {
						if(data.errorCode == 0) {
							$.toast({
								heading: '系统消息',
								text: '操作成功！',
								position: 'top-right',
								icon: 'success',
								loaderBg: '#9EC600',
								stack: false
							});
							loadBranchList(true);
						}
					});
				}
			}
		});

	}

	branchModule.saveCBRelation = function() {
		var params = {
			branchIds: $("#branchListSelectContent").val(),
			addCB: 'yes',
			companyId: branchModule.companyId,
			orgId: branchModule.orgId,
			refer: branchModule.refer
		}
		httpUtilObj.ajax({
			url: CONSTANT.URL_PREFIX + 'SAASSaveOrUpdateCompanyOrg',
			params: params
		}).then(function(data) {
			if(data.errorCode == 0) {
				$.toast({
					heading: '系统消息',
					text: '操作成功！',
					position: 'top-right',
					icon: 'success',
					loaderBg: '#9EC600',
					stack: false
				});
				loadBranchList(true);
				addCBPanel.hide();
			}
		});
	}

	function loadBranchList4Select() {
		//收集查询控件的参数值
		var params = {
			toCO : 'yes',
			orgId: $("#findOrgId").val(),
			branchName: $("#findBranchName").val(),
			pageNo: 1, //请求页
			pageSize: 10000 //每页记录数
		}
		httpUtilObj.ajax({
			url: CONSTANT.URL_PREFIX + 'SAASGetBranchList',
			params: params
		}).then(function(data) {
			var content = template('branchSelctTemplate', data.body);
			$("#branchListSelectContent").empty().html(content);
			$("#branchListSelectContent").selectpicker('refresh');
			$("#branchListSelectContent").selectpicker({
				'selectedText': 'cat',
			});
		});
	}

	branchModule.addCBRelation = function() {
		loadBranchList4Select();
		addCBPanel.show();
	}

	function enableBut() {
		$("#toEditBtn").addClass('hidden');
		$("#updateCOBtn").removeClass('hidden');
		$("#cancelEditBtn").removeClass('hidden');
		$("input[name=coItem_isAll]").attr('disabled', false);
		$("input[name=coItem_haveEntranceCard]").attr('disabled', false);
		$("input[name=showOrg_FeeRule]").attr('disabled', false);
		$("#coItem_entranceCardPrice").attr('disabled', false);
//		$("#coItem_prepayAmount").attr('disabled', false);
		$("#coItem_dudaoId").attr('disabled', false);
		$(".addDudao_staffSelect button[data-id=addDudao_staffSelect]").attr('disabled', false);
		$("input[name=isShowClientExtra]").attr('disabled', false);
	}

	function disableBut() {
		$("#updateCOBtn").addClass('hidden');
		$("#cancelEditBtn").addClass('hidden');
		$("#toEditBtn").removeClass('hidden');
		$("input[name=coItem_isAll]").attr('disabled', true);
		$("input[name=isShowClientExtra]").attr('disabled', true);
		$("input[name=coItem_haveEntranceCard]").attr('disabled', true);
		$("input[name=showOrg_FeeRule]").attr('disabled', true);
		$("#coItem_entranceCardPrice").attr('disabled', true);
//		$("#coItem_prepayAmount").attr('disabled', true);
		$("#coItem_dudaoId").attr('disabled', true);
		$(".addDudao_staffSelect button[data-id=addDudao_staffSelect]").attr('disabled', true);
	}

	COModule.editCO = function() {
		enableBut();
	}
	COModule.cancelEdit = function() {
		disableBut();
	}
	COModule.updateCO = function() {
//		$("input[name='isShowClientExtra']").val();
		var isShowClientExtra = 1;
		if($("label input[name=isShowClientExtra]").prop('checked')) {
			isShowClientExtra = 1;
		} else {
			isShowClientExtra = 0;
		}
		var param = {
			isSetBranch: 'yes',
			orgId: branchModule.orgId,
			branchId: branchModule.branchId,
			entranceCardPrice: $("#coItem_entranceCardPrice").val(),
//			prepayAmount: $("#coItem_prepayAmount").val(),
			dudaoId: $("#addDudao_staffSelect").val()||[],
			haveEntranceCard: $("input[name=coItem_haveEntranceCard]:checked").val(),
			isAll: $("input[name=coItem_isAll]:checked").val(),
			isShowClientExtra: isShowClientExtra,
			lastDayFeeConfig:$("input[name='showOrg_FeeRule']:checked").attr('lastDayFeeConfig'),//结束计费
			changeServiceConfig:$("input[name='showOrg_FeeRule']:checked").attr('changeServiceConfig'),//变更当天
		}
		if(branchModule.refer == 'company') {
			param.companyId = branchModule.companyId;
		}
		httpUtilObj.ajax({
			url: CONSTANT.URL_PREFIX + CONSTANT.UPDATE_CO_ITEM,
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
				loadBranchList(true);
			}
			showCOModal.hide();
			disableBut();
		});
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
	 * 删除机构
	 */
	function delBranchItem(id) {
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
					//发送请求
					httpUtilObj.ajax({
						url: CONSTANT.URL_PREFIX + CONSTANT.DEL_BRANCH_URL,
						params: { id: id }
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
							loadBranchList(false);
						}
					});
				}
			}
		});
	}

	function loadCOItem(id) {
		$("#serviceState label input").removeAttr("checked");
		$("#isAllState label input").removeAttr("checked");
		$("#haveEntranceCardState label input").removeAttr("checked");
		$("#coItem_dudaoId option").removeAttr("selected");
		var param = {
			orgId: branchModule.orgId, //机构-id
			branchId: id
		};
		if(branchModule.refer == 'company') {
			param.companyId = branchModule.companyId;
		}
		//发送请求
		httpUtilObj.ajax({
			url: CONSTANT.URL_PREFIX + CONSTANT.GET_CO_ITEM,
			params: param
		}).then(function(result) {
			if(result.errorCode == 0) {
				var co = result.body.co;
				$("#coItem_branchName").val(co.branchName);
				$("#coItem_orgName").val(co.orgName);
				$("#isAllState label input[value='" + co.isAll + "']").prop('checked', 'checked');
				if(co.havaEntranceCard == undefined)
					$("#haveEntranceCardState label input[value='" + 0 + "']").prop('checked', 'checked');
				else
					$("#haveEntranceCardState label input[value='" + 1 + "']").prop('checked', 'checked');
				if(co.dudaoId > 0) {
					$("#coItem_dudaoId option[value='" + co.dudaoId + "']").attr('selected', true);
				} else {
					
				}
				$("#coItem_entranceCardPrice").val(co.entranceCardPrice);
				$("#showOrg_FeeRule input[value="+ co.lastDayFeeConfig +"]").prop("checked",true);
				var isShowClientExtra = co.isShowClientExtra;
				if(isShowClientExtra == 0) {
					$("label input[name=isShowClientExtra]").prop('checked', false);
				} else if(isShowClientExtra == 1){
					$("label input[name=isShowClientExtra]").prop('checked', 'checked');
				}
			}
		});
	}

	function initHGList(staffIdList, id) {
		var data = {};
		data["roleId"] = 10006;
		data["pageNo"] = 1;
		data["pageSize"] = 1000;
//		data["branchId"] = id;
		httpUtilObj.ajax({
			params: data,
			url: CONSTANT.URL_PREFIX + CONSTANT.GET_HGLIST
		}).then(function(result) {
			// 查找护工列表
			var huListSelHtml = template('staffSelctTemplate', result.body);
			$("#addDudao_staffSelect").empty().html(huListSelHtml);
			$("#addDudao_staffSelect").selectpicker({
				'selectedText': 'cat',
			});
			var split=staffIdList.split(",");
			if(split != undefined)
				$("#addDudao_staffSelect").selectpicker('val', split);
			$("#addDudao_staffSelect").selectpicker('refresh');
			console.log("split:" + split);
			console.log("branchId:" + id);
			loadCOItem(id);
		});
	}

	branchModule.showCOItem = function(dudaoIds, id) {
		disableBut();
		branchModule.branchId = id;
		initHGList(dudaoIds, id);
		showCOModal.show();
	}

	/**
	 * 初始化搜索控件
	 */
	function initSearchWidget(panel_id) {
		var initParam = httpUtilObj.getTabParams();
		if(initParam.refer != undefined) {
			$("#showAddBranchBtn").addClass('hidden');
			CONSTANT.GET_BRANCH_LISG_URL = 'SAASGetCompanyOrgList';
		} else {
			$("#showAddBranchBtn").removeClass('hidden');
		}
		if(initParam) {
			$("#findOrgName").val(initParam.orgName);
			$("#findOrgId").val(initParam.orgId);
			branchModule.orgId = initParam.orgId;
			branchModule.refer = initParam.refer;
			branchModule.companyId = initParam.companyId;
		}
		var pro_id = 'proSelct';
		//获取数据
		var dataPromise = getCityJsonAll();
		dataPromise.then(function(result) {
			if(panel_id == 'addBranch_panel') {
				//新增面板
				pro_id = "addBranch_" + pro_id;
				branchEditModule.provinceList = result;
			} else {
				//列表面板
				branchModule.provinceList = result;
			}
			//初始化下拉框
			initSelct(pro_id, result);
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
			'proSelct': '省份',
			'citySelct': '城市',
			'distrctSelct': '区/县',
			'addBranch_proSelct': '省份',
			'addBranch_citySelct': '城市',
			'addBranch_distrctSelct': '区/县'
		}
		//默认选项的HTML
		var defaultOption = '<option value="">请选择' + proCityDistMap[type] + '</option>';
		//根据类型，加载对应下拉框
		$("#" + type).empty().append(defaultOption + selctHtml);
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
	function defaultSelctChange(type, e) {
		//选中的省份/城市编码
		var code = $(e).val();
		//根据类型处理子级下拉框的加载
		if(type == 'pro' && code != '') {
			var cityList = getCityJSON(code, branchModule.provinceList).city;
			branchModule.cityList = cityList;
			initSelct('citySelct', cityList);
			initSelct('distrctSelct', []); //清空区县下拉框
		} else if(type == 'city' && code != '') {
			var selectedCity = getCityJSON(code, branchModule.cityList);
			initSelct('distrctSelct', selectedCity.area);
		}
	}

	/**
	 * 初始化分页控件
	 * @param {Object} nowPage 当前页码
	 * @param {Object} count   记录总数
	 */
	function initPagination(nowPage, count) {
		//		console.info('当前页码:' + nowPage + '当前查询记录总数：'+count);
		//如果记录条目为0则隐藏分页控件
		if(count == 0) {
			$("#pagination").hide();
		} else {
			$("#pagination").show();
		}

		$("#pagination").pagination(count, {
			'items_per_page': branchModule.paginationParam.pageSize,
			'num_display_entries': 5,
			'num_edge_entries': 5,
			'prev_text': "上一页",
			'next_text': "下一页",
			'callback': function(page_index) {
				page_index = page_index + 1;
				if(page_index != branchModule.paginationParam.pageNo) {
					branchModule.paginationParam.pageNo = page_index;
					loadBranchList(false);
				}
			},
			'current_page': (nowPage <= 1) ? 0 : (nowPage - 1)
		});
	}

	/**
	 * 机构数据加载
	 * @param {Object} isAll (是否全部加载，如果是true才初始化分页控件，分页加载数据就是false的情况)
	 */
	function loadBranchList(isAll) {
		//收集查询控件的参数值
		branchModule.searchParam = {
			orgId: $("#findOrgId").val(),
			branchName: $("#findBranchName").val(),
			pageNo: branchModule.paginationParam.pageNo, //请求页
			pageSize: branchModule.paginationParam.pageSize //每页记录数
		}
		if(branchModule.refer != undefined) {
			branchModule.searchParam.qBranch = 'yes';
			branchModule.searchParam.companyId = branchModule.companyId;
			console.info(branchModule.companyId);
		}
		//请求数据
		httpUtilObj.ajax({
			url: CONSTANT.URL_PREFIX + CONSTANT.GET_BRANCH_LISG_URL,
			params: branchModule.searchParam
		}).then(function(data) {
			//刷新列表
			refreshBranchList(data.body);
			//初始化分页控件
			if(isAll) {
				initPagination(0, data.body.count);
			}
		});
	}

	//	/**
	//	 * 机构数据加载的请求处理
	//	 */
	//	function getBranchListData(pageNo){
	//		var deferre = $.Deferred();
	//		var promise = deferre.promise();
	//		//收集查询控件的参数值
	//		branchModule.searchParam = {
	//			orgName : $("#findOrgName").val(),
	//			orgId : $("#findOrgId").val(),
	//			provinceId : $("#proSelct").val(),
	//			cityId : $("#citySelct").val(),
	//			adcode : $("#distrctSelct").val(),
	//			pageNo : pageNo,	//请求页
	//			pageSize : branchModule.paginationParam.pageSize	//每页记录数
	//		}
	//		//返回请求的promise对象
	//		return httpUtilObj.ajax({
	//			url : CONSTANT.URL_PREFIX + CONSTANT.GET_BRANCH_LISG_URL,
	//			params : branchModule.searchParam
	//		});
	//	}

	/**
	 * 刷新机构列表
	 * @param {Object} data
	 */
	function refreshBranchList(data) {
		if(branchModule.refer != undefined) {
			var branchListHtml = template('companyBranchListTemplate', data);
			$("#branchListContent").empty().html(branchListHtml);
		} else {
			var branchListHtml = template('branchListTemplate', data);
			$("#branchListContent").empty().html(branchListHtml);
			$('#branchListContent .change_branchName').editable({
				url: '/adminjson/SAASSaveOrUpdateBranch',
				title:'修改科室',
				value:$(this).html(),
				placement:'right',
				pk:'1',
				params: function (params) {
					params['branchName']=params['value'];
					params['orgId']=$(this).attr('orgId');
					params['id']=$(this).attr('branchid');
					return JSON.stringify(params);
				},
				validate: function (value) {
					if ($.trim(value) == '') {
						return '请填写科室名';
					}
				}
			});
		}
		if(branchModule.refer == 'co') {
			$("#showAddBranchBtn").addClass('hidden');
			$("#addCBRelationBtn").removeClass('hidden');
			$(".roomCountTD").removeClass('hidden');
			$(".viewItemBut").removeClass('hidden');
			$(".OPerateBranch").removeClass('hidden');
		} else if(branchModule.refer == 'company') {
			$("#addCBRelationBtn").removeClass('hidden');
			$(".viewItemBut").addClass('hidden');
			$(".OPerateBranch").removeClass('hidden');
		} else {
			$(".roomCountTD").addClass('hidden');
			$("#addCBRelationBtn").addClass('hidden');
			$("#showAddBranchBtn").removeClass('hidden');
			$(".delItemBut").removeClass('hidden');
			$(".viewItemBut").addClass('hidden');
			$(".OPerateBranch").removeClass('hidden');
		}
	}

	//显示新增机构面板按钮
	$("#showAddBranchBtn").click(function() {
		addBranchModal.show();
		$("#addBranch_name").val('');
		//初始化省级下拉框
		initSearchWidget('addBranch_panel');
	});

	//执行新增机构
	$("#addBranchBtn").click(function() {
		//		console.info('branchName:' + $("#addBranch_name").val());
		//收集数据
		var param = {
			orgId: branchModule.orgId, //机构-id
			branchName: $("#addBranch_name").val()
		};
		//发送请求
		httpUtilObj.ajax({
			url: CONSTANT.URL_PREFIX + CONSTANT.SAVE_BRANCH_URL,
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
				addBranchModal.hide();
				loadBranchList(true);
			}
		});
	});
});