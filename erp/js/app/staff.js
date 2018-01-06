/**
 * 机构管理模块
 */
//机构管理模块的数据对象
var ataffModule = {
	id: 0,
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
	actionType: '',
	oldnumber: []
};
var hgDataModel = {
	provinceList: []
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
		GET_BRANCH_LISG_URL: 'SAASGetBranchList',
		//获取机构
		GET_ORG: 'SAASGetOrg',
		//省市县级联数据
		GET_CITY_JSON: '../js/app/common/city.json',
		GET_HG_LISG_URL: 'SAASGetStaffList',
		GET_PRICE_LIST_URL: 'SAASGetPriceList',
		DELETE_PRICE_URL: 'SAASDeletePrice',
		SAVE_UPDATE_PRICE_URL: 'SAASSaveOrUpdatePrice',
		SAVE_UPDATE_HG_URL: 'SAASSaveOrUpdateHGInfo',
		GET_PRICE_URL: 'SAASGetPrice',
		GET_BRANCH_LIST_URL: 'SAASGetBranchList',
		GET_HG_URL: 'SAASGetHGInfo',
		HG_TYPE_MAP: [{ 'name': '请选择员工类型', 'id': '' },
			/*{ 'name': '护工', 'id': '1' },*/ { 'name': '督导', 'id': '3' },
			{ 'name': '副主任', 'id': '4' }, { 'name': '主任', 'id': '5' },
			{ 'name': '质检', 'id': '6' }, { 'name': '质检主任', 'id': '7' },
			{ 'name': '运营', 'id': '8' }, { 'name': '客服', 'id': '9' },
			{ 'name': '健康经理', 'id': '10' }
		],
		SEX_MAP: [{ 'name': '男', 'id': '1' }, { 'name': '女', 'id': '2' }],
		DELETE_HG_URL : 'SAASDelHGInfo'
	}
	$("label").addClass('text-right').addClass('m-bot15').css('line-height', '30px').css('height', '30px');
	ataffModule.selctChange = selctChange;
	ataffModule.loadHGList = loadHGList;
	var orgPriceDealModal = new ModalPanel("#orgPriceDeal_panel");
	var hgInfoModal = new ModalPanel("#showHGInfo_panel");
	var addPriceItemModal = new ModalPanel("#addPriceItem_panel");
	var showPriceItemModal = new ModalPanel("#showPriceItem_panel");
	var addHGBranchRoomItemModal = new ModalPanel("#addHGBranchRoomItem_panel");
	//实例化请求帮助类
	var httpUtilObj = new HttpUtil();
	//初始化搜索区域的控件
	initSearchWidget();
	var addHBPanel = new ModalPanel("#addHBRelation_panel");
	var isInit = 0;

	function loadBranchList4Select() {
		//收集查询控件的参数值
		var params = {
			orgId: $("#search_org").val(),
			pageNo: 1, //请求页
			pageSize: 10000 //每页记录数
		}
		httpUtilObj.ajax({
			url: CONSTANT.URL_PREFIX + 'SAASGetBranchList',
			params: params
		}).then(function(data) {
			var oldnumber = ataffModule.oldnumber;
			if(oldnumber == undefined || oldnumber.length == 0) {
				oldnumber = new Array();
				$("#branchListSelectContent option:selected").each(function(i, e) {
					oldnumber.push($(e).val());
				});
			}
			var content = template('branchSelctTemplate', data.body);
			$("#branchListSelectContent").empty().html(content);
			$("#branchListSelectContent").selectpicker({
				'selectedText': 'cat',
			});
			$("#branchListSelectContent").selectpicker('val', oldnumber);
			$("#branchListSelectContent").selectpicker('refresh');
		});
	}
	ataffModule.addHBRelation = function() {
		addHBPanel.show();
	}
	ataffModule.ajaxFileUpload = function(prefix, type, fileId) {
		$.ajaxFileUpload({
			url: '/imageupload?type=' + type, //用于文件上传的服务器端请求地址
			secureuri: false, //是否需要安全协议，一般设置为false
			fileElementId: fileId, //文件上传域的ID
			dataType: 'json', //返回值类型 一般设置为json
			success: function(data, status) {
				if(data.errCode == 0) {
					$("#" + prefix + type + "_img").attr("src", data.imgUrl);
					$("#" + prefix + type).val(data.imageId);
					if(type == 'idcardpic' || type == 'idcardpic2') {
						getIdcardInfo(type);
					}
				} else {
					alert("上传失败");
				}
			},
			error: function(data, status, e) {
				alert(e);
			}
		})
		return false;
	}

	function getIdcardInfo(type) {
		var side = 0;
		var param = {
			imgId: ''
		};
		if(type == 'idcardpic') {
			side = 1;
			param.imgId = $("#showHGInfo_idcardpic").val();
		} else {
			side = 2;
			param.imgId = $("#showHGInfo_idcardpic2").val();
			param.side = 2;
		}
		console.info(side);
		//发送请求
		httpUtilObj.ajax({
			url: CONSTANT.URL_PREFIX + 'IDCardRecognize',
			params: param
		}).then(function(result) {
			if(result.errorCode == 0) {
				var data = result.body;
				if(side != data.side) {
					$.toast({
						heading: '系统消息',
						text: '身份证图片错误,请重新上传！',
						position: 'top-right',
						icon: 'error',
						loaderBg: '#9EC600',
						stack: false
					});
					$("#showHGInfo_" + type).val('');
					return;
				}
				if(type == 'idcardpic') {
					$("#showHGInfo_idcard").val(data.idcard);
					console.info(data.birthday);
					$("#showHGInfo_birthday").val(data.birthday);
					$("#showHGInfo_fullName").val(data.fullName);
					$("#showHGInfo_nation").val(data.nation);
					if(data.nativeplace != undefined) {
						var provincePrefix = data.nativeplace.substring(0, 2);
						$("#showHGInfo_proSelct option").each(function(i, e) {
							if($(e).html().indexOf(provincePrefix) >= 0) {
								$(e).prop("selected", true);
							}
						});
					}
					$("input[name=showHGInfo_sex][value='" + data.sex + "']").prop("checked", true);
				} else {
					$("#showHGInfo_idcardExpiredDate").val(data.idcardExpiredDate);
				}
			}
		});
	}

	ataffModule.buildBranchList = function() {
		addHGBranchRoomItemModal.show();
		var param = {
			orgId: $("#search_org").val() //banner-名称
		};
		//发送请求
		httpUtilObj.ajax({
			url: CONSTANT.URL_PREFIX + CONSTANT.GET_BRANCH_LIST_URL,
			params: param
		}).then(function(result) {
			if(result.errorCode == 0) {
				var branchListHtml = template('branchListTemplate', result.body);
				$("#showHGInfo_branchList").empty().html(branchListHtml);
				if(result.body.branchList.length == 0) {
					$("#saveHGBranchAndRoomBTN").prop('disabled', true);
				} else {
					$("#saveHGBranchAndRoomBTN").prop('disabled', false);
				}
			}
		});
	}

	function content2Edit() {
		//		$("#branchListSelectContent").prop('disabled', false);
		$("button[data-id='branchListSelectContent']").prop('disabled', false);
		$("#showHGInfo_adcode").prop('disabled', false);
		$("#showHGInfo_province").prop('disabled', false);
		$("input[name=showHGInfo_sex]").prop('disabled', false);
		$("#showHGInfo_nativeplace").prop('disabled', false);
		$("#showHGInfo_proSelct").prop('disabled', false);
		$("#showHGInfo_hgType").prop('disabled', false);
		$("input[name=showHGInfo_language]").prop('disabled', false);
		$("#showHGInfo_workType").prop('disabled', false);
		$("#showHGInfo_city").prop('disabled', false);
		$("#showHGInfo_county").prop('disabled', false);
		$("#showHGInfo_address").prop('disabled', false);
		$("#showHGInfo_building").prop('disabled', false);
		$("#showHGInfo_careerStartTime").prop('disabled', false);
		$("#showHGInfo_emergencyContact").prop('disabled', false);
		$("#showHGInfo_emergencyContactPhone").prop('disabled', false);
		$("#showHGInfo_fullName").prop('disabled', false);
		$("#showHGInfo_healthCertificate").prop('disabled', false);

		$("#showHGInfo_hgno").prop('disabled', false);
		$("#showHGInfo_idcard").prop('disabled', false);
		$("#showHGInfo_idcardExpiredDate").prop('disabled', false);
		$("#showHGInfo_idcardpic").prop('disabled', false);
		$("#showHGInfo_idcardpic2").prop('disabled', false);
		$("#showHGInfo_idcardpic3").prop('disabled', false);
		$("#showHGInfo_joinTime").prop('disabled', false);
		$("#showHGInfo_nation").prop('disabled', false);
		$("#showHGInfo_nation").prop('disabled', false);
		$("#showHGInfo_nursingCertificate").prop('disabled', false);
		$("#showHGInfo_phone").prop('disabled', false);
		$("#showHGInfo_pic").prop('disabled', false); // pic img src
		$("#showHGInfo_picFile").prop('disabled', false); // pic img src
		$("#showHGInfo_idcardpicFile").prop('disabled', false); // pic img src
		$("#showHGInfo_idcardpic2File").prop('disabled', false); // pic img src
		$("#showHGInfo_idcardpic3File").prop('disabled', false); // pic img src
		$("#showHGInfo_healthCertificateFile").prop('disabled', false); // pic img src
		$("#showHGInfo_nursingCertificateFile").prop('disabled', false); // pic img src
	}

	function content2Show() {
		//		$("#branchListSelectContent").prop('disabled', true);
		$("button[data-id='branchListSelectContent']").prop('disabled', true);
		$("#showHGInfo_adcode").prop('disabled', true);
		$("#showHGInfo_province").prop('disabled', true);
		$("#showHGInfo_city").prop('disabled', true);
		$("#showHGInfo_county").prop('disabled', true);
		$("#showHGInfo_address").prop('disabled', true);
		$("#showHGInfo_building").prop('disabled', true);
		$("input[name=showHGInfo_sex]").prop('disabled', true);
		$("#showHGInfo_nativeplace").prop('disabled', true);
		$("#showHGInfo_proSelct").prop('disabled', true);
		$("#showHGInfo_hgType").prop('disabled', true);
		$("input[name=showHGInfo_language]").prop('disabled', true);
		$("#showHGInfo_workType").prop('disabled', true);

		$("#showHGInfo_careerStartTime").prop('disabled', true);
		$("#showHGInfo_emergencyContact").prop('disabled', true);
		$("#showHGInfo_emergencyContactPhone").prop('disabled', true);
		$("#showHGInfo_fullName").prop('disabled', true);
		$("#showHGInfo_healthCertificate").prop('disabled', true);

		$("#showHGInfo_hgno").prop('disabled', true);
		$("#showHGInfo_idcard").prop('disabled', true);
		$("#showHGInfo_idcardExpiredDate").prop('disabled', true);
		$("#showHGInfo_idcardpic").prop('disabled', true);
		$("#showHGInfo_idcardpic2").prop('disabled', true);
		$("#showHGInfo_idcardpic3").prop('disabled', true);
		$("#showHGInfo_joinTime").prop('disabled', true);
		$("#showHGInfo_nation").prop('disabled', true);
		$("#showHGInfo_nation").prop('disabled', true);
		$("#showHGInfo_nursingCertificate").prop('disabled', true);
		$("#showHGInfo_phone").prop('disabled', true);
		$("#showHGInfo_pic").prop('disabled', true); // pic img src
		$("#showHGInfo_picFile").prop('disabled', true); // pic img src
		$("#showHGInfo_idcardpicFile").prop('disabled', true); // pic img src
		$("#showHGInfo_idcardpic2File").prop('disabled', true); // pic img src
		$("#showHGInfo_idcardpic3File").prop('disabled', true); // pic img src
		$("#showHGInfo_healthCertificateFile").prop('disabled', true); // pic img src
		$("#showHGInfo_nursingCertificateFile").prop('disabled', true); // pic img src
	}

	ataffModule.saveHGItem = function() {
		var languageArray = new Array();
		$("input[name='showHGInfo_language']:checked").each(function(i, e) {
			languageArray.push($(e).val());
		});
		var param = {
			id: ataffModule.id,
			adcode: $("#showHGInfo_adcode").val(),
			branchIds: $("#branchListSelectContent").val(),
			orgId: $("#search_org").val(), //banner-名称
			phone: $("#showHGInfo_phone").val(),
			province: $("#showHGInfo_province").val(),
			city: $("#showHGInfo_city").val(),
			county: $("#showHGInfo_county").val(),
			fullName: $("#showHGInfo_fullName").val(),
			hgno: $("#showHGInfo_hgno").val(),
			sex: $("input[name=showHGInfo_sex]:checked").val(),
			pic: $("#showHGInfo_pic").val(),
			nativeplace: $("#showHGInfo_proSelct").val(),
			address: $("#showHGInfo_address").val(),
			building: $("#showHGInfo_building").val(),
			language: languageArray,
			nation: $("#showHGInfo_nation").val(),
			idcard: $("#showHGInfo_idcard").val(),
			idcardpic: $("#showHGInfo_idcardpic").val(),
			idcardpic2: $("#showHGInfo_idcardpic2").val(),
			idcardpic3: $("#showHGInfo_idcardpic3").val(),
			idcardExpiredDate: $("#showHGInfo_idcardExpiredDate").val(),
			healthCertificate: $("#showHGInfo_healthCertificate").val(),
			nursingCertificate: $("#showHGInfo_nursingCertificate").val(),
			roleId: $("#showHGInfo_hgType").val(),
			joinTime: $("#showHGInfo_joinTime").val(),
			workType: $("#showHGInfo_workType").val(),
			careerStartTime: $("#showHGInfo_careerStartTime").val(),
			emergencyContact: $("#showHGInfo_emergencyContact").val(),
			emergencyContactPhone: $("#showHGInfo_emergencyContactPhone").val(),
		};
		//发送请求
		httpUtilObj.ajax({
			url: CONSTANT.URL_PREFIX + CONSTANT.SAVE_UPDATE_HG_URL,
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
				if(ataffModule.id > 0)
					ataffModule.loadHGList(false, 1);
				else
					ataffModule.loadHGList(true, 1);
				hgInfoModal.hide();
			}
		});
	}

	ataffModule.changeRoleDiv = function() {
		var selected = $("#showHGInfo_hgType option:selected").val();
		if(selected > 1) {
			$("#showHGInfo_workTypeSel").addClass('hidden');
		} else {
			$("#showHGInfo_workTypeSel").removeClass('hidden');
		}
		if(selected > 4) {
			$("#showHGInfo_workTypeBranchRoomSel").addClass('hidden');
		} else {
			$("#showHGInfo_workTypeBranchRoomSel").removeClass('hidden');
		}
	}

	/**
	 * 初始化地址文本框
	 */
	function initMap(panel_id) {
		var widgetPrefix = panel_id.substring(0, panel_id.indexOf('panel'));
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
				$("#" + widgetPrefix + "address").val(e.poi.district + e.poi.address);
				$("#" + widgetPrefix + "lng").val(e.poi.location.lng);
				$("#" + widgetPrefix + "lat").val(e.poi.location.lat);
				$("#" + widgetPrefix + "adcode").val(adcode);
				$("#" + widgetPrefix + "provinceID").val(adcode.substring(0, 2) + "0000");
				$("#" + widgetPrefix + "cityID").val(adcode.substring(0, 4) + "00");
				$("#" + widgetPrefix + "district").val(adcode);
			});
		});
	}

	ataffModule.editHGItem = function() {
		$("#cancelBtn").addClass('hidden');
		$("#editHGBtn").addClass('hidden');
		$("#saveHGBtn").removeClass('hidden');
		$("#cancelHGBtn").removeClass('hidden');
		content2Edit();
		$("button[data-id='branchListSelectContent']").removeClass('disabled');
	}

	ataffModule.cancelHGEdit = function() {
		$("#cancelBtn").addClass('hidden');
		$("#saveHGBtn").addClass('hidden');
		$("#editHGBtn").removeClass('hidden');
		$("#cancelHGBtn").addClass('hidden');
		content2Show();
		$("button[data-id='branchListSelectContent']").addClass('disabled');
	}

	ataffModule.delHGItem = function(id) {
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
						id: id,
					}
					//发送请求
					httpUtilObj.ajax({
						url: CONSTANT.URL_PREFIX + CONSTANT.DELETE_HG_URL,
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
						loadHGList(true, 1);
					});
				}
			}
		});
	}

	ataffModule.showEditHG = function(actionType, id, name) {
		ataffModule.actionType = actionType;
		if(actionType == 'add') {
			top.importOnceJS('js-script-staff',"js/app/rp/staff.js");
			top.G_Fun_showAddstaffPanel().then(function(data){
				loadHGList(true, 1);
			});
		}
		if(actionType == 'edit') {
			top.importOnceJS('js-script-staff',"js/app/rp/staff.js");
			top.G_Fun_showstaffInfoPanel(id).then(function(data){
				loadHGList(true, 1);
			});
		}
	}

	template.helper('hgFilter', function(id, dataSource) {
		if(!isNaN(id) && (id >= 0)) {
			return eval("CONSTANT." + dataSource + "[" + (id - 1) + "].name");
		} else {
			return '未知';
		}
	});

	ataffModule.typeSelChange = function(prefix) {
		var detailTypeHtml = template('hgTypeSelTemplate', { list: CONSTANT.HG_TYPE_MAP });
		$("#" + prefix + "hgTypeSel").empty().append(detailTypeHtml);
	}
	ataffModule.typeSelChange('');

	function buildOrgList(res) {
		var orgListHtml = template('orgSelctTemplate', res);
		if(res.orgList.length == 0) {
			$("#search_org").html('<option value="">请选择项目点</option>');
		} 
		$("#search_branch").html('<option value="">请选择科室</option>');
		$("#search_org").empty().append(orgListHtml);
	}
	function getHGListData(pageNo) {
		var deferre = $.Deferred();
		var promise = deferre.promise();
		//收集查询控件的参数值
		//			branchId: $("#search_org").val(),
		ataffModule.searchParam = {
			orgId: $("#search_org").val(),
			roleId: $("#hgTypeSel").val(),
			key: $("#findHgName").val(),
			pageNo: pageNo, //请求页
			pageSize: ataffModule.paginationParam.pageSize //每页记录数
		}
		//返回请求的promise对象
		return httpUtilObj.ajax({
			url: CONSTANT.URL_PREFIX + CONSTANT.GET_HG_LISG_URL,
			params: ataffModule.searchParam
		});
	}
	/**
	 * 初始化搜索控件
	 */
	function initSearchWidget() {
		//获取数据
		var dataPromise = getCityJsonAll();
		dataPromise.then(function(result) {
			ataffModule.provinceList = result;
			initSelct('pro', result);
			initSelct('showHGInfo_pro', result);
		});
	}

	//初始化时间控件
	$("#showHGInfo_careerStartTime").datetimepicker({
		language: 'zh-CN',
		minView: "month",
		format: 'yyyy-mm-dd',
		autoclose: 1
	});

	//初始化时间控件
	$("#showHGInfo_joinTime").datetimepicker({
		language: 'zh-CN',
		minView: "month",
		format: 'yyyy-mm-dd',
		autoclose: 1
	});

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
			'showHG_pro': '省份'
		}
		//默认选项的HTML
		var defaultOption = '<option value="">请选择' + proCityDistMap[type] + '</option>';
		//根据类型，加载对应下拉框
		if(type != 'showHG_pro')
			$("#" + type + "Selct").empty().append(defaultOption + selctHtml);
		$("#" + type + "Selct").empty().append(selctHtml);
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
	
	function loadRoleList() {
		doHttp({pageSize:999}, '/adminjson/SAASGetRoleList').then(function(result){
			var roleListContent = template('roleSelctTemplate', result.body);
			$("#hgTypeSel").empty().html(roleListContent);
			$("#showHGInfo_hgType").empty().html(roleListContent).children(':first').remove();
		});
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
			var cityList = getCityJSON(code, ataffModule.provinceList).city;
			ataffModule.cityList = cityList;
			initSelct('city', cityList);
			initSelct('distrct', []); //清空区县下拉框
		} else if(type == 'city' && code != '') {
			var selectedCity = getCityJSON(code, ataffModule.cityList);
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
		//		if(!ataffModule.paginationParam.isInit){
		$("#pagination").pagination(count, {
			'items_per_page': ataffModule.paginationParam.pageSize,
			'num_display_entries': 5,
			'num_edge_entries': 5,
			'prev_text': "上一页",
			'next_text': "下一页",
			'callback': function(page_index) {
				//如果已加载过则不加载
				if(!ataffModule.paginationParam.isInit) {
					ataffModule.paginationParam.isInit = true;
				} else {
					loadHGList(false, page_index + 1);
				}
				//当前页数
				ataffModule.paginationParam.pageNo = page_index + 1;
			},
			'current_page': (nowPage <= 1) ? 0 : (nowPage - 1)
		});
		//		}
	}

	/**
	 * 机构数据加载
	 * @param {Object} isAll (是否全部加载，如果是true才初始化分页控件，分页加载数据就是false的情况)
	 */
	function loadHGList(isAll, pageNo,str) {
		//请求数据
		getHGListData(pageNo).then(function(data) {
			//刷新列表
			refreshBranchList(data.body);
			if(str=='init'){
				buildOrgList(data.body.rightJson);
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
	function refreshBranchList(data) {
		var hgListHtml = template('hgListTemplate', data);
		$("#hgListContent").empty().html(hgListHtml);
	}
	loadHGList(true, 1,'init');
	loadRoleList();
});