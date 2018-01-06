/**
 * 机构管理模块
 */
//机构管理模块的数据对象
var companyModule = {
	companyList: [], //机构数据列表
	provinceList: [], //搜索省份
	cityList: [], //搜索城市
	selctChange: {}, //监听下拉框事件
	companyId: 0,
	state: 1,
	//分页参数
	paginationParam: {
		pageSize: 10, //每页展示的数据条目
		isInit: false, //是否已初始化
	},
	ajaxFileUpload: {}
};

//机构编辑面板-数据对象
var companyEditModule = {
	provinceList: [], //搜索省份
	cityList: [], //搜索城市
	state: 'show', //面板状态(show-查看;edit-编辑)
}
$(document).ready(function () {

	companyModule.ajaxFileUpload = function (prefix, type, fileId) {
		$.ajaxFileUpload({
			url: '/imageupload?type=' + type, //用于文件上传的服务器端请求地址
			secureuri: false, //是否需要安全协议，一般设置为false
			fileElementId: fileId, //文件上传域的ID
			dataType: 'json', //返回值类型 一般设置为json
			success: function (data, status) {
				if (data.errCode == 0) {
					$("#" + prefix + type + "_img").attr("src", data.imgUrl);
					$("#" + prefix + type).val(data.imageId);
				} else {
					alert("上传失败");
				}
			},
			error: function (data, status, e) {
				alert(e);
			}
		})
		return false;
	}

	//实例化请求帮助类
	var httpUtilObj = new HttpUtil();
	/**
	 * 私有常量集合
	 */
	var CONSTANT = {
		//处理请求前缀
		URL_PREFIX: '/adminjson/',
		//获取机构列表数据
		GET_BRANCH_LISG_URL: 'SAASGetCompanyList',
		//获取机构
		GET_COMPANY: 'SAASGetCompany',
		//删除机构
		DEL_COMPANY_URL: 'SAASDeleteCompany',
		//保存或新增机构
		SAVE_COMPANY_URL: 'SAASSaveOrUpdateCompany',
		//获取机构列表数据
		GET_ORG_LISG_URL: 'SAASGetOrgList',
		GetCO: 'SAASGetCompanyOrgList',
		SAVE_CO_URL: 'SAASSaveOrUpdateCompanyOrg',
		DEL_CO_URL: 'SAASDeleteCompanyOrg',
		CHECKCOMPANY_URL: 'SAASCompanyThroughChecking',
		//省市县级联数据
		GET_CITY_JSON: '../js/app/common/city.json',
		tabMap: []
	};

	//将下拉框监听事件绑定到公共对象
	companyModule.selctChange = defaultSelctChange;
	//将加载数据的方法绑定到公共对象
	companyModule.loadCompanyList = loadCompanyList;
	//删除机构数据
	companyModule.delCompanyItem = delCompanyItem;
	companyEditModule.selctChange = addCompanySelctChange;

	var showCompanyInfo = new ModalPanel("#showCompanyInfo_panel");
	var linkCOModal = new ModalPanel("#linkCO");
	var addCompanyModal = new ModalPanel("#addCompany_panel");

	/**
	 * 初始化地址文本框
	 */
	function initMap(panel_id) {
		var widgetPrefix = panel_id.substring(0, panel_id.indexOf('panel'));
		console.debug(widgetPrefix);
		AMap.plugin(['AMap.Autocomplete', 'AMap.PlaceSearch'], function () {
			var autoOptions = {
				city: "全国", //城市，默认全国
				input: widgetPrefix + 'building' //使用联想输入的input的id
			};
			autocomplete = new AMap.Autocomplete(autoOptions);
			var placeSearch = new AMap.PlaceSearch({
				city: '广州'
			});
			AMap.event.addListener(autocomplete, "select", function (e) {
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

	companyModule.goCO = function (companyId) {
		parent.tm.addTab('合作伙伴项目点', '././templates/companyorg.html', { companyId: companyId, refer: 'co' });
	}

	companyModule.cancelEdit = function () {
		$("#showCompanyInfo_panel input").prop('disabled', true);
		$("#cancelEditBtn").addClass('hidden');
		$("#updateCompanyBtn").addClass('hidden');
		$("#toEditBtn").removeClass('hidden');
	}

	companyModule.addCompany = function () {
		addCompanyModal.show();
		initSelct('addCompany_citySelct', companyModule.cityList);
		initMap('addCompany_panel');
	}
	companyModule.updateCompany = function () {
		var newAddress = '';
		if ($("#showCompanyInfo_address").val()) {
			newAddress = $("#showCompanyInfo_address").val();
		} else newAddress = $("#showCompanyInfo_building").val();
		//查询参数
		var param = {
			id: $("#showCompanyInfo_id").val(),
			adcode: $("#showCompanyInfo_adcode").val(),
			legalManLicence: $("#showCompanyInfo_legalManLicence").val(),
			businessLicence: $("#showCompanyInfo_businessLicence").val(),
			address: newAddress,
			companyName: $("#showCompanyInfo_companyName").val(),
			legalManName: $("#companyInfoLegalManName").val(),
			linkman: $("#companyInfoLinkman").val(),
			adminPhone: $("#companyAdminPhone").val(),
			officialWebsite: $("#companyInfoOfficialWebsite").val()
		}
		console.dir(param);
		httpUtilObj.ajax({
			url: CONSTANT.URL_PREFIX + CONSTANT.SAVE_COMPANY_URL,
			params: param
		}).then(function (result) {
			if (result.errorCode == 0) {
				$("#showCompanyInfo_panel input").val('');
				$.toast({
					heading: '系统消息',
					text: '操作成功！',
					position: 'top-right',
					icon: 'success',
					loaderBg: '#9EC600',
					stack: false
				});
				companyModule.cancelEdit();
				loadCompanyList(true, 1);
				showCompanyInfo.hide();
			}

		});
	}

	companyModule.saveCompany = function () {
		//查询参数
		var param = {
			lat: $("#addCompany_lat").val(),
			lng: $("#addCompany_lng").val(),
			adcode: $("#addCompany_adcode").val(),
			address: $("#addCompany_address").val(),
			companyName: $("#addCompany_name").val(),
			legalManName: $("#addCompany_legalManName").val(),
			linkman: $("#addCompany_linkman").val(),
			adminPhone: $("#addCompany_adminPhone").val(),
			officialWebsite: $("#addCompany_offcialWebSite").val(),
			legalManLicence: $("#addCompany_legalManLicence").val(),
			businessLicence: $("#addCompany_businessLicence").val()
		}

		httpUtilObj.ajax({
			url: CONSTANT.URL_PREFIX + CONSTANT.SAVE_COMPANY_URL,
			params: param
		}).then(function (result) {
			if (result.errorCode == 0) {
				$("#addCompany_panel input").val('');
				$.toast({
					heading: '系统消息',
					text: '操作成功！',
					position: 'top-right',
					icon: 'success',
					loaderBg: '#9EC600',
					stack: false
				});
				loadCompanyList(true, 1);
				addCompanyModal.hide();
			}

		});

	}

	/**
	 * 
	 * @param {Object} type
	 * @param {Object} e
	 */
	function addCompanySelctChange(type, e) {
		//选中的省份/城市编码
		var code = $(e).val();
		//根据类型处理子级下拉框的加载
		if (type == 'pro' && code != '') {
			var cityList = getCityJSON(code, branchEditModule.provinceList).city;
			branchEditModule.cityList = cityList;
			initSelct('addCompany_citySelct', cityList);
		} else if (type == 'city' && code != '') {
			var selectedCity = getCityJSON(code, branchEditModule.cityList);
		}
		buildOrgList();
	}

	companyModule.toLink = function (id) {
		var param = {
			companyId: companyModule.companyId
		}
		//发送请求
		httpUtilObj.ajax({
			url: CONSTANT.URL_PREFIX + CONSTANT.GetCO,
			params: param
		}).then(function (result) {
			if (result.errorCode == 0) {
				var orgListHtml = template('coListTemplate', result.body);
				$("#coListContent").empty().append(orgListHtml);
			}
		});
		showCompanyInfo.hide();
		linkCOModal.show();
		initSearchWidget('linkCO');
	}

	companyModule.fail = function () {
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
			callback: function (isConfirm) {
				if (isConfirm) {
					//发送请求
					httpUtilObj.ajax({
						url: CONSTANT.URL_PREFIX + CONSTANT.CHECKCOMPANY_URL,
						params: { id: $("#companyInfoId").val(), state: -2 }
					}).then(function (result) {
						if (result.errorCode == 0) {
							$.toast({
								heading: '系统消息',
								text: '操作成功！',
								position: 'top-right',
								icon: 'success',
								loaderBg: '#9EC600',
								stack: false
							});
							showCompanyInfo.hide();
							loadCompanyList();
						}
					});
				}
			}
		});
	}
	companyModule.editCompany = function () {
		$("#showCompanyInfo_panel input").prop('disabled', false);
		initMap('showCompanyInfo_panel');
		$("#cancelEditBtn").removeClass('hidden');
		$("#updateCompanyBtn").removeClass('hidden');
		$("#toEditBtn").addClass('hidden');
	}
	companyModule.checkInfo = function (id, state) {
		showCompanyInfo.show();
		$("#cancelEditBtn").addClass('hidden');
		$("#updateCompanyBtn").addClass('hidden');
		$("#toEditBtn").removeClass('hidden');
		$("#showCompanyInfo_panel input").prop('disabled', true);
		$("#showCompanyInfo_businessLicence_img").attr('src', '');
		$("#showCompanyInfo_legalManLicence_img").attr('src', '');
		companyModule.companyId = id;
		//查询参数
		var param = {
			id: id,
			state: state
		}

		if (state == 0) {
			$("#addCOBut").show();
			$("#failCheckBtn").show();
		} else {
			$("#addCOBut").hide();
			$("#failCheckBtn").hide();
		}
		//发送请求
		httpUtilObj.ajax({
			url: CONSTANT.URL_PREFIX + CONSTANT.GET_COMPANY,
			params: param
		}).then(function (result) {
			if (result.errorCode == 0) {
				var companyInfoModel = result.body.company;
				$("#showCompanyInfo_companyName").val(companyInfoModel.companyName);
				$("#showCompanyInfo_id").val(companyInfoModel.id);
				$("#companyInfoLegalManName").val(companyInfoModel.legalManName);
				$("#showCompanyInfo_adcode").val(companyInfoModel.countyId);
				$("#showCompanyInfo_businessLicence").val(companyInfoModel.businessLicence);
				$("#showCompanyInfo_legalManLicence").val(companyInfoModel.legalManLicence);
				$("#showCompanyInfo_businessLicence_img").attr('src', companyInfoModel.businessLicenceImgUrl);
				$("#showCompanyInfo_legalManLicence_img").attr('src', companyInfoModel.legalManLicenceImgUrl);
				$("#companyAdminPhone").val(companyInfoModel.adminPhone);
				if (companyInfoModel.officialWebsite != undefined) {
					if (companyInfoModel.officialWebsite.indexOf("http://") < 0) {
						$("#companyWebsite").attr('href', "http://" + companyInfoModel.officialWebsite);
					} else {
						$("#companyWebsite").attr('href', companyInfoModel.officialWebsite);
					}
					$("#companyWebsite").text('点击进入官网');
				}
				$("#companyInfoOfficialWebsite").val(companyInfoModel.officialWebsite);
				$("#showCompanyInfo_building").val(companyInfoModel.address);
				$("#companyInfoId").val(companyInfoModel.id);
				$("#companyInfoLinkman").val(companyInfoModel.linkman);
				$("#showCompanyInfo_lng").val(companyInfoModel.lng);
				$("#showCompanyInfo_lat").val(companyInfoModel.lat);
			}
		});
	}

	function reloadCOList() {
		var param = {
			companyId: companyModule.companyId
		}
		//发送请求
		httpUtilObj.ajax({
			url: CONSTANT.URL_PREFIX + CONSTANT.GetCO,
			params: param
		}).then(function (result) {
			if (result.errorCode == 0) {
				var orgListHtml = template('coListTemplate', result.body);
				$("#coListContent").empty().append(orgListHtml);
			}

		});
	}

	companyModule.finish = function () {
		bootbox.confirm({
			title: "系统提示",
			message: "将发送短信通知申请人成功结果,请确认!",
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
			callback: function (isConfirm) {
				if (isConfirm) {
					//发送请求
					httpUtilObj.ajax({
						url: CONSTANT.URL_PREFIX + CONSTANT.CHECKCOMPANY_URL,
						params: { id: $("#companyInfoId").val(), state: 1 }
					}).then(function (result) {
						if (result.errorCode == 0) {
							$.toast({
								heading: '系统消息',
								text: '操作成功！',
								position: 'top-right',
								icon: 'success',
								loaderBg: '#9EC600',
								stack: false
							});
							linkCOModal.hide();
							loadCompanyList();
						}
					});
				}
			}
		});
	}

	companyModule.delCO = function (id) {
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
			callback: function (isConfirm) {
				var param = {
					companyId: companyModule.companyId,
					orgId: id
				}
				if (isConfirm) {
					//发送请求
					httpUtilObj.ajax({
						url: CONSTANT.URL_PREFIX + CONSTANT.DEL_CO_URL,
						params: param
					}).then(function (result) {
						if (result.errorCode == 0) {
							$.toast({
								heading: '系统消息',
								text: '操作成功！',
								position: 'top-right',
								icon: 'success',
								loaderBg: '#9EC600',
								stack: false
							});
							reloadCOList();
						}
					});
				}
			}
		});
	}

	companyModule.addCO = function () {
		//查询参数
		var param = {
			companyId: companyModule.companyId,
			orgId: $("#addCO_ORGListHtml").val(),
			linkCO:true
		}

		httpUtilObj.ajax({
			url: CONSTANT.URL_PREFIX + CONSTANT.SAVE_CO_URL,
			params: param
		}).then(function (result) {
			if (result.errorCode == 0) {
				$.toast({
					heading: '系统消息',
					text: '操作成功！',
					position: 'top-right',
					icon: 'success',
					loaderBg: '#9EC600',
					stack: false
				});
				reloadCOList();
			}

		});

	}

	//新增弹出面板
	var addCompanyModal = new ModalPanel("#addCompany_panel");
	//初始化搜索区域的控件
	initSearchWidget();
	//默认载入数据
	loadCompanyList(true, 1);

	function buildOrgList() {
		//查询参数
		var param = {
			provinceId: $("#addCompany_proSelct").val(),
			cityId: $("#addCompany_citySelct").val()
		}
		//发送请求
		httpUtilObj.ajax({
			url: CONSTANT.URL_PREFIX + CONSTANT.GET_ORG_LISG_URL,
			params: param
		}).then(function (result) {

			if (result.errorCode == 0) {
				var orgListHtml = template('orgSelctTemplate', result.body);
				if (result.body.count == 0) {
					console.debug('count == 0');
					$("#saveLinkCO").attr('disabled', 'disabled');
				} else {
					$("#saveLinkCO").attr('disabled', false);
				}
				$("#addCO_ORGListHtml").empty().append(orgListHtml);
			}
		});
	}

	//获取所有省-市-县级联数据
	function getCityJsonAll() {
		var dtd = $.Deferred();
		var promise = dtd.promise();
		$.getJSON(CONSTANT.GET_CITY_JSON, function (result) {
			dtd.resolve(result);
		}, function (result) {
			dtd.reject(result);
		});
		return promise;
	}

	/**
	 * 删除机构
	 */
	function delCompanyItem(id) {
		bootbox.confirm({
			title: "系统提示",
			message: "确认删除合作伙伴信息吗？",
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
			callback: function (isConfirm) {
				if (isConfirm) {
					//发送请求
					httpUtilObj.ajax({
						url: CONSTANT.URL_PREFIX + CONSTANT.DEL_COMPANY_URL,
						params: { id: id }
					}).then(function (result) {
						if (result.errorCode == 0) {
							$.toast({
								heading: '系统消息',
								text: '操作成功！',
								position: 'top-right',
								icon: 'success',
								loaderBg: '#9EC600',
								stack: false
							});
							loadCompanyList(false);
						}
					});
				}
			}
		});
	}

	/**
	 * 初始化搜索控件
	 */
	function initSearchWidget(panel_id) {
		var pro_id = 'proSelct';
		//获取数据
		var dataPromise = getCityJsonAll();
		dataPromise.then(function (result) {
			if (panel_id == 'linkCO') {
				//新增面板
				pro_id = "addCompany_" + pro_id;
				companyEditModule.provinceList = result;
			} else {
				//列表面板
				companyModule.provinceList = result;
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
			'addCompany_proSelct': '省份',
			'addCompany_citySelct': '城市',
			'addCompany_distrctSelct': '区/县'
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
		for (var i = 0; i < list.length; i++) {
			var item = list[i];
			if (item.id == code) {
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
		if (type == 'pro' && code != '') {
			var cityList = getCityJSON(code, companyModule.provinceList).city;
			companyModule.cityList = cityList;
			initSelct('citySelct', cityList);
		} else if (type == 'city' && code != '') {
			var selectedCity = getCityJSON(code, companyModule.cityList);
		}
	}

	/**
	 * 
	 * @param {Object} type
	 * @param {Object} e
	 */
	function addCompanySelctChange(type, e) {
		//选中的省份/城市编码
		var code = $(e).val();
		//根据类型处理子级下拉框的加载
		if (type == 'pro' && code != '') {
			var cityList = getCityJSON(code, companyEditModule.provinceList).city;
			companyEditModule.cityList = cityList;
			initSelct('addCompany_citySelct', cityList);
			initSelct('addCompany_distrctSelct', []); //清空区县下拉框
		} else if (type == 'city' && code != '') {
			var selectedCity = getCityJSON(code, companyEditModule.cityList);
			initSelct('addCompany_distrctSelct', selectedCity.area);
		}
		buildOrgList();
	}

	/**
	 * 初始化分页控件
	 * @param {Object} nowPage 当前页码
	 * @param {Object} count   记录总数
	 */
	function initPagination(nowPage, count) {
		//如果记录条目为0则隐藏分页控件
		if (count == 0) {
			$("#pagination").hide();
		} else {
			$("#pagination").show();
		}

		//如果已初始化控件，则不再		
		//		if(!companyModule.paginationParam.isInit){
		$("#pagination").pagination(count, {
			'items_per_page': companyModule.paginationParam.pageSize,
			'num_display_entries': 5,
			'num_edge_entries': 5,
			'prev_text': "上一页",
			'next_text': "下一页",
			'callback': function (page_index) {
				//如果已加载过则不加载
				if (!companyModule.paginationParam.isInit) {
					companyModule.paginationParam.isInit = true;
				} else {
					loadCompanyList(false, page_index + 1);
				}
				//当前页数
				companyModule.paginationParam.pageNo = page_index + 1;
			},
			'current_page': (nowPage <= 1) ? 0 : (nowPage - 1)
		});
		//		}
	}

	companyModule.changeStateSelected = function () {
		companyModule.state = $("#companyStateSel").val();
	}
	/**
	 * 机构数据加载
	 * @param {Object} isAll (是否全部加载，如果是true才初始化分页控件，分页加载数据就是false的情况)
	 */
	function loadCompanyList(isAll, pageNo) {
		//请求数据
		getCompanyListData(pageNo).then(function (data) {
			//刷新列表
			refreshCompanyList(data.body);
			//			if(companyModule.state == -2) {
			//				$(".checkTD").hide();
			//				$(".coCountTD").hide();
			//			} else {
			//				$(".checkTD").show();
			//				$(".coCountTD").show();
			//			}
			//			if(companyModule.state == 0){
			//				$(".coCountTD").hide();
			//				$(".checkCompanyLink").show();
			//			}else if(companyModule.state == 1){
			//				$(".coCountTD").show();
			//				$(".checkCompanyLink").hide();
			//			}else{
			//				$(".checkCompanyLink").hide();
			//			}
			//			if(companyModule.state != 0) {
			//				$(".checkInfoBtn").text('查看');
			//			} else{
			//				$(".checkInfoBtn").text('审核');
			//			}
			//初始化分页控件
			if (isAll) {
				initPagination(0, data.body.count);
			}
		});
	}

	/**
	 * 机构数据加载的请求处理
	 */
	function getCompanyListData(pageNo) {
		var deferre = $.Deferred();
		var promise = deferre.promise();
		//收集查询控件的参数值
		companyModule.searchParam = {
			//orgName : $("#findCompanyName").val(),
			provinceId: $("#proSelct").val(),
			cityId: $("#citySelct").val(),
			companyName: $("#findCompanyName").val(),
			pageNo: pageNo, //请求页
			pageSize: companyModule.paginationParam.pageSize, //每页记录数
			state: $("#companyStateSel").val()
		}
		//返回请求的promise对象
		return httpUtilObj.ajax({
			url: CONSTANT.URL_PREFIX + CONSTANT.GET_BRANCH_LISG_URL,
			params: companyModule.searchParam
		});
	}

	/**
	 * 刷新机构列表
	 * @param {Object} data
	 */
	function refreshCompanyList(data) {
		var companyListHtml = template('companyListTemplate', data);
		$("#companyListContent").empty().html(companyListHtml);
	}

	//显示新增机构面板按钮
	$("#showAddCompanyBtn").click(function () {
		addCompanyModal.show();
		//初始化省级下拉框
		initSearchWidget('addCompany_panel');
	});

//	//执行新增机构
//	$("#addCompanyBtn").click(function () {
//		//收集数据
//		var param = {
//			orgId: $("#addCompany_org").val(), //机构-id
//			companyName: $("#addCompany_name").val()
//		};
//		//发送请求
//		httpUtilObj.ajax({
//			url: CONSTANT.URL_PREFIX + CONSTANT.SAVE_BRANCH_URL,
//			params: param
//		}).then(function (result) {
//			if (result.errorCode == 0) {
//				$.toast({
//					heading: '系统消息',
//					text: '操作成功！',
//					position: 'top-right',
//					icon: 'success',
//					loaderBg: '#9EC600',
//					stack: false
//				});
//				addCompanyModal.hide();
//				loadCompanyList(true, 1);
//			}
//		});
//	});
});